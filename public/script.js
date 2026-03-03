import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut } from './firebase-module.js';

// -------- Registration --------
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      alert("Registration successful! Please verify your email.");
      registerForm.reset();
      window.location.href = "index.html"; // Redirect to login
    } catch (error) {
      alert("Registration error: " + error.message);
    }
  });
}

// -------- Login --------
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (!userCredential.user.emailVerified) {
        alert("Please verify your email before logging in!");
        await signOut(auth);
        return;
      }

      // Successful login
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  });
}
