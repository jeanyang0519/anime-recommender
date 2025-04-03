"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAnimeBySearch } from "../../utils/fetchAnime";

export default function RandomPick() {
  const [anime, setAnime] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRandom = async () => {
      try {
        const randomKeywords = ["love", "power", "ghost", "dream", "war", "slice", "high school"];
        const keyword = randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
        const results = await fetchAnimeBySearch(keyword);
        const randomAnime = results[Math.floor(Math.random() * results.length)];
        setAnime(randomAnime);
      } catch (err) {
        console.error("Failed to fetch random anime:", err);
      } finally {
        setLoading(false);
      }
    };

    getRandom();
  }, []);

  if (loading) return <p className="text-center p-6">Loading your random anime...</p>;

  if (!anime) return <p className="text-center p-6">Oops! Couldn't find an anime. Try again later.</p>;

  return (
    <div className="min-h-screen p-8 text-center flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">🎲 Your Random Anime Pick</h1>
      <div className="w-80 bg-white bg-opacity-90 text-black p-6 rounded-2xl shadow-md border border-gray-300">
        <h2 className="text-2xl font-semibold mb-2">{anime.title.romaji}</h2>
        <img src={anime.coverImage.large} alt={anime.title.romaji} className="w-48 mx-auto rounded-lg" />
        <p className="text-sm mt-4" dangerouslySetInnerHTML={{ __html: anime.description?.slice(0, 300) + '...' }} />
      </div>
      <Link href="/" className="mt-6 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md">
        ⬅️ Back to Home
      </Link>
    </div>
  );
}
