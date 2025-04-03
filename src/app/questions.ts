export type Option = {
  label: string;
  genre: string;
};

export type Question = {
  id: number;
  question: string;
  options: Option[];
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "When was the last time you cried?",
    options: [
      {
        label: "I don't cry. I bottle up my feelings.",
        genre: "Psychological",
      },
      { label: "Yesterday.", genre: "Drama" },
      { label: "Two months ago.", genre: "Romance" },
    ],
  },
  {
    id: 2,
    question: "What’s your default emotional setting?",
    options: [
      { label: "Dead inside but trying.", genre: "Psychological" },
      { label: "Chaotically optimistic.", genre: "Slice of Life" },
      { label: "Spicy sadness.", genre: "Tragedy" },
    ],
  },
  {
    id: 3,
    question: "Pick a weather that matches your soul.",
    options: [
      { label: "Thunderstorm", genre: "Supernatural" },
      { label: "Overcast", genre: "Drama" },
      { label: "Sunny but with existential dread", genre: "Slice of Life" },
    ],
  },
  {
    id: 4,
    question: "How do you feel about betrayal arcs?",
    options: [
      { label: "I live for them", genre: "Thriller" },
      { label: "Too painful", genre: "Drama" },
      { label: "Only if there's revenge", genre: "Action" },
    ],
  },
  {
    id: 5,
    question: "Your ideal vacation includes:",
    options: [
      { label: "Getting lost in the woods", genre: "Adventure" },
      { label: "Dramatic beach confrontation", genre: "Romance" },
      {
        label: "City rooftop at night with unresolved tension",
        genre: "Psychological",
      },
    ],
  },
  {
    id: 6,
    question: "How do you handle conflict?",
    options: [
      { label: "Avoid and dissociate", genre: "Slice of Life" },
      { label: "Full confrontation", genre: "Action" },
      { label: "Write an anime script about it", genre: "Comedy" },
    ],
  },
  {
    id: 7,
    question: "What’s your anime pacing preference?",
    options: [
      { label: "Fast chaos", genre: "Shounen" },
      { label: "Slow emotional burn", genre: "Drama" },
    ],
  },
  {
    id: 8,
    question: "You hear an anime opening. You...",
    options: [
      { label: "Cry instantly", genre: "Tragedy" },
      { label: "Skip it", genre: "Action" },
      { label: "Sing every word passionately", genre: "Music" },
    ],
  },
  {
    id: 9,
    question: "Your favorite trope?",
    options: [
      { label: "Enemies to lovers", genre: "Romance" },
      { label: "Power of friendship", genre: "Shounen" },
      { label: "Mysterious loner", genre: "Psychological" },
    ],
  },
  {
    id: 10,
    question: "Would you pet the anime villain’s cat?",
    options: [
      { label: "Yes", genre: "Supernatural" },
      { label: "Absolutely not", genre: "Horror" },
      { label: "Depends on the cat", genre: "Fantasy" },
    ],
  },
];
