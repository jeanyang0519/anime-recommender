"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center  gap-6 p-8 text-center">
      <h1 className="title">
        Let me lead you into the anime abyss
      </h1>
      <p className="text-lg text-gray-600 max-w-xl">
        These picks will help. Or hurt. I don’t know. Good luck.
      </p>

      <div className="flex flex-col gap-6 w-full max-w-xs">
        

        <Link href="/quiz" className="option-yellow">
          🧠 Take the Quiz
        </Link>

        <Link href="/elite" className="option-yellow">
          🌟 Elite Picks
        </Link>
        <Link href="/random" className="option-yellow">
          🎲 Random Pick
        </Link>
      </div>
    </div>
  );
}
