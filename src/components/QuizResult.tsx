// QuizResult.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt, faHome } from '@fortawesome/free-solid-svg-icons';

type Props = {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
  onHome: () => void;
};

const QuizResult: React.FC<Props> = ({ score, totalQuestions, onRetry, onHome }) => {
  return (
    <div className="p-4 text-center text-white">
      <h2 className="text-4xl font-eczar mb-4">Quiz Complete!</h2>
      <p className="text-lg font-catamaran">Your Score: {score} / {totalQuestions}</p>
      <div className="flex justify-center mt-6">
        <button
          className="mx-2 px-6 py-3 text-lg font-catamaran bg-blue-900 hover:bg-blue-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
          onClick={onRetry}
        >
          <FontAwesomeIcon icon={faRedoAlt} className="mr-2" /> Restart Quiz
        </button>
        <button
          className="mx-2 px-6 py-3 text-lg font-catamaran bg-blue-900 hover:bg-blue-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
          onClick={onHome}
        >
          <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
