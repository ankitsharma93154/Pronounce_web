import React, { useCallback, useEffect, useRef, useState } from "react";
import "../ComponentCss/QuizRunner.css";
import { buildQuizQuestions, getQuizLevels } from "../../data/quizzes";
import QuizQuestion from "./QuizQuestion";
import QuizSidebar from "./QuizSidebar";
import QuizResults from "./QuizResults";

const DEFAULT_TIME = 30;
// const NEXT_QUESTION_DELAY = 3; (auto-next removed)
const LEVEL_LABELS = ["Beginner", "Easy", "Medium", "Hard", "Expert"];

const QuizRunner = ({ quiz }) => {
  const [level, setLevel] = useState(1);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  // nextIn/auto-next removed
  const timerRef = useRef(null);
  const selectedRef = useRef(selected);

  const handleNext = useCallback(() => {
    setShowFeedback(false);
    setSelected(null);
    selectedRef.current = null;
    // timer will be reset on question change

    if (index + 1 < questions.length) {
      setIndex((currentIndex) => currentIndex + 1);
      return;
    }

    setCompleted(true);
    setStarted(false);
  }, [index, questions.length]);

  const handleSubmit = useCallback(
    (timedOut = false) => {
      if (!started) return;

      const currentQuestion = questions[index];
      const correct =
        !timedOut && selectedRef.current === currentQuestion.answerIndex;

      setShowFeedback(true);
      if (correct) {
        setScore((currentScore) => currentScore + 1);
      }

      clearInterval(timerRef.current);
    },
    [started, questions, index],
  );

  useEffect(() => {
    if (!started) return undefined;

    setCompleted(false);
    setQuestions(buildQuizQuestions(quiz, level));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setShowFeedback(false);
    setTimeLeft(DEFAULT_TIME);
    return undefined;
  }, [started, level, quiz]);

  useEffect(() => {
    if (!started || showFeedback) return undefined;

    setTimeLeft(DEFAULT_TIME);
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(true);
          return 0;
        }

        return currentTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [started, index, showFeedback, handleSubmit]);

  // auto-next behavior removed: users must click Next to continue.

  const handleRestart = () => {
    // clear timers
    setCompleted(false);
    setStarted(false);
    setIndex(0);
    setSelected(null);
    selectedRef.current = null;
    setShowFeedback(false);
    setQuestions([]);
    setScore(0);
    setTimeLeft(DEFAULT_TIME);
    // nextIn removed
  };

  if (completed) {
    return (
      <QuizResults
        quiz={quiz}
        score={score}
        totalQuestions={questions.length}
        onRestart={handleRestart}
      />
    );
  }

  if (!started) {
    const introCopy =
      quiz.questionType === "synonym"
        ? "Synonyms are words with similar meanings, but the best choice still depends on context, tone, and formality. These word pairs have been used for centuries to make writing more precise and expressive, so the quickest habit is to compare meaning first and natural fit second."
        : "Antonyms are words with opposite meanings, and they help sharpen contrast, clarity, and precision. From classical rhetoric to modern writing, opposites have long been used to highlight ideas, so the best habit is to spot the exact opposite, not just a loosely related contrast.";

    return (
      <div className="qz-page">
        <div className="qz-grid">
          <section
            className={`qz-panel qz-panel--hero qz-panel--hero--${quiz.questionType}`}
          >
            <span className="qz-eyebrow">Level {level}</span>
            <div className="qz-title-with-tags">
              <h2>{quiz.title}</h2>
              <div className="qz-theme-strip" aria-hidden="true">
                <span>
                  {quiz.questionType === "synonym" ? "Meaning" : "Opposites"}
                </span>
                <span>{quiz.levels} levels</span>
                <span>{quiz.questionsPerLevel} questions each</span>
              </div>
            </div>
            <p className="qz-copy">Click a level to begin.</p>
            <p className="qz-copy qz-copy--intro qz-copy--intro-desktop">
              {introCopy}
            </p>
            <p className="qz-copy qz-copy--intro qz-copy--intro-mobile">
              {quiz.questionType === "synonym"
                ? "Synonyms share similar meanings, but context still matters."
                : "Antonyms show opposite meaning and sharpen contrast."}
            </p>

            <div
              className="qz-level-grid"
              role="list"
              aria-label="Select a quiz level"
            >
              {getQuizLevels(quiz).map((quizLevel) => (
                <button
                  key={quizLevel}
                  type="button"
                  className={`qz-level-card ${level === quizLevel ? "is-active" : ""}`}
                  onClick={() => {
                    setLevel(quizLevel);
                    setStarted(true);
                  }}
                >
                  <span className="qz-level-label">Level {quizLevel}</span>
                  <strong>{quiz.questionsPerLevel} questions</strong>
                  <small>{LEVEL_LABELS[quizLevel - 1] ?? "Level"}</small>
                </button>
              ))}
            </div>
          </section>

          <aside className="qz-panel qz-panel--side">
            <h3>Instructions</h3>
            <ul className="qz-summary-list qz-summary-list--compact">
              <li>Click any level card to start.</li>
              <li>30 seconds per question.</li>
              <li>MCQ with instant feedback.</li>
            </ul>
          </aside>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[index];

  if (!currentQuestion) {
    return <div className="qz-page">Loading questions...</div>;
  }

  return (
    <div className="qz-page">
      <div className="qz-grid qz-grid--active">
        <QuizQuestion
          quiz={quiz}
          question={currentQuestion}
          selected={selected}
          showFeedback={showFeedback}
          onSelect={(optionIndex) => {
            if (showFeedback) return;
            setSelected(optionIndex);
            selectedRef.current = optionIndex;
          }}
          onSubmit={() => handleSubmit(false)}
          onNext={handleNext}
          questionNumber={index + 1}
          questionTotal={questions.length}
          timeLeft={timeLeft}
          timeLimit={DEFAULT_TIME}
        />

        <QuizSidebar
          score={score}
          totalQuestions={questions.length}
          showFeedback={showFeedback}
          selected={selected}
          question={currentQuestion}
          onNext={handleNext}
          currentQuestionNumber={index + 1}
        />
      </div>
    </div>
  );
};

export default QuizRunner;
