import { NextResponse } from "next/server";
import { getAnime, getAnimeEpisodes } from "@/lib/anime";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: { id: string } }
) {
  try {
    const anime = await getAnime(context.params.id);

    if (!anime) {
      return NextResponse.json({ error: "Anime not found" }, { status: 404 });
    }

    const episodes = await getAnimeEpisodes(anime.id);

    return NextResponse.json({ anime, episodes });
  } catch (error) {
    console.error("Anime API error:", error);
    return NextResponse.json(
      { error: "Unable to load anime" },
      { status: 500 }
    );
  }
}