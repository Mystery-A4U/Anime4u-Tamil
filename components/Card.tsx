import Link from 'next/link';
import type {MediaItem} from '@/lib/api';
export default function Card({item}:{item:MediaItem}){return <Link href={`/title/${item.id}`} className="card">{item.poster?<img src={item.poster} alt=""/>:<div className="posterblank">A4U</div>}<div><strong>{item.title}</strong><small>{item.type}</small></div></Link>}
