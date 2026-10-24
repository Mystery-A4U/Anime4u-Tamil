# Anime4u — Clean v2

Minimal dark media-index frontend for Anime4u.

## Design
- Black background
- White typography
- Neon pink/red accent
- Lightweight Home / Series / Movies navigation
- Quick menu for Movies, TV Shows, Anime and K Drama
- No mock catalogue data
- Responsive mobile layout

## Backend
Set `NEXT_PUBLIC_API_URL` to the FastAPI backend when it is ready.

The frontend safely renders empty states when the API is unavailable or returns no titles.

## Vercel
Build command: `npm run build`
Framework: Next.js
Node: use a current LTS Node version in Vercel.
