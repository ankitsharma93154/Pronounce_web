import quizBank from "./quiz.json";

const shuffle = (items) => {
  const nextItems = items.slice();

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[randomIndex]] = [
      nextItems[randomIndex],
      nextItems[index],
    ];
  }

  return nextItems;
};

export const quizCatalog = [
  {
    slug: "synonyms",
    title: "Synonyms Quiz",
    eyebrow: "Word meaning",
    description:
      "Pick the closest meaning and sharpen your vocabulary recognition.",
    accent: "var(--primary-gradient)",
    tone: "blue",
    questionType: "synonym",
    levels: 5,
    questionsPerLevel: 10,
    rules: ["5 levels", "10 questions per level", "30s timer", "MCQs"],
    outcomes: ["Broader word choice", "Faster recall", "Better reading"],
    promptPrefix: "Select the synonym of",
  },
  {
    slug: "antonyms",
    title: "Antonyms Quiz",
    eyebrow: "Opposite meaning",
    description:
      "Choose the opposite meaning and build stronger contrast awareness.",
    accent: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
    tone: "warm",
    questionType: "antonym",
    levels: 5,
    questionsPerLevel: 10,
    rules: ["5 levels", "10 questions per level", "30s timer", "MCQs"],
    outcomes: [
      "Sharper comparisons",
      "Better word contrast",
      "Stronger recall",
    ],
    promptPrefix: "Select the antonym of",
  },
];

export const getQuizBySlug = (slug) =>
  quizCatalog.find((quiz) => quiz.slug === slug);

export const getQuizLevels = (quiz) =>
  Array.from({ length: quiz.levels }, (_, levelIndex) => levelIndex + 1);

export const buildQuizQuestions = (quiz, level) => {
  const levelQuestions = quizBank.filter(
    (question) =>
      question.type === quiz.questionType && question.level === level,
  );

  return shuffle(levelQuestions).slice(0, quiz.questionsPerLevel);
};

export const getQuizTotalQuestions = (quiz) =>
  quiz.levels * quiz.questionsPerLevel;
