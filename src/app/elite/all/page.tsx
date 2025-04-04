"use client";

import Link from "next/link";
import { jeansList } from "../../data/jeansList";

export default function EliteFullList() {
  return (
    <div className="min-h-screen p-8 text-center flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold">📚 Jean’s Anime List</h1>
      <p className="text-lg mb-8">Curated with love</p>

      <div className=" flex flex-col w-full max-w-6xl gap-4">
        <div className="hidden lg:grid grid-cols-[1fr_170px_2fr_1fr] gap-4 px-6 text-left  font-semibold text-gray-600 mb-2">
          <div>Title</div>
          <div>Image</div>
          <div>Description</div>
          <div>Note</div>
        </div>
        {jeansList.map((anime, index) => (
          <div
            key={index}
            className="grid grid-cols-1 lg:grid-cols-[1fr_170px_2fr_1fr] gap-4 p-6 border border-white/10 rounded-xl bg-white bg-opacity-10 text-left"
          >
            {/* Title */}
            <div className="font-bold text-lg">
              {anime.title.english}
              {anime.title.native && (
                <div className="text-sm ">({anime.title.native})</div>
              )}
            </div>

            {/* Image */}
            <div>
              <img
                src={anime.coverImage?.large || "/images/skip-and-loafer.jpg"}
                alt={anime.title.english}
                className="w-30 rounded-lg"
              />
            </div>

            {/* Description */}
            <div className="text-sm ">{anime.description}</div>

            {/* Note */}
            <div className="text-sm  italic">{anime.note || "—"}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Link href="/elite" className="btn-yellow w-full sm:w-auto">
          ⬅️ Back to Elite Picks
        </Link>
        <Link href="/" className="btn-yellow w-full sm:w-auto">
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}
