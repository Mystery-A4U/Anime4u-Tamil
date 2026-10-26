import { NextResponse } from "next/server";
import { getEpisode } from "@/lib/anime";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = Number(context.params.id);

    if (!Number.isInteger(id)) {
      return NextResponse.json({ error: "Invalid episode ID" }, { status: 400 });
    }

    const episode = await getEpisode(id);

    if (!episode) {
      return NextResponse.json({ error: "Episode not found" }, { status: 404 });
    }

    return NextResponse.json({ episode });
  } catch (error) {
    console.error("Episode API error:", error);
    return NextResponse.json(
      { error: "Unable to load episode" },
      { status: 500 }
    );
  }
}
