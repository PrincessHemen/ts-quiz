import React, { useState, useEffect } from 'react';
import { auth, firestore, collection, addDoc, query, where, getDocs } from '../Firebase'; // Import necessary Firestore methods

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  averageScore: number; // Add this line
  onRetry: () => void;
  onHome: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ score, totalQuestions, averageScore, onRetry, onHome }) => {
  const [calculatedAverageScore, setCalculatedAverageScore] = useState(averageScore);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      // Save the user's score to Firestore
      const userScoresRef = collection(firestore, 'userScores');
      addDoc(userScoresRef, {
        userId: currentUser.uid,
        score: score,
        totalQuestions: totalQuestions,
        timestamp: new Date(),
      })
        .then(() => {
          // Compute the average score
          computeAverageScore(currentUser.uid);
        })
        .catch((error) => {
          console.error('Error saving score:', error);
        });
    }
  }, [score, totalQuestions]);

  const computeAverageScore = async (userId: string) => {
    const userScoresRef = collection(firestore, 'userScores');
    const q = query(userScoresRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    let totalScore = 0;
    let totalQuestions = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data() as { score: number; totalQuestions: number };
      totalScore += data.score;
      totalQuestions += data.totalQuestions;
    });

    const newAverageScore = totalQuestions > 0 ? totalScore / totalQuestions : 0;
    setCalculatedAverageScore(newAverageScore);
  };

  return (
    <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Quiz Completed!</h2>
      <p className="text-lg font-bold mb-4 text-gray-800">Your score: {score} / {totalQuestions}</p>
      <p className="text-lg font-bold mb-4 text-gray-800">Your average score: {calculatedAverageScore.toFixed(2)}</p>
      <button onClick={onRetry} className="px-6 py-2 bg-blue-500 text-white font-bold rounded-md mr-2">Retry</button>
      <button onClick={onHome} className="px-6 py-2 bg-gray-500 text-white font-bold rounded-md">Home</button>
    </div>
  );
};

export default QuizResult;
