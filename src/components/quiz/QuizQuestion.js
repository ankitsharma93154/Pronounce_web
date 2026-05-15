import React from "react";
import "../ComponentCss/QuizQuestion.css";

const QuizQuestion = ({
  quiz,
  question,
  selected,
  showFeedback,
  onSelect,
  onSubmit,
  onNext,
  questionNumber,
  questionTotal,
  timeLeft,
  timeLimit,
}) => {
  const timeRatio = Math.max(timeLeft / timeLimit, 0);
  const timerHue = Math.round(timeRatio * 120);
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = Math.round(circumference * (1 - timeRatio));

  return (
    <section className="qz-panel qz-panel--hero qz-panel--question">
      <div className="qz-panel-header">
        <div>
          <span className="qz-eyebrow">Level {question.level}</span>
          <h2>
            Question {questionNumber} / {questionTotal}
          </h2>
        </div>
        <div
          className="qz-timer-circle"
          role="timer"
          aria-live="polite"
          aria-label={`Time left ${timeLeft} seconds`}
        >
          <svg
            className="qz-timer-svg"
            viewBox="0 0 48 48"
            width="48"
            height="48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="qz-timer-track"
              cx="24"
              cy="24"
              r="20"
              fill="none"
              strokeOpacity="0.06"
              strokeWidth="4"
            />
            <circle
              className="qz-timer-progress"
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke={`hsl(${timerHue} 78% 44%)`}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 24 24)"
            />
          </svg>
          <div className="qz-timer-number">{timeLeft}</div>
        </div>
      </div>

      <div className="qz-progress-track" aria-hidden="true">
        <span
          style={{ width: `${((questionNumber - 1) / questionTotal) * 100}%` }}
        />
      </div>

      <div className="qz-prompt">
        <strong>
          {quiz.promptPrefix} &quot;{question.prompt}&quot;
        </strong>
      </div>

      <div className="qz-options">
        {question.options.map((option, optionIndex) => {
          const isSelected = selected === optionIndex;
          const isCorrect = question.answerIndex === optionIndex;
          const showCorrect = showFeedback && isCorrect;
          const showWrong = showFeedback && isSelected && !isCorrect;

          const classNames = [
            "qz-option",
            showCorrect ? "correct" : "",
            showWrong ? "wrong" : "",
            isSelected ? "selected" : "",
          ]
            .join(" ")
            .trim();

          return (
            <button
              key={option}
              className={classNames}
              onClick={() => onSelect(optionIndex)}
              disabled={showFeedback}
            >
              <span className="qz-option-letter">
                {String.fromCharCode(65 + optionIndex)}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      <div className="qz-actions">
        {!showFeedback ? (
          <button
            className="qz-button qz-button--primary"
            onClick={onSubmit}
            disabled={selected === null}
            type="button"
          >
            Submit answer
          </button>
        ) : (
          <button
            className="qz-button qz-button--ghost qz-button--next"
            onClick={onNext}
            type="button"
          >
            {questionNumber < questionTotal ? "Next" : "Finish level"}
          </button>
        )}
      </div>
    </section>
  );
};

export default QuizQuestion;
