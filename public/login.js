import { auth, signInWithEmailAndPassword, signOut } from './firebase-module.js';

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Check if email is verified
    if (!userCredential.user.emailVerified) {
      alert("Please verify your email before logging in!");
      await signOut(auth); // Sign out unverified user
      return;
    }

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});
