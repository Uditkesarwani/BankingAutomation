import { useEffect, useState } from "react";
import useVeryfy from "../utils/Verfy";
import { host } from "../host";

export default function AccountDashboard() {
  useVeryfy()
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await fetch(`${host}/api/account/me`, {
            method:'GET',
          credentials: "include", // include cookie/session if applicable
        });

        const data = await res.json();

        if (data.success) {
          setAccount(data.account);
        } else {
          setError(data.message || "Unable to fetch account details.");
        }
      } catch (err) {
        console.error("Failed to fetch account:", err);
        setError("Server error while fetching account.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl">Loading your account...</p>
      </div>
    );
  }

  if (error || !account) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-red-600">{error || "Account not found"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-left max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold text-indigo-700 text-center">👋 Welcome, {account.name}</h2>

        <div className="bg-gray-100 p-4 rounded-lg text-sm space-y-2">
          <p><strong>📧 Email:</strong> {account.email}</p>
          <p><strong>📱 Phone:</strong> {account.phone}</p>
          <p><strong>🏦 Account No:</strong> {account.accountNo}</p>
          <p><strong>💰 Balance:</strong> ₹{account.balance}</p>
          <p><strong>🗓️ Created At:</strong> {new Date(account.createdAt).toLocaleString()}</p>
        </div>

        <button
          onClick={() => alert("More features coming soon 😉")}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Explore Services
        </button>
      </div>
    </div>
  );
}
