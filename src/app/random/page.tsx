"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAnimeBySearch } from "../../utils/fetchAnime";

export default function RandomPick() {
  const [anime, setAnime] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const getRandom = async () => {
    setLoading(true);
    try {
      const randomKeywords = ["love", "power", "ghost", "dream", "war", "slice", "high school"];
      const keyword = randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
      const results = await fetchAnimeBySearch(keyword);

      if (results && results.length > 0) {
        const randomAnime = results[Math.floor(Math.random() * results.length)];
        setAnime(randomAnime);
      } else {
        // fallback anime: Skip and Loafer
        setAnime({
          title: { romaji: "Skip and Loafer" },
          coverImage: { large: "/images/skip-and-loafer.jpg" },
          description: "Iwakura Mitsumi is a smart and ambitious girl from a small town, ready to make her mark in the big city. But nothing goes quite as planned... and high school life gets unexpectedly awkward, heartwarming, and hilarious."
        });
      }
    } catch (err) {
      console.error("Failed to fetch random anime:", err);
      // fallback anime on error too
      setAnime({
        title: { romaji: "Skip and Loafer" },
        coverImage: { large: "/images/skip-and-loafer.jpg" },
        description: "Iwakura Mitsumi is a smart and ambitious girl from a small town, ready to make her mark in the big city. But nothing goes quite as planned... and high school life gets unexpectedly awkward, heartwarming, and hilarious."
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandom();
  }, []);

  if (loading) return <p className="text-center p-6">Loading your random anime...</p>;

  return (
    <div className="min-h-screen p-8 text-center flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">🎲 Your Random Anime Pick</h1>
      <div className="w-80 bg-white bg-opacity-90 text-black p-6 rounded-2xl shadow-md border border-gray-300">
        <h2 className="text-2xl font-semibold mb-2">{anime.title.romaji}</h2>
        <img src={anime.coverImage.large} alt={anime.title.romaji} className="w-48 mx-auto rounded-lg" />
        <p className="text-sm mt-4" dangerouslySetInnerHTML={{ __html: anime.description?.slice(0, 300) + '...' }} />
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={getRandom}
          className="px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md"
        >
          🔁 Generate Again
        </button>
        <Link href="/" className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md">
          ⬅️ Back to Home
        </Link>
      </div>
    </div>
  );
}
