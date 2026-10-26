import { notFound } from "next/navigation";
import { getAnime, getAnimeEpisodes } from "@/lib/anime";

export const dynamic = "force-dynamic";

export default async function AnimePage({
  params,
}: {
  params: { id: string };
}) {
  const anime = await getAnime(params.id);
  if (!anime) notFound();

  const episodes = await getAnimeEpisodes(anime.id);

  return (
    <main className="site">
      <section className="anime-detail">
        <div className="anime-detail-poster">
          {anime.poster_url ? (
            <img src={anime.poster_url} alt={anime.title} />
          ) : (
            <div className="poster-placeholder large">A4U</div>
          )}
        </div>

        <div className="anime-detail-info">
          <p className="eyebrow">ANIME4U</p>
          <h1>{anime.title}</h1>
          <p className="muted">
            {anime.type} {anime.release_year ? `• ${anime.release_year}` : ""}
          </p>
          <p className="synopsis">{anime.synopsis}</p>
          <div className="meta-row">
            {anime.genre && <span>{anime.genre}</span>}
            {anime.language && <span>{anime.language}</span>}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Episodes</h2>
          <span>{episodes.length}</span>
        </div>

        <div className="episode-list">
          {episodes.map((episode) => (
            <a
              key={episode.id}
              className="episode-item"
              href={`/watch/${episode.id}`}
            >
              <span>
                S{episode.season_number} · EP {episode.episode_number}
              </span>
              <strong>{episode.title || `Episode ${episode.episode_number}`}</strong>
              <small>
                {episode.file_id ? "Available" : "Media reference missing"}
              </small>
            </a>
          ))}

          {episodes.length === 0 && (
            <p className="muted">No published episodes yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}