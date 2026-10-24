import { api } from '@/lib/api';
export default async function TitlePage({params}:{params:{id:string}}){const item=await api.title(params.id);return <main className="container"><section className="page-head"><p className="eyebrow">ANIME4U / TITLE</p><h1>{item?.title||'Title'}</h1><p>{item?.description||'Title details will appear here when the backend returns them.'}</p></section></main>}
