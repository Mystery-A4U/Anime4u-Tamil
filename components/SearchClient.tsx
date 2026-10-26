 "use client";

import { useState } from "react";

type Anime = {
  id: string;
  title: string;
  poster_url: string;
  type: string;
  genre: string;
  release_year: number | null;
  language: string;
};

export default function SearchClient() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  async function search(value: string) {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/anime/search?q=${encodeURIComponent(value)}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      setResults(data.results || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="db-search">
      <input
        value={query}
        onChange={(event) => search(event.target.value)}
        placeholder="Search anime, movies, series..."
        aria-label="Search anime"
        autoComplete="off"
      />

      {loading && <p className="muted">Searching...</p>}

      {!loading && query && results.length === 0 && (
        <p className="muted">No results found.</p>
      )}

      <div className="anime-results">
        {results.map((anime) => (
          <a className="anime-card" href={`/anime/${anime.id}`} key={anime.id}>
            {anime.poster_url ? (
              <img src={anime.poster_url} alt="" loading="lazy" />
            ) : (
              <div className="poster-placeholder">A4U</div>
            )}
            <div>
              <strong>{anime.title}</strong>
              <small>
                {anime.type} {anime.release_year ? `• ${anime.release_year}` : ""}
              </small>
              <small>{anime.genre || anime.language || "Anime"}</small>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}