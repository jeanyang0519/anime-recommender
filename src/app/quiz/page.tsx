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
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof QUESTIONS>(
    [],
  );
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [recommendations, setRecommendations] = useState<any[] | null>(null);
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>({});
  const [shouldTruncateMap, setShouldTruncateMap] = useState<
    Record<number, boolean>
  >({});

  useEffect(() => {
    const selected = shuffle(QUESTIONS).slice(0, 5);
    setShuffledQuestions(selected);
  }, []);

  useEffect(() => {
    if (!recommendations) return;

    const newExpandedMap: Record<number, boolean> = {};
    const newTruncateMap: Record<number, boolean> = {};

    recommendations.forEach((anime, index) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = anime.description;
      document.body.appendChild(tempDiv);
      const height = tempDiv.offsetHeight;
      document.body.removeChild(tempDiv);

      const shouldTruncate = anime.description?.length > 200 || height > 200;
      newTruncateMap[index] = shouldTruncate;
      newExpandedMap[index] = !shouldTruncate;
    });

    setShouldTruncateMap(newTruncateMap);
    setExpandedMap(newExpandedMap);
  }, [recommendations]);

  const toggleExpanded = (index: number) => {
    setExpandedMap((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAnswer = (option: Option) => {
    const nextAnswers = [
      ...answers,
      {
        q: shuffledQuestions[current].question,
        a: option.label,
        genre: option.genre,
      },
    ];
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
        body: JSON.stringify({ answers }),
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
        <h1 className="title">
          🍿 Your Anime Watchlist Awaits
        </h1>
        <p className="text-lg my-4">
          Based on your vibe check, here's what you should absolutely be
          watching next:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch min-h-0">
          {recommendations.map((anime, index) => (
            <div
              key={index}
              className="card transition-all duration-300 ease-in-out w-full h-full flex flex-col"
            >
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
                className="w-48 mx-auto rounded-lg mb-5 mt-3"
              />
              <div className="relative flex-1">
                <p
                  className={`text-base text-left transition-all duration-300 ease-in-out ${
                    !expandedMap[index] ? "line-clamp-[12] overflow-hidden" : ""
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: expandedMap[index]
                      ? anime.description
                      : anime.description?.slice(0, 200) + "...",
                  }}
                />
                {!expandedMap[index] && (
                  <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-2xl" />
                )}
              </div>

              {shouldTruncateMap[index] && (
                <div className="text-right mt-auto">
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="read-more"
                  >
                    {expandedMap[index] ? "Show less" : "Read more"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-row sm:flex-row gap-4 justify-center mt-4">
          <button onClick={restartQuiz} className="btn-yellow">
            🔁 Try Again
          </button>
          
        </div>
      </div>
    );
  }

  if (shuffledQuestions.length === 0)
    return <p className="p-6 text-center">Loading your anime destiny...</p>;

  const q = shuffledQuestions[current];

  return (
    <div className="p-8 max-w-auto mx-auto text-center">
      <h1 className="title">
        🪄 Make your choice and see what unfolds
      </h1>

      <p className="text-xl font-medium my-6">{q.question}</p>
      <div className="flex flex-col gap-6 items-center">
        {q.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(option)}
            className="quiz-option w-100 "
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-400">
        Question {current + 1} of {shuffledQuestions.length}
      </p>
      
    </div>
  );
}
