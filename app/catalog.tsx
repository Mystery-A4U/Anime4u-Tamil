import Card from "@/components/Card";
import Empty from "@/components/Empty";
import { getMedia, type MediaType } from "@/lib/api";

type CatalogType = "anime-series" | "anime-movies" | "tamil-movies" | "tv" | "anime" | "movies" | "kdrama";

function apiType(type: CatalogType): MediaType {
  if (type === "anime-series" || type === "anime") return "anime";
  if (type === "anime-movies" || type === "movies") return "movies";
  if (type === "tamil-movies") return "movies";
  return "tv";
}

export default async function Catalog({ type, title }: { type: CatalogType; title: string }) {
  const items = await getMedia(apiType(type));

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <p className="eyebrow">ANIME4U</p>
          <h1>{title}</h1>
          <p className="muted">Browse available titles.</p>
        </div>
      </div>

      {items.length === 0 ? (
        <Empty title="Nothing here yet" text="No media has been published in this section yet." />
      ) : (
        <div className="catalog-list">
          {items.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              type={item.type}
              href={`/series/${item.id}`}
            />
          ))}
        </div>
      )}
    </main>
  );
}
