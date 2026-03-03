import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBH99sxcNphY_EoK4xPVmMFEV_2pWRCBiM", // ← your real API key
  authDomain: "glory90-85e7c.firebaseapp.com",
  projectId: "glory90-85e7c",
  storageBucket: "glory90-85e7c.appspot.com",
  messagingSenderId: "986038538950",
  appId: "1:986038538950:web:45b8d53376d0006bea7dc7",
  measurementId: "G-30QK61JX79"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
