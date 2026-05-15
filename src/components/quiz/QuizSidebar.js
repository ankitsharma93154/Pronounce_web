import React from "react";
import "../ComponentCss/QuizSidebar.css";

const QuizSidebar = ({
  score,
  totalQuestions,
  showFeedback,
  selected,
  question,
  onNext,
  currentQuestionNumber,
}) => {
  const isCorrect = selected === question.answerIndex;

  return (
    <aside className="qz-panel qz-panel--side qz-sidebar">
      <div className="qz-sidebar-card">
        <span>Current score</span>
        <strong>
          {score} / {totalQuestions}
        </strong>
      </div>

      <div className="qz-sidebar-card qz-sidebar-card--explanation">
        <span>Answer feedback</span>
        {showFeedback ? (
          <div className="qz-sidebar-feedback">
            <strong
              className={
                isCorrect
                  ? "qz-feedback-status--success"
                  : "qz-feedback-status--error"
              }
            >
              {isCorrect ? "Correct" : "Incorrect"}
            </strong>
            <p>
              Right answer:{" "}
              <strong>{question.options[question.answerIndex]}</strong>
            </p>
            {question.meaning && (
              <p className="qz-word-meaning">
                <strong>Meaning:</strong> {question.meaning}
              </p>
            )}
            <p>{question.explanation}</p>
            {/* Next button moved beside Submit in the question panel */}
          </div>
        ) : (
          <p className="qz-sidebar-muted">
            Submit an answer to see the explanation here.
          </p>
        )}
      </div>
    </aside>
  );
};

export default QuizSidebar;
