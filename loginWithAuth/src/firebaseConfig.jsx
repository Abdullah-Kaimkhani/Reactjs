// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8589uzGE4U0oaKAuF39Yrd7nUUYW54H4",
  authDomain: "loginwithreactauth.firebaseapp.com",
  projectId: "loginwithreactauth",
  storageBucket: "loginwithreactauth.firebasestorage.app",
  messagingSenderId: "666434514512",
  appId: "1:666434514512:web:06e682ddd62564a498eb55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;