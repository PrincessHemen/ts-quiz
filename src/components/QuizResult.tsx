// QuizResult.tsx
import React from 'react';

type User = {
  name: string;
  email: string;
  photoURL: string;
};

type Props = {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
  onHome: () => void;
  user: User; // New user prop
};

const QuizResult: React.FC<Props> = ({ score, totalQuestions, onRetry, onHome, user }) => {
  return (
    <div className="p-4 text-center text-white">
      <div className="flex items-center space-x-4 mb-8">
        <img src={user.photoURL} alt="User Profile" className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="text-xl font-eczar">{user.name}</h3>
          <p className="text-sm font-catamaran">{user.email}</p>
        </div>
      </div>
      <h2 className="text-4xl font-eczar mb-4">Quiz Completed!</h2>
      <p className="text-lg font-catamaran mb-4">You scored {score} out of {totalQuestions}</p>
      <button
        onClick={onRetry}
        className="px-8 py-4 text-lg font-catamaran bg-blue-900 hover:bg-blue-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out mb-4"
      >
        Retry Quiz
      </button>
      <button
        onClick={onHome}
        className="px-8 py-4 text-lg font-catamaran bg-blue-900 hover:bg-blue-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        Go Home
      </button>
    </div>
  );
};

export default QuizResult;
