// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6ONwdflnjRjcWbNLxGKOFG_J4OhWKz7U",
  authDomain: "minihackathon-b.firebaseapp.com",
  projectId: "minihackathon-b",
  storageBucket: "minihackathon-b.firebasestorage.app",
  messagingSenderId: "418985326803",
  appId: "1:418985326803:web:b59fdab597b9913ac47c26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export {auth, db};