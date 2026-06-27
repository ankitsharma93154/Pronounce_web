// Quiz data now lives under src/data/qpQuizzes/<slug>/level<level>.json
// Legacy combined quiz.json has been removed; loader will attempt to
// require per-level JSON. If a level file is missing, an empty set is returned.

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
    questionType: "synonyms",
    levels: 5,
    questionsPerLevel: 10,
    rules: ["5 levels", "10 questions per level", "30s timer", "MCQs"],
    outcomes: ["Broader word choice", "Faster recall", "Better reading"],
  },
  {
    slug: "antonyms",
    title: "Antonyms Quiz",
    eyebrow: "Opposite meaning",
    description:
      "Choose the opposite meaning and build stronger contrast awareness.",
    accent: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
    tone: "warm",
    questionType: "antonyms",
    levels: 5,
    questionsPerLevel: 10,
    rules: ["5 levels", "10 questions per level", "30s timer", "MCQs"],
    outcomes: [
      "Sharper comparisons",
      "Better word contrast",
      "Stronger recall",
    ],
  },
  {
    slug: "ipa",
    title: "IPA Quiz",
    eyebrow: "IPA recognition",
    description:
      "Practice matching words to their IPA transcriptions and learn stress and vowel contrasts.",
    accent: "linear-gradient(135deg,#4ade80 0%, #06b6d4 100%)",
    tone: "green",
    questionType: "ipa",
    levels: 5,
    questionsPerLevel: 10,
    rules: ["5 levels", "10 questions per level", "30s timer", "MCQs"],
    outcomes: [
      "IPA recognition",
      "Better transcription reading",
      "Improved listening",
    ],
  },
  {
    slug: "word-stress",
    title: "Word Stress Quiz",
    eyebrow: "Stress placement",
    description:
      "Identify correct stress patterns in English words to improve rhythm and pronunciation.",
    accent: "linear-gradient(135deg,#f97316 0%, #ef4444 100%)",
    tone: "orange",
    questionType: "wordStress",
    levels: 5,
    questionsPerLevel: 10,
    rules: ["5 levels", "10 questions per level", "30s timer", "MCQs"],
    outcomes: [
      "Stress placement",
      "Improved rhythm",
      "Better word recognition",
    ],
  },
];

export const getQuizBySlug = (slug) =>
  quizCatalog.find((quiz) => quiz.slug === slug);

export const getQuizLevels = (quiz) =>
  Array.from({ length: quiz.levels }, (_, levelIndex) => levelIndex + 1);

export const buildQuizQuestions = (quiz, level) => {
  let levelQuestions = [];

  try {
    // dynamic require per-level JSON; bundlers like webpack will include these files
    // when referenced with a literal path pattern. The try/catch keeps the loader
    // resilient during build if a level file is not present.
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const data = require(`./qpQuizzes/${quiz.questionType}/level${level}.json`);

    if (Array.isArray(data)) {
      levelQuestions = data.map((q) => {
        const options = q.options || q.choices || [];
        let answerIndex = q.answerIndex;
        if (
          typeof answerIndex === "undefined" &&
          typeof q.answer !== "undefined"
        ) {
          answerIndex = options.indexOf(q.answer);
        }

        return {
          id: q.id,
          level: q.level || level,
          // "question" is the current data format (full question text baked
          // into the JSON). Fallbacks to "prompt"/"promptText" are kept only
          // so quiz types not yet migrated off the old template format
          // (e.g. ipa, wordStress) don't break.
          question: q.question || q.prompt || q.promptText || "",
          options,
          answerIndex: typeof answerIndex === "number" ? answerIndex : 0,
          explanation: q.explanation || q.expl || "",
          meaning: q.meaning || q.definition || "",
        };
      });
    }
  } catch (err) {
    // If the per-level JSON is not found, return empty array so the quiz UI
    // can handle the missing data gracefully.
    levelQuestions = [];
  }

  return shuffle(levelQuestions).slice(0, quiz.questionsPerLevel);
};

export const getQuizTotalQuestions = (quiz) =>
  quiz.levels * quiz.questionsPerLevel;
