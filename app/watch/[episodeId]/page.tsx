import { notFound } from "next/navigation";
import { getAnime, getEpisode } from "@/lib/anime";

export const dynamic = "force-dynamic";

export default async function WatchPage({
  params,
}: {
  params: { episodeId: string };
}) {
  const episodeId = Number(params.episodeId);
  const episode = await getEpisode(episodeId);

  if (!episode) notFound();

  const anime = await getAnime(episode.anime_id);
  if (!anime) notFound();

  const streamBase = process.env.STREAM_API_URL?.replace(/\/$/, "");
  const streamUrl = streamBase
    ? `${streamBase}/stream/${episode.id}`
    : "";

  return (
    <main className="site watch-page">
      <section className="watch-header">
        <p className="eyebrow">NOW PLAYING</p>
        <h1>{anime.title}</h1>
        <p className="muted">
          Season {episode.season_number} · Episode {episode.episode_number}
          {episode.title ? ` · ${episode.title}` : ""}
        </p>
      </section>

      <section className="player-shell">
        {streamUrl ? (
          <video
            className="video-player"
            controls
            playsInline
            preload="metadata"
            src={streamUrl}
          />
        ) : (
          <div className="player-placeholder">
            <strong>Streaming endpoint not connected</strong>
            <p>
              The episode is present in Turso + MongoDB, but the Telegram media
              proxy has not been connected yet.
            </p>
          </div>
        )}
      </section>

      <section className="section">
        <p className="muted">
          File: {episode.file_name || "Telegram media reference"}
        </p>
      </section>
    </main>
  );
}
