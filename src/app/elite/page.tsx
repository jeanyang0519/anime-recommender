"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { jeansList } from "../data/jeansList";

export default function ElitePage() {
  const [picks, setPicks] = useState<typeof jeansList>([]);

  useEffect(() => {
    const shuffled = [...jeansList].sort(() => Math.random() - 0.5);
    setPicks(shuffled.slice(0, 3));
  }, []);

  const regenerate = () => {
    const shuffled = [...jeansList].sort(() => Math.random() - 0.5);
    setPicks(shuffled.slice(0, 3));
  };

  return (
    <div className="min-h-screen p-8 text-center flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold">🌟 Jean's Elite Picks</h1>
      <p className="text-lg ">Carefully curated chaos just for you.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full max-w-6xl">
        {picks.map((anime, index) => (
          <div
            key={index}
            className="w-full h-full flex flex-col card"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {anime.title.english}
              {anime.title.native && (
                <span className="block text-sm text-gray-500">({anime.title.native})</span>
              )}
            </h2>
            <img

            //   src={anime.coverImage?.large || "/images/skip-and-loafer.jpg"}
            src="/images/skip-and-loafer.jpg"
              alt={anime.title.english}
              className="w-48 mx-auto rounded-lg"
            />
            <p className="text-sm mt-4 text-left">
              {anime.description}
            </p>
            {anime.note && (
      <div className="mt-2 text-left">
        <h3 className="text-sm font-semibold">Jean's Note:</h3>
        <p className="text-sm  text-gray-700">{anime.note}</p>
      </div>
    )}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button onClick={regenerate} className="btn-yellow w-full sm:w-auto">
          🔁 Try Again
        </button>
        <Link href="/elite/all" className="btn-yellow w-full sm:w-auto">
          📚 Show Full List
        </Link>
        <Link href="/" className="btn-yellow w-full sm:w-auto">
          ⬅️ Back to Home
        </Link>
      </div>
    </div>
  );
}
