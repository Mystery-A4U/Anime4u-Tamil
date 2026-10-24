export type MediaType = 'anime' | 'movies' | 'tv' | 'kdrama' | 'tamil-movies' | 'anime-series' | 'anime-movies';
export type MediaItem = { id:string; title:string; type:MediaType; poster?:string; description?:string };

const API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

async function request<T>(path:string):Promise<T|null>{
  if(!API) return null;
  try{
    const r=await fetch(`${API}${path}`, { next:{revalidate:30} });
    if(!r.ok) return null;
    return await r.json();
  }catch{return null;}
}

export async function getMedia(type:MediaType):Promise<MediaItem[]>{
  const data=await request<MediaItem[]>(`/api/titles?type=${encodeURIComponent(type)}`);
  return Array.isArray(data) ? data : [];
}

export const api = {
  featured: async()=> (await request<MediaItem[]>('/api/titles/featured')) ?? [],
  search: async(q:string)=> (await request<MediaItem[]>(`/api/search?q=${encodeURIComponent(q)}`)) ?? [],
  title: async(id:string)=> request<MediaItem>(`/api/titles/${encodeURIComponent(id)}`),
  episode: async(id:string)=> request<any>(`/api/episodes/${encodeURIComponent(id)}`),
};
