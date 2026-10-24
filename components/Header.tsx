import Link from 'next/link';

function SearchIcon(){return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>}

export default function Header(){
  return <header className="site-header"><div className="container nav-wrap">
    <Link href="/" className="logo">ANIME<span>4U</span></Link>
    <nav className="main-nav" aria-label="Main navigation"><Link href="/">Home</Link><Link href="/series">Series</Link><Link href="/movies">Movies</Link></nav>
    <Link href="/search" className="search-link"><SearchIcon/><span>Search</span></Link>
  </div></header>
}
