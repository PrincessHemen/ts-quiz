import React, { useState } from 'react';
import { QuizQuestion } from '../API';

interface QuestionCardProps {
  questions: QuizQuestion[];
  totalQuestions: number;
  onQuizEnd: (score: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questions, totalQuestions, onQuizEnd }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Ensure questions is defined and has items
  if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const current = questions[currentQuestion];

  // Ensure current is defined and has answers
  if (!current || !current.answers) {
    return <div>Loading question...</div>;
  }

  const handleAnswer = (answer: string) => {
    if (!current) return;

    const correctAnswer = current.correct_answer;
    const isCorrect = correctAnswer === answer;

    if (isCorrect) setScore(score + 1);

    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      onQuizEnd(score);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md text-black mb-10">
      <h2 className="text-xl font-bold">
        Question {currentQuestion + 1} / {totalQuestions}
      </h2>
      <div className="my-4">
        <h3 className="text-lg font-semibold">
          {current.question}
        </h3>
        <div className="mt-4">
          {current.answers.map((answer, index) => {
            const isSelected = selectedAnswer === answer;
            const isCorrectAnswer = answer === current.correct_answer;
            const isAnswered = selectedAnswer !== null;

            let buttonClass = 'block w-full text-left p-2 rounded-md mb-2 transition-colors duration-200';

            if (isAnswered) {
              if (isSelected && isCorrectAnswer) {
                buttonClass += ' bg-green-500 hover:bg-green-400'; // Correct and selected
              } else if (isSelected && !isCorrectAnswer) {
                buttonClass += ' bg-red-500 hover:bg-red-400'; // Incorrect and selected
              } else if (!isSelected && isCorrectAnswer) {
                buttonClass += ' bg-green-300 hover:bg-green-200'; // Correct but not selected
              } else {
                buttonClass += ' bg-gray-300 hover:bg-gray-400'; // Incorrect and not selected
              }
            } else {
              buttonClass += ' bg-gray-200 hover:bg-gray-300';
            }

            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => handleAnswer(answer)}
                disabled={isAnswered}
              >
                {answer}
              </button>
            );
          })}
        </div>
      </div>
      {selectedAnswer !== null && (
        <button
          onClick={handleNextQuestion}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg shadow-md"
        >
          {currentQuestion + 1 < totalQuestions ? 'Next Question' : 'End Quiz'}
        </button>
      )}
    </div>
  );
};

export default QuestionCard;
