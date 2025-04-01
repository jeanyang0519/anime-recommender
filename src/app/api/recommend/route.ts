import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    // Combine answers into a single string prompt
    const prompt = answers.map((a: { q: string; a: string }) => `${a.q} ${a.a}`).join(". ");

    // TODO: Replace with real logic or call your fetchAnimeByGenre / embedding engine
    // Temporary mock results:
    const mockAnime = [
      {
        title: { romaji: "Your Lie in April" },
        coverImage: { large: "https://cdn.myanimelist.net/images/anime/3/67177.jpg" },
        description: "A piano prodigy who lost his ability to hear music after his mother's death meets a free-spirited violinist."
      },
      {
        title: { romaji: "Mob Psycho 100" },
        coverImage: { large: "https://cdn.myanimelist.net/images/anime/8/80356.jpg" },
        description: "A boy with psychic powers tries to live a normal life while dealing with spirits, self-control, and his over-the-top mentor."
      },
      {
        title: { romaji: "Anohana: The Flower We Saw That Day" },
        coverImage: { large: "https://cdn.myanimelist.net/images/anime/5/73199.jpg" },
        description: "A group of childhood friends reunite years after a tragic accident, as the ghost of their lost friend brings them back together."
      }
    ];

    return NextResponse.json(mockAnime);
  } catch (error) {
    console.error("Recommend API error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
