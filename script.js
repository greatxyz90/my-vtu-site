const auth = firebase.auth();

// Register user
document.getElementById("registerBtn").onclick = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    alert("Registered! Please check your email to verify your account.");
    await userCredential.user.sendEmailVerification();
  } catch (err) {
    alert(err.message);
  }
};

// Login user
document.getElementById("loginBtn").onclick = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    if (!userCredential.user.emailVerified) {
      alert("Please verify your email before logging in!");
      await auth.signOut();
      return;
    }
    window.location.href = "dashboard.html";
  } catch (err) {
    alert(err.message);
  }
};
