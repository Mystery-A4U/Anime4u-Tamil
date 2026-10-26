# Anime4u.Tamil — Turso + MongoDB integration

This patch connects the existing Next.js Anime4u.Tamil site to:

- Turso: anime, seasons and episode metadata
- MongoDB: Telegram file references created by the upload bot

The integration follows the same schema used by the merged Anime4u upload bot.

## Important

Do NOT put `TURSO_AUTH_TOKEN` or `MONGODB_URI` in `NEXT_PUBLIC_*` variables.
They must remain server-side environment variables.

## Install

Run:

npm install

The package.json in this folder already adds:

- @libsql/client
- mongodb

## Environment variables

Add these to Vercel:

TURSO_DATABASE_URL
TURSO_AUTH_TOKEN
MONGODB_URI
MONGO_DB=anime4u
MONGO_COLLECTION=telegram_files

Optional:

STREAM_API_URL

## What it does

`/search`
- searches published anime from Turso

`/anime/<anime-id>`
- loads anime metadata from Turso
- loads seasons/episodes from Turso
- checks MongoDB for the Telegram file reference for each episode

`/watch/<episode-id>`
- loads the episode from Turso + MongoDB
- shows the streaming player shell
- uses `STREAM_API_URL/stream/<episode-id>` when configured

## Database schema expected

Turso:

anime
seasons
episodes

MongoDB:

database: anime4u
collection: telegram_files

Expected media reference fields:

anime_id
season
episode
chat_id
message_id
file_id
file_name
file_size
uploaded_at
media_type

## Why there is a separate streaming endpoint

MongoDB only stores the Telegram media reference. It does not contain the actual video.

A normal Next.js/Vercel page should not expose Telegram/MTProto credentials to the browser. The actual Telegram media streaming should therefore be handled by a server-side media proxy.

Set:

STREAM_API_URL=https://your-media-proxy.example.com

Then the watch page requests:

/stream/<episode-id>

The media proxy can use the Telegram reference from MongoDB and stream the media to the browser.

## Existing site styling

Copy the rules from:

app/db.css.example

into your existing:

app/style.css

The database integration itself does not replace your existing Anime4u navbar/logo design.

## Automatic Turso schema

The code calls CREATE TABLE IF NOT EXISTS for the three catalogue tables. It does not delete or overwrite existing data.

## Security

Never commit:

.env
.env.local
TURSO_AUTH_TOKEN
MONGODB_URI
Telegram API ID/hash
Telegram bot token
MTProto session files
Backblaze keys

## Anime4u background

The uploaded anime red-leaf background is included at:

`public/assets/anime4u-background.jpg`

To enable it in the existing Anime4u site without replacing your current layout/UI, add this single import to `app/layout.tsx` alongside your existing stylesheet import:

```tsx
import "./anime4u-background.css";
```

The background is fixed, covers the viewport, and has a subtle dark overlay so the pink/white UI remains readable.
