import React from "react";
import "../ComponentCss/QuizResults.css";
import { Link } from "react-router-dom";

const QuizResults = ({ quiz, score, totalQuestions, onRestart }) => {
  return (
    <div className="qz-page">
      <div className="qz-grid qz-grid--results">
        <section className="qz-panel qz-panel--hero">
          <span className="qz-eyebrow">Quiz complete</span>
          <h2>{quiz.title} finished</h2>
          <p className="qz-copy">
            You answered {score} out of {totalQuestions} questions correctly.
            Each answer showed instant feedback and explanation inside the
            sidebar.
          </p>
          <div className="qz-results-badges">
            <div className="qz-badge qz-badge--accent">
              <strong>{score}</strong>
              <span>Correct</span>
            </div>
            <div className="qz-badge">
              <strong>{totalQuestions - score}</strong>
              <span>Missed</span>
            </div>
            <div className="qz-badge">
              <strong>30s</strong>
              <span>Timer</span>
            </div>
          </div>
          <div className="qz-actions qz-results-actions">
            <button
              className="qz-button qz-button--primary"
              onClick={onRestart}
            >
              Try another level
            </button>
            <Link className="qz-button qz-button--ghost" to="/quiz">
              Browse quizzes
            </Link>
          </div>
        </section>

        <aside className="qz-panel qz-panel--side qz-results-side">
          <h3>Quiz summary</h3>
          <ul className="qz-summary-list">
            <li>{quiz.levels} levels</li>
            <li>{quiz.questionsPerLevel} questions per level</li>
            <li>MCQ format</li>
            <li>Auto-advance after feedback</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default QuizResults;
