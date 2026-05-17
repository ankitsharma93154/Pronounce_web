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

      <section className="qz-hub-intro qz-panel">
        <h2>Short quizzes to improve spoken accuracy</h2>
        <p>
          These quick, focused quizzes train listening discrimination and word
          choice under mild time pressure. Use them as five- to ten- minute
          practice sessions to reinforce pronunciation, synonyms, and antonyms
          introduced in the blog guides.
        </p>
        <p>
          Each quiz pairs well with our pronunciation tool — look up any word
          you encounter here on QuickPronounce to hear native audio, compare
          accents, and review IPA before attempting the quiz.
        </p>

        <div className="qz-hub-faq">
          <h3>Quick FAQ</h3>
          <p>
            <strong>Who are these quizzes for?</strong> — Learners who want
            short, repeatable practice to improve recognition and recall.
          </p>
          <p>
            <strong>How long does one quiz take?</strong> — Each level is a
            30-second-per-question timed set; a single level typically takes
            5–10 minutes.
          </p>
          <p>
            <strong>Do I need to sign up?</strong> — No. Quizzes are free and
            available without an account; use the pronunciation tool alongside a
            quiz for best results.
          </p>
        </div>
      </section>
    </div>
  );
};

export default QuizHub;
