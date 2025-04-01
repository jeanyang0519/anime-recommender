import { NextRequest, NextResponse } from "next/server";
import { fetchAnimeBySearch } from "../../../utils/fetchAnime";

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    // Combine user answers into one big keyword blob
    const keywords = answers.map((a: { a: string }) => a.a).join(" ");
    console.log("Generated search keywords:", keywords);

    // Query AniList for matching anime
    const animeList = await fetchAnimeBySearch(keywords);

    // Return top 3 results
    return NextResponse.json(animeList.slice(0, 3));
  } catch (error) {
    console.error("Recommend API error:", error);
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
  }
}
