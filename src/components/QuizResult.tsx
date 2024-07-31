import React from 'react';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  averageScore: number;
  onRetry: () => void;
  onHome: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ score, totalQuestions, averageScore, onRetry, onHome }) => {
  return (
    <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Quiz Completed!</h2>
      <p className="text-lg font-bold mb-4 text-gray-800">Your score: {score} / {totalQuestions}</p>
      <p className="text-lg font-bold mb-4 text-gray-800">Your average score: {averageScore}</p>
      <button onClick={onRetry} className="px-6 py-2 bg-blue-500 text-white font-bold rounded-md mr-2">Retry</button>
      <button onClick={onHome} className="px-6 py-2 bg-gray-500 text-white font-bold rounded-md">Home</button>
    </div>
  );
};

export default QuizResult;