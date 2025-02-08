// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBROFBr2qEmfGfCg_UGjxTXvRzfL6OsNKU",
  authDomain: "lms-jp.firebaseapp.com",
  projectId: "lms-jp",
  storageBucket: "lms-jp.firebasestorage.app",
  messagingSenderId: "161354139411",
  appId: "1:161354139411:web:c2146e3aa1bdc66aa5bce6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;