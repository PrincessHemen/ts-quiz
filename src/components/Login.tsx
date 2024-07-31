import React from 'react';
import { auth, provider } from '../Firebase';
import { signInWithPopup } from 'firebase/auth';

type LoginProps = {
  setUser: (user: any) => void;
};

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background2.jpg)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-eczar mb-6">Welcome to Trivia Quiz</h1>
        <button
          onClick={handleLogin}
          className="px-8 py-4 text-lg font-catamaran bg-blue-900 hover:bg-blue-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
