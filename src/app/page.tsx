"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 p-8 text-center">
      <h1 className="text-4xl font-extrabold">Let me help you pick your next anime to watch</h1>
      <p className="text-lg text-gray-600 max-w-xl">
        These picks will help. Or hurt. I don’t know. Good luck.
      </p>

      <div className="flex flex-col gap-6 w-full max-w-xs">
        <Link href="/random" className="border-2 cursor-pointer py-3 px-6 rounded-full bg-yellow-100 hover:bg-yellow-200 text-black font-semibold text-lg text-center">
          🎲 Random Pick
        </Link>

        <Link href="/quiz" className="border-2 cursor-pointer py-3 px-6 rounded-full bg-yellow-100 hover:bg-yellow-200 text-black font-semibold text-lg text-center">
          🧠 Take the Quiz
        </Link>

        <Link href="/elite" className="border-2 cursor-pointer py-3 px-6 rounded-full bg-yellow-100 hover:bg-yellow-200 text-black font-semibold text-lg text-center">
          🌟 Elite Picks
        </Link>
      </div>
    </div>
  );
}
