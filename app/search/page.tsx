import SearchClient from "@/components/SearchClient";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <main className="site search-page">
      <section className="section">
        <div className="section-head">
          <h1>Search</h1>
          <span>Anime4u</span>
        </div>
        <SearchClient />
      </section>
    </main>
  );
}