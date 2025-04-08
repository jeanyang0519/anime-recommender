"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { fetchAnimeBySearch } from "../../utils/fetchAnime";
import { jeansList } from "../data/jeansList"; 
import FadeText from "../../components/FadeText";

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
        jeansList[Math.floor(Math.random() * jeansList.length)];
        setAnime(fallback);
      }
    } catch (err) {
      console.error("Failed to fetch random anime:", err);
      const fallback =
      jeansList[Math.floor(Math.random() * jeansList.length)];
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
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <motion.div
  animate={{ rotate: 360 }}
  transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
  className="text-4xl"
>
⏳
</motion.div>
<div className="font-2xl">Loading</div>

      </div>
    );

  return (
    <div className="min-h-screen p-8 text-center flex flex-col items-center gap-4">
      <h1 className="title">Your Random Anime Pick</h1>
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
      <FadeText html={anime.description} />

      </div>
      <div className="flex flex-row sm:flex-row gap-4 ">
        <button onClick={getRandom} className="btn-small">
          Try Again
        </button>
       
      </div>
    </div>
  );
}
