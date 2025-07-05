import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useVeryfy from "../utils/Verfy";
import { host } from "../host";

export default function AccountCreated() {
  useVeryfy();
  const navigate = useNavigate();

  const [accountExists, setAccountExists] = useState(false);
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    initialDeposit: "",
    accountType: "Saving",
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const checkAccount = async () => {
      try {
        const res = await fetch(`${host}/api/account/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setAccountExists(true);
          setAccountData(data.account);
        }
      } catch (err) {
        console.error("Error checking account:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAccount();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${host}/api/account/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("🎉 Account Created Successfully!");
        setTimeout(() => {
          navigate("/AccountDashboard");
        }, 2000);
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Account creation failed:", err);
      setMessage("Server error. Try again later.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${host}/api/account/delete`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        alert("Account deleted successfully!");
        window.location.reload();
      } else {
        alert(data.message || "Failed to delete account.");
      }
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("Server error. Try again later.");
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || isNaN(depositAmount) || depositAmount <= 0) {
      alert("Please enter a valid amount to deposit.");
      return;
    }

    try {
      const res = await fetch(`${host}/api/account/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: parseFloat(depositAmount) }),
      });

      const data = await res.json();

      if (data.success) {
        setDepositAmount("");
        setMessage("💸 Deposit successful!");
        setTimeout(() => setMessage(null), 3000);
        window.location.reload();
      } else {
        alert(data.message || "Deposit failed.");
      }
    } catch (err) {
      console.error("Deposit error:", err);
      alert("Server error. Try again.");
    }
  };

  if (loading) return <p className="text-center text-lg font-semibold mt-10">🔍 Checking your account...</p>;

  if (accountExists && accountData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg space-y-6">
          <h2 className="text-3xl font-bold text-green-700 text-center">👋 Welcome, {accountData.name}</h2>
          <p className="text-center text-sm text-gray-500">Here's your account summary</p>

          <div className="bg-gray-100 p-4 rounded-xl shadow space-y-2 text-[15px] text-gray-700">
            <p><strong>📧 Email:</strong> {accountData.email}</p>
            <p><strong>📱 Phone:</strong> {accountData.phone}</p>
            <p><strong>🏦 Account No:</strong> {accountData.accountNo}</p>
            <p><strong>💼 Type:</strong> {accountData.accountType}</p>
            <p><strong>💰 Balance:</strong> ₹{accountData.balance}</p>
            <p><strong>🕒 Created:</strong> {new Date(accountData.createdAt).toLocaleString()}</p>
          </div>

          <div className="space-y-3">
            <input
              type="number"
              placeholder="💸 Enter deposit amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            <button
              onClick={handleDeposit}
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
            >
              Deposit Funds
            </button>
          </div>

          <button
            onClick={handleDelete}
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete Account
          </button>

          {message && (
            <div className="bg-green-100 text-green-700 text-center p-2 rounded-md shadow">
              {message}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500 px-6 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg space-y-5"
      >
        <h2 className="text-3xl font-bold text-green-700 text-center">🏦 Open Your Bank Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="number"
          name="initialDeposit"
          placeholder="Initial Deposit (₹)"
          value={formData.initialDeposit}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <select
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="Saving">Saving</option>
          <option value="Current">Current</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Account
        </button>

        {message && (
          <div className="bg-green-100 text-green-700 text-center p-2 rounded-md shadow">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
