import { turso } from "./turso";
import mongoClientPromise from "./mongodb";

export type Anime = {
  id: string;
  title: string;
  synopsis: string;
  poster_url: string;
  type: string;
  genre: string;
  release_year: number | null;
  language: string;
  published: number;
  created_at: string;
};

export type Episode = {
  id: number;
  anime_id: string;
  season_id: number;
  episode_number: number;
  title: string;
  published: number;
  season_number: number;
  file_id?: string;
  chat_id?: string | number;
  message_id?: string | number;
  file_name?: string;
  file_size?: number;
  media_type?: string;
};

export async function ensureSchema() {
  await turso.batch([
    `CREATE TABLE IF NOT EXISTS anime (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      synopsis TEXT DEFAULT '',
      poster_url TEXT DEFAULT '',
      type TEXT DEFAULT 'anime-series',
      genre TEXT DEFAULT '',
      release_year INTEGER,
      language TEXT DEFAULT '',
      published INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS seasons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      anime_id TEXT NOT NULL,
      season_number INTEGER NOT NULL,
      title TEXT DEFAULT '',
      UNIQUE(anime_id, season_number)
    )`,
    `CREATE TABLE IF NOT EXISTS episodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      anime_id TEXT NOT NULL,
      season_id INTEGER NOT NULL,
      episode_number INTEGER NOT NULL,
      title TEXT DEFAULT '',
      published INTEGER DEFAULT 0,
      UNIQUE(anime_id, season_id, episode_number)
    )`,
  ], "write");
}

function rowToObject<T>(row: Record<string, unknown>): T {
  return row as T;
}

export async function searchAnime(query: string) {
  await ensureSchema();
  const q = `%${query.trim()}%`;

  const result = await turso.execute({
    sql: `SELECT * FROM anime
          WHERE published = 1
          AND (title LIKE ? OR genre LIKE ? OR language LIKE ?)
          ORDER BY created_at DESC
          LIMIT 50`,
    args: [q, q, q],
  });

  return result.rows.map((row) => rowToObject<Anime>(row as Record<string, unknown>));
}

export async function getAnime(id: string) {
  await ensureSchema();

  const result = await turso.execute({
    sql: `SELECT * FROM anime WHERE id = ? LIMIT 1`,
    args: [id],
  });

  if (!result.rows.length) return null;
  return rowToObject<Anime>(result.rows[0] as Record<string, unknown>);
}

export async function getLatestAnime(limit = 24) {
  await ensureSchema();

  const result = await turso.execute({
    sql: `SELECT * FROM anime
          WHERE published = 1
          ORDER BY created_at DESC
          LIMIT ${Math.max(1, Math.min(limit, 50))}`,
  });

  return result.rows.map((row) => rowToObject<Anime>(row as Record<string, unknown>));
}

export async function getAnimeEpisodes(animeId: string) {
  await ensureSchema();

  const result = await turso.execute({
    sql: `SELECT
            e.id,
            e.anime_id,
            e.season_id,
            e.episode_number,
            e.title,
            e.published,
            s.season_number
          FROM episodes e
          JOIN seasons s ON s.id = e.season_id
          WHERE e.anime_id = ? AND e.published = 1
          ORDER BY s.season_number ASC, e.episode_number ASC`,
    args: [animeId],
  });

  const mongo = await mongoClientPromise;
  const db = mongo.db(process.env.MONGO_DB || "anime4u");
  const collection = db.collection(process.env.MONGO_COLLECTION || "telegram_files");

  const episodes = await Promise.all(
    result.rows.map(async (row) => {
      const item = rowToObject<Episode>(row as Record<string, unknown>);

      const media = await collection.findOne(
        {
          anime_id: item.anime_id,
          season: Number(item.season_number),
          episode: Number(item.episode_number),
        },
        {
          projection: {
            _id: 0,
            file_id: 1,
            chat_id: 1,
            message_id: 1,
            file_name: 1,
            file_size: 1,
            media_type: 1,
          },
        }
      );

      return { ...item, ...(media || {}) };
    })
  );

  return episodes;
}

export async function getEpisode(id: number) {
  await ensureSchema();

  const result = await turso.execute({
    sql: `SELECT
            e.id,
            e.anime_id,
            e.season_id,
            e.episode_number,
            e.title,
            e.published,
            s.season_number
          FROM episodes e
          JOIN seasons s ON s.id = e.season_id
          WHERE e.id = ? LIMIT 1`,
    args: [id],
  });

  if (!result.rows.length) return null;

  const episode = rowToObject<Episode>(
    result.rows[0] as Record<string, unknown>
  );

  const mongo = await mongoClientPromise;
  const db = mongo.db(process.env.MONGO_DB || "anime4u");
  const collection = db.collection(process.env.MONGO_COLLECTION || "telegram_files");

  const media = await collection.findOne(
    {
      anime_id: episode.anime_id,
      season: Number(episode.season_number),
      episode: Number(episode.episode_number),
    },
    {
      projection: {
        _id: 0,
        file_id: 1,
        chat_id: 1,
        message_id: 1,
        file_name: 1,
        file_size: 1,
        media_type: 1,
      },
    }
  );

  return { ...episode, ...(media || {}) };
}