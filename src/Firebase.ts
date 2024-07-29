// Firebase.ts
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, Auth } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs, Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyvOTNgoHDpOA9t8ZQZHltsAQKF19qTZU",
  authDomain: "ts-quiz-528eb.firebaseapp.com",
  projectId: "ts-quiz-528eb",
  storageBucket: "ts-quiz-528eb.appspot.com",
  messagingSenderId: "588489235322",
  appId: "1:588489235322:web:a67d365f257ab4c595d4c3",
  measurementId: "G-6N8P700YDV"
};


// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth: Auth = getAuth(app);
const firestore: Firestore = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, firestore, provider, analytics, signInWithPopup, signOut, collection, addDoc, query, where, getDocs };
