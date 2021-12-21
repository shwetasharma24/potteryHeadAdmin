// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhYaBUkAGOzwZSH6II2HFGOF8OnRUulxg",
  authDomain: "potteryhead.firebaseapp.com",
  projectId: "potteryhead",
  storageBucket: "potteryhead.appspot.com",
  messagingSenderId: "259341801177",
  appId: "1:259341801177:web:298b92963d8bb7a2a090c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;