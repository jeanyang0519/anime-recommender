import { NextRequest, NextResponse } from "next/server";
import { fetchAnimeByGenres } from "../../../utils/fetchAnime";

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    // Get list of genres from answers
    const allGenres = answers.map((a: { genre: string }) => a.genre);

    // Count genre frequencies and sort by most picked
    const genreCounts: Record<string, number> = {};
    allGenres.forEach((genre: string) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });

    const sortedGenres = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([genre]) => genre);

    // Fetch anime using top 3 genres
    const topGenres = sortedGenres.slice(0, 3);
    const animeList = await fetchAnimeByGenres(topGenres);

    return NextResponse.json(animeList.slice(0, 3));
  } catch (error) {
    console.error("Recommendation error:", error);
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 });
  }
}
