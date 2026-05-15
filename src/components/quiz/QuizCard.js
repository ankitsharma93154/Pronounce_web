import React from "react";
import "../ComponentCss/QuizCard.css";
import { Link } from "react-router-dom";

const QuizCard = ({ quiz }) => {
  return (
    <Link
      to={`/quiz/${quiz.slug}`}
      className="qz-hub-card"
      aria-label={`Open ${quiz.title}`}
    >
      <div
        className="qz-hub-card__accent"
        style={{ background: quiz.accent }}
        aria-hidden="true"
      />
      <div className="qz-hub-card__content">
        <span className="qz-eyebrow">{quiz.eyebrow}</span>
        <h2>{quiz.title}</h2>
        <p>{quiz.description}</p>

        <div
          className="qz-hub-card__pills"
          aria-label={`${quiz.title} details`}
        >
          {quiz.rules.map((rule) => (
            <span key={rule}>{rule}</span>
          ))}
        </div>

        <ul className="qz-hub-card__list">
          {quiz.outcomes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="qz-hub-card__actions">
          <span className="qz-hub-card__cta">Open quiz</span>
        </div>
      </div>
    </Link>
  );
};

export default QuizCard;
