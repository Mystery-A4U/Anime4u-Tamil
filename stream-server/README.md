# Anime4u.Tamil Stream Server

This backend is deployed separately from the Next.js site while living in the same GitHub repository.

## Endpoints

- `/stream/{episode_id}` — browser playback with HTTP Range support
- `/download/{episode_id}` — download with HTTP Range support
- `/health` — health check

## Telegram media

The backend uses Telethon/MTProto to retrieve media from Telegram. It does not use Widevine/CDM and does not permanently download the media onto Render disk.

MongoDB records should contain:

- `episode_id` (recommended)
- `anime_id`
- `season`
- `episode`
- `chat_id`
- `message_id`
- `file_id`
- `file_name`
- `file_size`
- `media_type`

The current upload bot should be updated to save `episode_id` so the website can call `/stream/{episode_id}`.

## Render

Create a Render Web Service from the same Anime4u-Tamil repository.

Set Root Directory to:

    stream-server

Build command:

    pip install -r requirements.txt

Start command:

    uvicorn server:app --host 0.0.0.0 --port $PORT

Environment variables:

- TG_API_ID
- TG_API_HASH
- TG_SESSION_STRING
- MONGODB_URI
- MONGO_DB=anime4u
- MONGO_COLLECTION=telegram_files
- STREAM_TOKEN

## Session

Generate the Telethon session locally with:

    python generate_session.py

Do not commit the session string or any secrets.

Only serve media you are authorized to distribute.
