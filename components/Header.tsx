'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const links=[['Home','/'],['Series','/series'],['Movies','/movies']];
export default function Header(){const path=usePathname();return <header className="container nav"><Link className="logo" href="/">Anime<span>4u</span></Link><nav className="navlinks" aria-label="Main navigation">{links.map(([name,href])=>{const active=href==='/'?path==='/':path.startsWith(href);return <Link key={href} href={href} className={`navlink ${active?'active':''}`}>{name}</Link>})}</nav></header>}
