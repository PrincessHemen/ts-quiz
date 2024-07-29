// Login.tsx
import React from 'react';
import { auth, provider } from '../Firebase';
import { signInWithPopup } from 'firebase/auth';

const Login = ({ setUser }: { setUser: (user: any) => void }) => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        setUser(result.user);
      })
      .catch(error => {
        console.error("Error signing in with Google", error);
      });
  };

  return (
    <div className="login">
      <h2 className="text-4xl font-eczar mb-4">Please sign in to continue</h2>
      <button
        onClick={signInWithGoogle}
        className="px-8 py-4 text-lg font-catamaran bg-blue-900 hover:bg-blue-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
