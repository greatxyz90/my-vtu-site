import { auth, createUserWithEmailAndPassword, sendEmailVerification } from './firebase-module.js';

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Create new user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Send verification email
    await sendEmailVerification(userCredential.user);

    alert("Registration successful! Check your email to verify your account.");
    registerForm.reset();
    window.location.href = "index.html"; // Redirect to login
  } catch (error) {
    alert("Error: " + error.message);
  }
});
