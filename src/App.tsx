// App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';
import QuizResult from './components/QuizResult';
import { fetchQuizQuestions, QuizQuestion } from './API';
import { auth, provider } from './Firebase';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import Login from './components/Login';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);

  useEffect(() => {
    if (quizStarted) {
      fetchQuizQuestions(difficulty).then(setQuestions);
    }
  }, [quizStarted, difficulty]);

  const startTrivia = () => {
    setQuizStarted(true);
    setQuizEnded(false);
    setScore(0);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  const handleQuizEnd = (finalScore: number) => {
    setScore(finalScore);
    setQuizEnded(true);
    setQuizStarted(false);
  };

  const goHome = () => {
    setQuizEnded(false);
  };

  const [user, setUser] = useState<any>(null); // User state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: 'url(/background2.jpg)' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative flex flex-col items-center justify-center min-h-screen text-center text-white p-4">
        {!user ? (
          <Login setUser={setUser} /> // Render the login component if the user is not logged in
        ) : (
          <>
            {!quizStarted && !quizEnded && (
              <>
                <h1 className="text-6xl font-eczar mb-8">TRIVIA QUIZ</h1>
                <select
                  value={difficulty}
                  onChange={handleDifficultyChange}
                  className="mb-8 p-2 bg-blue-900 text-white rounded-lg"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <button
                  onClick={startTrivia}
                  className="px-8 py-4 text-lg font-catamaran bg-blue-900 hover:bg-blue-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  START QUIZ
                </button>
              </>
            )}
            {quizStarted && !quizEnded && (
              <QuestionCard
                questions={questions}
                totalQuestions={questions.length}
                onQuizEnd={handleQuizEnd}
              />
            )}
            {quizEnded && (
              <QuizResult
                score={score}
                totalQuestions={questions.length}
                onRetry={startTrivia}
                onHome={goHome}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
  
}

export default App;
