// QuestionCard.tsx
import React, { useState } from 'react';

type QuizQuestion = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type User = {
  name: string;
  email: string;
  photoURL: string;
};

type Props = {
  questions: QuizQuestion[];
  totalQuestions: number;
  onQuizEnd: (score: number) => void;
  user: User; // New user prop
};

const QuestionCard: React.FC<Props> = ({ questions, totalQuestions, onQuizEnd, user }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const answers = currentQuestion
    ? [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort()
    : [];

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedAnswer = e.currentTarget.value;
    setUserAnswer(selectedAnswer);
    setAnswered(true);

    if (selectedAnswer === currentQuestion?.correct_answer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const nextQuestion = () => {
    setUserAnswer(null);
    setAnswered(false);

    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onQuizEnd(score);
    }
  };

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="p-4 text-center text-white">
      <div className="flex items-center space-x-4 mb-8">
        <img src={user.photoURL} alt="User Profile" className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="text-xl font-eczar">{user.name}</h3>
          <p className="text-sm font-catamaran">{user.email}</p>
        </div>
      </div>
      <p className="text-lg font-catamaran">Question {currentQuestionIndex + 1} / {totalQuestions}</p>
      <p className="text-xl font-eczar mb-4" dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></p>
      <div className="flex flex-col items-center">
        {answers.map((answer, index) => (
          <button
            key={index}
            className={`p-2 rounded mb-2 w-3/4 ${userAnswer === answer ? 'bg-green-700' : 'bg-blue-700 hover:bg-blue-600'} text-white`}
            onClick={checkAnswer}
            value={answer}
            disabled={answered}
          >
            {answer}
          </button>
        ))}
      </div>
      {answered && (
        <div className="mt-4">
          <button className="bg-blue-900 hover:bg-blue-800 text-white p-2 rounded" onClick={nextQuestion}>
            {currentQuestionIndex + 1 === totalQuestions ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
