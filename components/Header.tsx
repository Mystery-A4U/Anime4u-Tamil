import Link from 'next/link';
import { Search } from 'lucide-react';
export default function Header(){return <header className="header"><div className="container nav"><Link href="/" className="logo">ANIME<span>4U</span></Link><nav><Link href="/">Home</Link><Link href="/series">Series</Link><Link href="/movies">Movies</Link></nav><Link href="/search" className="search"><Search size={16}/><span>Search</span></Link></div></header>}
