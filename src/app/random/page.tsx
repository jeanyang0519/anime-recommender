"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { fetchAnimeBySearch } from "../../utils/fetchAnime";
import { fallbackAnime } from "../data/fallbackAnime";

export default function RandomPick() {
  const [anime, setAnime] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [shouldTruncate, setShouldTruncate] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const getRandom = async () => {
    setLoading(true);
    try {
      const randomKeywords = [
        "love",
        "power",
        "ghost",
        "dream",
        "war",
        "slice",
        "high school",
      ];
      const keyword =
        randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
      const results = await fetchAnimeBySearch(keyword);

      if (results && results.length > 0) {
        const randomAnime = results[Math.floor(Math.random() * results.length)];
        setAnime(randomAnime);
      } else {
        const fallback =
          fallbackAnime[Math.floor(Math.random() * fallbackAnime.length)];
        setAnime(fallback);
      }
    } catch (err) {
      console.error("Failed to fetch random anime:", err);
      const fallback =
        fallbackAnime[Math.floor(Math.random() * fallbackAnime.length)];
      setAnime(fallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandom();
  }, []);

  useEffect(() => {
    if (!anime) return;

    const timeout = setTimeout(() => {
      const height = descriptionRef.current?.offsetHeight || 0;

      const needsTruncation = height > 300 || anime.description?.length > 300;
      setShouldTruncate(needsTruncation);
      setExpanded(!needsTruncation); // collapse only if needed
    }, 50);

    return () => clearTimeout(timeout);
  }, [anime]);

  if (loading)
    return <p className="text-center p-6">Loading your random anime...</p>;

  return (
    <div className="min-h-screen p-8 text-center flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">🎲 Your Random Anime Pick</h1>
      <div className="card w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">
          {anime.title.romaji}
          {anime.title.native && (
            <span className="block text-sm text-gray-500">
              ({anime.title.native})
            </span>
          )}
        </h2>
        <img
          src={anime.coverImage.large}
          alt={anime.title.romaji}
          className="w-48 mx-auto rounded-lg"
        />
        <div
          ref={descriptionRef}
          className="text-base mt-4 text-left transition-all duration-300 ease-in-out"
        >
          <p
            dangerouslySetInnerHTML={{
              __html: expanded
                ? anime.description
                : anime.description?.slice(0, 300) + "...",
            }}
          />
          {shouldTruncate && (
            <div className="text-right mt-2">
              <button
                onClick={() => {
                  setExpanded(!expanded);
                  setTimeout(() => {
                    descriptionRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 50);
                }}
                className="read-more"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row sm:flex-row gap-4 mt-6">
        <button onClick={getRandom} className="btn-yellow ">
          Generate Again
        </button>
        <Link href="/" className="btn-yellow ">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
