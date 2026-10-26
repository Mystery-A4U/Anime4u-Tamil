import os
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse, StreamingResponse
from pymongo import MongoClient
from telethon import TelegramClient
from telethon.sessions import StringSession

load_dotenv()

TG_API_ID = int(os.environ["TG_API_ID"])
TG_API_HASH = os.environ["TG_API_HASH"]
TG_SESSION_STRING = os.environ["TG_SESSION_STRING"]

MONGODB_URI = os.environ["MONGODB_URI"]
MONGO_DB = os.getenv("MONGO_DB", "anime4u")
MONGO_COLLECTION = os.getenv("MONGO_COLLECTION", "telegram_files")
STREAM_TOKEN = os.getenv("STREAM_TOKEN", "")

mongo = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=10000)
collection = mongo[MONGO_DB][MONGO_COLLECTION]
tg = TelegramClient(StringSession(TG_SESSION_STRING), TG_API_ID, TG_API_HASH)

app = FastAPI(title="Anime4u Stream Server", version="1.0.0")


def authorized(request: Request) -> bool:
    return not STREAM_TOKEN or request.headers.get("x-stream-token") == STREAM_TOKEN


def get_record(episode_id: str):
    doc = collection.find_one({"episode_id": episode_id})
    if doc:
        return doc

    # Compatibility lookup: anime_id:season:episode
    try:
        anime_id, season, episode = episode_id.split(":", 2)
        return collection.find_one({
            "anime_id": anime_id,
            "season": int(season),
            "episode": int(episode),
        })
    except Exception:
        return None


def parse_range(value: Optional[str], size: int):
    if not value:
        return 0, size - 1, False

    if not value.startswith("bytes="):
        raise HTTPException(416, "Invalid Range")

    raw = value[6:].split(",", 1)[0].strip()
    if "-" not in raw:
        raise HTTPException(416, "Invalid Range")

    start_s, end_s = raw.split("-", 1)

    try:
        if start_s == "":
            length = int(end_s)
            if length <= 0:
                raise ValueError
            start = max(0, size - length)
            end = size - 1
        else:
            start = int(start_s)
            end = int(end_s) if end_s else size - 1
    except ValueError:
        raise HTTPException(416, "Invalid Range")

    if start < 0 or start >= size or end < start:
        raise HTTPException(416, "Range Not Satisfiable")

    return start, min(end, size - 1), True


async def get_message(record):
    chat_id = record.get("chat_id")
    message_id = record.get("message_id")
    if chat_id is None or message_id is None:
        raise HTTPException(404, "Telegram chat_id/message_id missing")

    message = await tg.get_messages(int(chat_id), ids=int(message_id))
    if not message or not message.media:
        raise HTTPException(404, "Telegram media not found")
    return message


async def media_generator(message, start: int, end: int):
    remaining = end - start + 1
    sent = 0

    async for chunk in tg.iter_download(
        message.media,
        offset=start,
        limit=remaining,
        request_size=512 * 1024,
    ):
        if not chunk:
            continue
        chunk = chunk[:remaining - sent]
        sent += len(chunk)
        yield chunk
        if sent >= remaining:
            break


@app.on_event("startup")
async def startup():
    await tg.start()


@app.on_event("shutdown")
async def shutdown():
    await tg.disconnect()
    mongo.close()


@app.get("/")
async def root():
    return {
        "service": "Anime4u Stream Server",
        "status": "online",
        "endpoints": ["/stream/{episode_id}", "/download/{episode_id}"],
    }


@app.get("/health")
async def health():
    return {"status": "ok", "telegram_connected": tg.is_connected()}


async def media_response(episode_id: str, request: Request, download: bool):
    if not authorized(request):
        raise HTTPException(401, "Unauthorized")

    record = get_record(episode_id)
    if not record:
        raise HTTPException(404, "Episode media reference not found")

    size = int(record.get("file_size") or 0)
    if size <= 0:
        raise HTTPException(404, "file_size missing")

    start, end, partial = parse_range(request.headers.get("range"), size)
    message = await get_message(record)

    filename = (record.get("file_name") or "video.mp4").replace('"', "")
    media_type = record.get("media_type") or (
        "application/octet-stream" if download else "video/mp4"
    )

    headers = {
        "Accept-Ranges": "bytes",
        "Content-Length": str(end - start + 1),
        "Cache-Control": "private, max-age=0, no-store",
        "Content-Disposition": (
            f'attachment; filename="{filename}"'
            if download else f'inline; filename="{filename}"'
        ),
    }

    status = 200
    if partial:
        headers["Content-Range"] = f"bytes {start}-{end}/{size}"
        status = 206

    return StreamingResponse(
        media_generator(message, start, end),
        status_code=status,
        media_type=media_type,
        headers=headers,
    )


@app.get("/stream/{episode_id}")
async def stream(episode_id: str, request: Request):
    return await media_response(episode_id, request, False)


@app.get("/download/{episode_id}")
async def download(episode_id: str, request: Request):
    return await media_response(episode_id, request, True)
