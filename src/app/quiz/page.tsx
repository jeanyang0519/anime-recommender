"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { QUESTIONS, Option } from "../questions";

export type Answer = {
  q: string;
  a: string;
  genre: string;
};

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function QuizPage() {
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof QUESTIONS>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [recommendations, setRecommendations] = useState<any[] | null>(null);

  useEffect(() => {
    const selected = shuffle(QUESTIONS).slice(0, 5);
    setShuffledQuestions(selected);
  }, []);

  const handleAnswer = (option: Option) => {
    const nextAnswers = [...answers, { q: shuffledQuestions[current].question, a: option.label, genre: option.genre }];
    setAnswers(nextAnswers);

    if (current + 1 < shuffledQuestions.length) {
      setCurrent(current + 1);
    } else {
      getRecommendations(nextAnswers);
    }
  };

  const getRecommendations = async (answers: Answer[]) => {
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
      });
      const data = await res.json();
      setRecommendations(data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    }
  };

  const restartQuiz = () => {
    setShuffledQuestions(shuffle(QUESTIONS).slice(0, 5));
    setCurrent(0);
    setAnswers([]);
    setRecommendations(null);
  };

  if (recommendations) {
    return (
      <div className="p-8 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-6 tracking-tight">🍿 Your Anime Watchlist Awaits</h1>
        <p className="text-lg text-gray-200 mb-8">Based on your vibe check, here's what you should absolutely be watching next:</p>
        <div className="flex overflow-x-auto items-start gap-6 mb-8 px-4 pb-8 w-full">
          {recommendations.map((anime, index) => (
            <div
              key={index}
              className="w-80 shrink-0 snap-center bg-white text-black bg-opacity-80 p-6 rounded-2xl shadow-md border border-white/20"
            >
              <h2 className="text-2xl font-semibold mb-2">{anime.title.romaji}</h2>
              <img
                src={anime.coverImage.large}
                alt={anime.title.romaji}
                className="w-48 mx-auto rounded-lg"
              />
              <p
                className="text-sm mt-4"
                dangerouslySetInnerHTML={{ __html: anime.description}}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={restartQuiz}
            className="px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-semibold shadow-md"
          >
            🔁 Take Quiz Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md text-center"
          >
            ⬅️ Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (shuffledQuestions.length === 0) return <p className="p-6 text-center">Loading your anime destiny...</p>;

  const q = shuffledQuestions[current];

  return (
    <div className="p-8 max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold mb-4 tracking-tight">🎬 What Should You Watch Next?</h1>
      <p className="text-lg text-gray-300 mb-8">10 chaotic questions to unlock your next anime obsession.</p>
      <p className="text-xl font-medium mb-6">{q.question}</p>
      <div className="flex flex-col gap-4">
        {q.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(option)}
            className="w-64 mx-auto bg-purple-600 text-white py-3 px-6 rounded-full hover:bg-purple-700 transition-all shadow-md cursor-pointer"
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-400">
        Question {current + 1} of {shuffledQuestions.length}
      </p>
      <Link
        href="/"
        className="inline-block mt-6 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
      >
        ⬅️ Back to Home
      </Link>
    </div>
  );
}