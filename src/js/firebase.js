// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrzKmfIKMRArTRtYII_7w_udwzJ3AnIIQ",
  authDomain: "testnew1-676cb.firebaseapp.com",
  projectId: "testnew1-676cb",
  storageBucket: "testnew1-676cb.firebasestorage.app",
  messagingSenderId: "505875974342",
  appId: "1:505875974342:web:8ebe165a6f5062b153afc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app);// for auth

export {
  db,
  auth
}