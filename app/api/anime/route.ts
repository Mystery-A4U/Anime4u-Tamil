import { NextRequest, NextResponse } from "next/server";
import { searchAnime } from "@/lib/anime";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q")?.trim() || "";

    if (!q) {
      return NextResponse.json({ results: [] });
    }

    const results = await searchAnime(q);
    return NextResponse.json({ results });
  } catch (error) {
    console.error("Anime search error:", error);
    return NextResponse.json(
      { error: "Unable to search anime" },
      { status: 500 }
    );
  }
}