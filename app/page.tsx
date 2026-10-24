import Link from 'next/link';

const categories = [
  { no: '01', title: 'Movies', desc: 'Feature films and new releases', href: '/movies' },
  { no: '02', title: 'TV Shows', desc: 'Series and television', href: '/series' },
  { no: '03', title: 'Anime', desc: 'Anime series and films', href: '/anime-series' },
  { no: '04', title: 'K Drama', desc: 'Korean drama titles', href: '/series?type=kdrama' },
];

export default function HomePage() {
  return (
    <main>
      <section className="container hero-section">
        <div className="hero-rule" />
        <p className="eyebrow">ANIME4U / MEDIA INDEX</p>
        <h1>Find what you want.<br /><span>Nothing else.</span></h1>
        <p className="hero-copy">
          A lightweight index for movies, TV shows, anime and K Drama.
          Choose a category and go straight to the media you are looking for.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/movies">Browse movies <span>→</span></Link>
          <Link className="button" href="/anime-series">Browse anime <span>→</span></Link>
        </div>
      </section>

      <section className="container section">
        <div className="section-head"><h2>Quick menu</h2><span>04 sections</span></div>
        <div className="quick-grid">
          {categories.map((item) => (
            <Link href={item.href} className="quick-card" key={item.title}>
              <span className="accent-number">{item.no}</span>
              <span className="quick-title">{item.title}</span>
              <span className="quick-desc">{item.desc}</span>
              <span className="quick-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head"><h2>Browse</h2><span>Anime4u</span></div>
        <div className="browse-list">
          {categories.map((item) => (
            <Link href={item.href} className="browse-row" key={item.title}>
              <span className="accent-number">{item.no}</span>
              <span><strong>{item.title}</strong><small>{item.desc}</small></span>
              <span className="open-label">OPEN&nbsp; →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container disclaimer">
        <strong>Disclaimer.</strong> Anime4u does not host media files. This website only links to media hosted on Telegram. All media and rights belong to their respective owners.
      </section>
    </main>
  );
}
