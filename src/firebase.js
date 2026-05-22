import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5DAjIckQwhKBmvZ4CHtd4oe5pUApDsIo",
  authDomain: "my-portfolio-b06a4.firebaseapp.com",
  projectId: "my-portfolio-b06a4",
  storageBucket: "my-portfolio-b06a4.firebasestorage.app",
  messagingSenderId: "1038617558333",
  appId: "1:1038617558333:web:f6c8d899b8dc6a3e229954",
  measurementId: "G-QF8QQ0ZFFV"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
