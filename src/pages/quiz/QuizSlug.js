import React from "react";
import { useParams, Navigate } from "react-router-dom";
import QuizRunner from "../../components/quiz/QuizRunner";
import { getQuizBySlug } from "../../data/quizzes";

const QuizSlugPage = () => {
  const { slug } = useParams();
  const quiz = getQuizBySlug(slug);

  if (!quiz) {
    return <Navigate to="/quiz" replace />;
  }

  return <QuizRunner quiz={quiz} />;
};

export default QuizSlugPage;
