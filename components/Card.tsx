import Link from 'next/link';
export default function Card({title,type='Media',href='#'}:{title:string;type?:string;href?:string}){return <Link href={href} className="cat"><span className="num">{type}</span><div><h3>{title}</h3><p>Browse available titles</p></div><span className="go">OPEN →</span></Link>}
