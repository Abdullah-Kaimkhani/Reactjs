// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoQ5FZHZPcxuQ01UzeWUxXds_5Mfp3XtA",
  authDomain: "lms-web-app-react.firebaseapp.com",
  projectId: "lms-web-app-react",
  storageBucket: "lms-web-app-react.firebasestorage.app",
  messagingSenderId: "403738366009",
  appId: "1:403738366009:web:2de215e28b6a28d91dbde8",
  measurementId: "G-YMTZ376YL4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
