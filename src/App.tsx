import React, { useState, useEffect } from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';
import QuizResult from './components/QuizResult';
import { fetchQuizQuestions, QuizQuestion } from './API';
import { auth, firestore, signOut } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import Login from './components/Login';
import { useNavigate } from 'react-router-dom';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [quizType, setQuizType] = useState('general');
  const [numQuestions, setNumQuestions] = useState(10);
  const [score, setScore] = useState(0);
  const [averageScore, setAverageScore] = useState<number>(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (quizStarted) {
      fetchQuizQuestions(difficulty, quizType, numQuestions)
        .then((questions) => {
          if (questions.length === 0) {
            setError("No questions available for the selected settings. Please try a different configuration.");
          } else {
            setQuestions(questions);
            setError(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
          setError(error.message);
        });
    }
  }, [quizStarted, difficulty, quizType, numQuestions]);

  const logScore = async (score: number) => {
    if (!user) return;
    const userRef = doc(firestore, 'users', user.email);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      const scores: number[] = data.scores || [];
      await updateDoc(userRef, {
        scores: [...scores, score],
      });
    } else {
      await setDoc(userRef, {
        scores: [score],
      });
    }
    fetchScores();
  };

  const fetchScores = async () => {
    if (user) {
      const userRef = doc(firestore, 'users', user.email);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        const scores: number[] = data.scores || [];
        const avg = scores.reduce((acc: number, score: number) => acc + score, 0) / scores.length;
        setAverageScore(avg);
      }
    }
  };

  const startTrivia = () => {
    setQuizStarted(true);
    setQuizEnded(false);
    setScore(0);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  const handleQuizTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuizType(e.target.value);
  };

  const handleNumQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumQuestions(Number(e.target.value));
  };

  const handleQuizEnd = (finalScore: number) => {
    setScore(finalScore);
    setQuizEnded(true);
    setQuizStarted(false);
    logScore(finalScore);
  };

  const goHome = () => {
    setQuizEnded(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  if (!user) return <Login setUser={setUser} />;

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'url(/background2.jpg)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative flex flex-col items-center justify-center min-h-screen text-center text-white p-4">
        <div className="flex items-center space-x-4 mb-8">
          <img src={user?.photoURL} alt="User Profile" className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="text-xl font-eczar">{user?.name}</h3>
            <p className="text-sm font-catamaran">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-8 py-4 text-lg font-catamaran bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-lg mt-4"
        >
          Log Out
        </button>

        {error && <div className="mt-4 p-4 bg-red-600 rounded-lg">{error}</div>}

        {!quizStarted && !quizEnded && (
          <div className="text-white">
            <p className="text-lg mb-4">Average Score: {averageScore.toFixed(2)}</p>
            <button onClick={startTrivia} className="mt-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded">
              Start Quiz
            </button>
            <div className="mt-4">
              <label className="block text-lg font-eczar">
                Choose Difficulty:
              </label>
              <select
                value={difficulty}
                onChange={handleDifficultyChange}
                className="mt-2 p-2 bg-white text-black rounded-md"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-lg font-eczar">
                Choose Quiz Type:
              </label>
              <select
                value={quizType}
                onChange={handleQuizTypeChange}
                className="mt-2 p-2 bg-white text-black rounded-md"
              >
                <option value="general">General Knowledge</option>
                <option value="science">Science</option>
                <option value="history">History</option>
                <option value="sports">Sports</option>
                <option value="entertainment">Entertainment</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-lg font-eczar">
                Number of Questions:
              </label>
              <input
                type="number"
                value={numQuestions}
                onChange={handleNumQuestionsChange}
                min="1"
                max="50"
                className="mt-2 p-2 bg-white text-black rounded-md"
              />
            </div>
          </div>
        )}

        <div className="mt-10"> {/* Added padding here */}
          {quizStarted && questions.length > 0 && (
            <QuestionCard
              questions={questions}
              totalQuestions={numQuestions}
              onQuizEnd={handleQuizEnd}
            />
          )}
        </div>
            
        {quizEnded && (
          <QuizResult
          score={score}
          totalQuestions={numQuestions}
          averageScore={averageScore} // This should be a number
          onRetry={startTrivia}
          onHome={goHome}
        />
        )}

      </div>
    </div>
  );
}

export default App;
