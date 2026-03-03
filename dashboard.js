// dashboard.js

// === CONFIGURE BACKEND URL ===
// For Termux (local testing on phone)
const TERMUX_LOCAL = "http://10.0.2.2:3000";

// For LAN testing (replace with your phone's local IP)
// const LAN_IP = "http://192.168.1.100:3000";

const backendUrl = TERMUX_LOCAL; // <-- Use the correct one for your setup

// === FIREBASE AUTH ===
const auth = firebase.auth();

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    // Not logged in → redirect to login page
    window.location.href = "index.html";
    return;
  }

  // Load dashboard after login
  await loadDashboard(user);
});

async function loadDashboard(user) {
  const token = await user.getIdToken();

  // FETCH WALLET AND TRANSACTIONS
  try {
    const res = await fetch(`${backendUrl}/getWallet`, {
      headers: { Authorization: token }
    });

    if (!res.ok) throw new Error("Failed to fetch wallet");

    const data = await res.json();

    // Update wallet balance
    document.getElementById("walletBalance").textContent = data.balance;

    // Update transactions list
    const transactionList = document.getElementById("transactionList");
    transactionList.innerHTML = data.transactions
      .map(tx => `<li>${tx.date}: ${tx.type} ₦${tx.amount}</li>`)
      .join("");

  } catch (err) {
    console.error("Error loading dashboard:", err);
    alert("Error loading wallet. Make sure backend is running.");
  }

  // FUND WALLET BUTTON
  document.getElementById("fundWalletBtn").onclick = async () => {
    const amount = parseFloat(prompt("Enter amount to fund:"));
    if (!amount || amount <= 0) return alert("Invalid amount");

    try {
      const fundRes = await fetch(`${backendUrl}/fundWallet`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ amount })
      });

      if (!fundRes.ok) throw new Error("Failed to fund wallet");

      const fundData = await fundRes.json();

      // Update balance & transactions
      document.getElementById("walletBalance").textContent = fundData.balance;
      const transactionList = document.getElementById("transactionList");
      transactionList.innerHTML = fundData.transactions
        .map(tx => `<li>${tx.date}: ${tx.type} ₦${tx.amount}</li>`)
        .join("");

      alert("Wallet funded successfully!");
    } catch (err) {
      console.error("Error funding wallet:", err);
      alert("Error funding wallet. Make sure backend is running.");
    }
  };

  // LOGOUT BUTTON
  document.getElementById("logoutBtn").onclick = async () => {
    await auth.signOut();
    window.location.href = "index.html";
  };
}
