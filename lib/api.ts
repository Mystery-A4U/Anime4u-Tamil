export type MediaType='anime'|'movies'|'tv'|'kdrama';
export type MediaItem={id:string;title:string;type:MediaType;poster?:string};
const API=process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/,'');
export async function getMedia(type:MediaType):Promise<MediaItem[]>{
 if(!API)return [];
 try{const r=await fetch(`${API}/api/titles?type=${encodeURIComponent(type)}`,{next:{revalidate:30}});if(!r.ok)return [];return r.json();}catch{return []}
}
