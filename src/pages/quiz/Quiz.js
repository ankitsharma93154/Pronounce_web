import React from "react";
import { quizCatalog } from "../../data/quizzes";
import QuizCard from "../../components/quiz/QuizCard";
import "../pagesCss/Quiz.css";

const QuizHub = () => {
  return (
    <div className="qz-page qz-hub-page">
      <div className="qz-hub-hero qz-panel qz-panel--hero">
        <span className="qz-eyebrow">Quiz library</span>
        <h1>Choose a quiz to start practicing</h1>
        <p className="qz-copy">
          Explore quizzes on different topics and practice through short timed
          rounds. The format stays the same across quizzes, making it easy to
          jump in and focus on learning.
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
          These quick and focused quizzes train listening discrimination and
          word choice under mild time pressure. Use them as five- to ten- minute
          practice sessions to reinforce pronunciation, synonyms, and antonyms
          introduced in the blog guides.
        </p>
        <p>
          Each quiz pairs well with our pronunciation tool, you can look up any
          word you encounter here on QuickPronounce to hear native audio,
          compare accents, and review IPA before attempting the quiz.
        </p>

        <div className="qz-hub-faq">
          <h3>You might be curious about...</h3>
          <p>
            <strong>Who are these quizzes for?</strong> For learners who want
            short, repeatable practice to improve recognition and recall while
            taking on small challenges to keep learning engaging.
          </p>
          <p>
            <strong>How long does one quiz take?</strong> Each level includes 10
            timed questions with a 30-second limit per question. Most levels
            take around 3–5 minutes to complete.
          </p>
          <p>
            <strong>Do I need to sign up?</strong> No. Everything on
            QuickPronounce, including quizzes and pronunciation practice
            features, is available without an account.
          </p>
        </div>
      </section>
    </div>
  );
};

export default QuizHub;
