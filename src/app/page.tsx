"use client";

import { useState, useEffect } from "react";
import { QUESTIONS, Option } from "./questions";

export type Answer = {
  q: string;
  a: string;
  genre: string;
};

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function HomePage() {
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
      <div className="p-8 max-w-full mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-6">✨ This is meant to be ✨</h1>
        <p className="text-lg mb-8">These are the anime the universe (and your choices) screamed at me to show you:</p>
        <div className="overflow-x-auto w-full px-4 pb-8">
        <div className="flex gap-6 snap-x snap-mandatory justify-center w-fit mx-auto">
          {recommendations.map((anime, index) => (
            <div
              key={index}
              className="w-100 shrink-0 snap-center bg-yellow-50 text-black bg-opacity-80 p-6 rounded-2xl shadow-md border border-white/20"
            >
              <h2 className="text-2xl font-semibold mb-6">{anime.title.romaji}</h2>
              <img
                src={anime.coverImage.large}
                alt={anime.title.romaji}
                className="w-48 mx-auto rounded-lg mb-8"
              />
              <p
                className="text-base text-left mt-4"
                dangerouslySetInnerHTML={{
                  __html: anime.description,
                }}
              />
            </div>
          ))}
        </div>
      </div>





        <button
          onClick={restartQuiz}
          className="border-2 cursor-pointer mt-6 px-6 py-3 rounded-full bg-yellow-100 hover:bg-yellow-250 text-black font-semibold"
        >
          Back to home
        </button>
      </div>
    );
  }

  if (shuffledQuestions.length === 0) return <p className="p-6 text-center">Loading the chaos...</p>;

  const q = shuffledQuestions[current];

  return (
    <div className="p-4 mx-auto text-center">
      <h1 className="text-4xl font-extrabold mb-5 mt-10">Let me help you pick your next anime to watch</h1>
      <p className="text-xl  mb-20">These picks will help. Or hurt. I don’t know. Good luck.</p>
      <p className="text-xl font-medium mb-6">{q.question}</p>
      <div className="w-100 mx-auto flex flex-col gap-4">
        {q.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(option)}
            className="border bg-yellow-100 cursor-pointer py-3 px-6 rounded-full hover:bg-yellow-300 transition-all shadow-md"
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-400">
        Question {current + 1} of 5
      </p>
    </div>
  );
}
