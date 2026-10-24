import Link from 'next/link';
import { getMedia, type MediaType } from '@/lib/api';

export default async function Catalog({title, description, type}:{title:string;description:string;type:MediaType}){
  const items = await getMedia(type);
  return <main className="container">
    <section className="page-head"><p className="eyebrow">ANIME4U / CATALOG</p><h1>{title}</h1><p>{description}</p></section>
    {items.length ? <div className="cards">{items.map(item=><Link href={`/title/${item.id}`} className="card" key={item.id}>{item.poster?<img src={item.poster} alt=""/>:<div className="posterblank">A4U</div>}<strong>{item.title}</strong><small>{item.type}</small></Link>)}</div> : <section className="empty-state"><div className="hero-rule"/><h2>No titles available yet.</h2><p>The catalogue is connected to the real Anime4u API. Once your backend returns titles for this category, they will appear here automatically.</p></section>}
  </main>;
}
