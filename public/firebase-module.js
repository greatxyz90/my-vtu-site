// firebase-module.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, runTransaction } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBH99sxcNphY_EoK4xPVmMFEV_2pWRCBiM",
  authDomain: "glory90-85e7c.firebaseapp.com",
  projectId: "glory90-85e7c",
  storageBucket: "glory90-85e7c.appspot.com",
  messagingSenderId: "986038538950",
  appId: "1:986038538950:web:45b8d53376d0006bea7dc7",
  measurementId: "G-30QK61JX79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut, doc, getDoc, setDoc, updateDoc, runTransaction };
