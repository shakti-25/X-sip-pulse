// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByxk1FaXo0SMhStTrfa_h6KigmqGrc5rw",
  authDomain: "x-sip-pulse.firebaseapp.com",
  projectId: "x-sip-pulse",
  storageBucket: "x-sip-pulse.firebasestorage.app",
  messagingSenderId: "12160074915",
  appId: "1:12160074915:web:223da68e4720cf90422b16",
  measurementId: "G-MHSWEQPB8P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);