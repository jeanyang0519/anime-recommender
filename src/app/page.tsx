"use client";

import { useState, useEffect } from "react";
import { QUESTIONS } from "./questions";

export type Question = {
  id: number;
  question: string;
  options: string[];
};

export type Answer = {
  q: string;
  a: string;
};

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function HomePage() {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [recommendations, setRecommendations] = useState<any[] | null>(null);

  useEffect(() => {
    const selected = shuffle(QUESTIONS).slice(0, 10);
    setShuffledQuestions(selected);
  }, []);

  const handleAnswer = (answer: string) => {
    const nextAnswers = [...answers, { q: shuffledQuestions[current].question, a: answer }];
    setAnswers(nextAnswers);

    if (current + 1 < 10) {
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

  if (recommendations) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Anime Recommendations</h1>
        {recommendations.map((anime, index) => (
          <div key={index} className="mb-6 border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{anime.title.romaji}</h2>
            <img src={anime.coverImage.large} alt={anime.title.romaji} className="w-40 mt-2" />
            <p className="text-sm mt-2">{anime.description?.slice(0, 200)}...</p>
          </div>
        ))}
      </div>
    );
  }

  if (shuffledQuestions.length === 0) return <p className="p-6">Loading...</p>;

  const q = shuffledQuestions[current];

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Anime Vibe Quiz</h1>
      <p className="text-lg mb-6">{q.question}</p>
      <div className="flex flex-col gap-4">
        {q.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(option)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {option}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-500">
        Question {current + 1} of 10
      </p>
    </div>
  );
}
