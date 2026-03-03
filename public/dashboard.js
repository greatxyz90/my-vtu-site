import { auth, db, signOut, sendEmailVerification, doc, getDoc, setDoc, updateDoc, runTransaction } from './firebase-module.js';

const status = document.getElementById("status");
const walletDisplay = document.getElementById("wallet-balance");

// Buttons
const fundWalletBtn = document.getElementById("fund-wallet");
const buyAirtimeBtn = document.getElementById("buy-airtime");
const buyDataBtn = document.getElementById("buy-data");
const sendMoneyBtn = document.getElementById("send-money");
const resendVerificationBtn = document.getElementById("resend-verification");
const logoutBtn = document.getElementById("logout");

// Get current user
auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  // Initialize wallet in Firestore if not exists
  const walletRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(walletRef);
  if (!docSnap.exists()) {
    await setDoc(walletRef, { balance: 0 });
  }

  // Display wallet balance
  const updateBalance = async () => {
    const docSnap = await getDoc(walletRef);
    walletDisplay.textContent = `Wallet Balance: ₦${docSnap.data().balance}`;
  };

  updateBalance();

  // Button actions
  fundWalletBtn.onclick = async () => {
    const amount = parseInt(prompt("Enter amount to fund wallet:"));
    if (isNaN(amount) || amount <= 0) return;
    await runTransaction(db, walletRef, (wallet) => {
      wallet.balance += amount;
      return wallet;
    });
    updateBalance();
    status.textContent = `Wallet funded with ₦${amount}`;
  };

  buyAirtimeBtn.onclick = async () => {
    const amount = parseInt(prompt("Enter airtime amount:"));
    if (isNaN(amount) || amount <= 0) return;
    await runTransaction(db, walletRef, (wallet) => {
      if (wallet.balance < amount) throw "Insufficient balance!";
      wallet.balance -= amount;
      return wallet;
    });
    updateBalance();
    status.textContent = `Airtime purchased: ₦${amount}`;
  };

  buyDataBtn.onclick = async () => {
    const amount = parseInt(prompt("Enter data amount:"));
    if (isNaN(amount) || amount <= 0) return;
    await runTransaction(db, walletRef, (wallet) => {
      if (wallet.balance < amount) throw "Insufficient balance!";
      wallet.balance -= amount;
      return wallet;
    });
    updateBalance();
    status.textContent = `Data purchased: ₦${amount}`;
  };

  sendMoneyBtn.onclick = async () => {
    const recipientEmail = prompt("Enter recipient email:");
    const amount = parseInt(prompt("Enter amount to send:"));
    if (!recipientEmail || isNaN(amount) || amount <= 0) return;

    // Find recipient UID
    const usersRef = doc(db, "users", recipientEmail); // Using email as ID requires mapping
    try {
      await runTransaction(db, walletRef, (wallet) => {
        if (wallet.balance < amount) throw "Insufficient balance!";
        wallet.balance -= amount;
        return wallet;
      });
      updateBalance();
      status.textContent = `Sent ₦${amount} to ${recipientEmail}`;
    } catch (err) {
      alert(err);
    }
  };

  resendVerificationBtn.onclick = async () => {
    try {
      await sendEmailVerification(user);
      alert("Verification email sent again!");
    } catch (err) {
      alert("Error sending verification: " + err.message);
    }
  };

  logoutBtn.onclick = async () => {
    await signOut(auth);
    window.location.href = "index.html";
  };
});
