// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdt4KWaVp7K1mQXwdJdQZfW07tECK6SFA",
  authDomain: "recipe-book-969d9.firebaseapp.com",
  projectId: "recipe-book-969d9",
  storageBucket: "recipe-book-969d9.firebasestorage.app",
  messagingSenderId: "303038841412",
  appId: "1:303038841412:web:a2bb792754fefa41693211",
  measurementId: "G-5J5HX37CQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

