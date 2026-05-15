import React from "react";
import { quizCatalog } from "../../data/quizzes";
import QuizCard from "../../components/quiz/QuizCard";
import "../pagesCss/Quiz.css";

const QuizHub = () => {
  return (
    <div className="qz-page qz-hub-page">
      <div className="qz-hub-hero qz-panel qz-panel--hero">
        <span className="qz-eyebrow">Quiz library</span>
        <h1>Choose a quiz to start</h1>
        <p className="qz-copy">
          Pick a quiz below to practice word meaning, contrast, and context in a
          short timed format. Each quiz uses the same layout, so the only thing
          that changes is the topic you are working on.
        </p>
      </div>

      <div className="qz-hub-grid">
        {quizCatalog.map((quiz) => (
          <QuizCard key={quiz.slug} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default QuizHub;
