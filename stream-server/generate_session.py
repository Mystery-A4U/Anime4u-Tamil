from telethon.sync import TelegramClient
from telethon.sessions import StringSession

api_id = int(input("Telegram API ID: ").strip())
api_hash = input("Telegram API Hash: ").strip()

with TelegramClient(StringSession(), api_id, api_hash) as client:
    print("\nTG_SESSION_STRING:\n")
    print(client.session.save())
    print("\nKeep this secret. Never commit it to GitHub.\n")
