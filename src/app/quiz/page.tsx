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
  const [expanded, setExpanded] = useState(false);

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
      <div className="p-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-6">🍿 Your Anime Watchlist Awaits</h1>
        <p className="text-lg mb-8">Based on your vibe check, here's what you should absolutely be watching next:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 mb-12 w-full">

          {recommendations.map((anime, index) => (
            <div
              key={index}
              className="card w-full shrink-0 snap-center"
            >
              <h2 className="text-2xl font-semibold mb-2">
                {anime.title.romaji}
                {anime.title.native && (
                    <span className="block text-sm text-gray-500">({anime.title.native})</span>
                )}
              </h2>

              <img
                src={anime.coverImage.large}
                alt={anime.title.romaji}
                className="w-48 mx-auto rounded-lg"
              />
              <p
            className="text-base mt-4 text-left"
            dangerouslySetInnerHTML={{
                __html: expanded
                ? anime.description
                : anime.description?.slice(0, 500) + '...'
            }}
            />

            {anime.description?.length > 300 && (
            <button
                onClick={() => setExpanded(!expanded)}
                className="read-more"
            >
                {expanded ? "Show less" : "Read more"}
            </button>
            )}
            </div>
          ))}
        </div>
        <div className="flex flex-row sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={restartQuiz}
            className="btn-yellow"
          >
            Take Quiz Again
          </button>
          <Link
            href="/"
            className="btn-yellow"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (shuffledQuestions.length === 0) return <p className="p-6 text-center">Loading your anime destiny...</p>;

  const q = shuffledQuestions[current];

  return (
    <div className="p-8 max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold mb-4">🎬 What Should You Watch Next?</h1>
      <p className="text-lg mb-8">10 chaotic questions to unlock your next anime obsession.</p>
      <p className="text-xl font-medium mb-6">{q.question}</p>
      <div className="flex flex-col gap-4">
        {q.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(option)}
            className="option-yellow"
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="mt-6 mb-10 text-sm text-gray-400">
        Question {current + 1} of {shuffledQuestions.length}
      </p>
      <Link
        href="/"
        className="btn-yellow"
      >
        Back to Home
      </Link>
    </div>
  );
}