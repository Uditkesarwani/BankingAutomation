import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useVeryfy from "../utils/Verfy";
import { host } from "../host";

export default function Profile() {
  useVeryfy();
  const [user, setUser] = useState(null);
  const [totalTransferred, setTotalTransferred] = useState(0);
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  const createAccount = () => {
    navigate("/AccountCreate");
  };

  // Fetch account details
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await fetch(`${host}/api/account/user-account`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (data.success) {
          setAccount(data.account);
        } else {
          alert("Could not fetch account data");
        }
      } catch (err) {
        console.error("Fetch account error:", err);
      }
    };

    fetchAccount();
  }, []);

  // Fetch transaction summary
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${host}/api/auth/userTransactionMoney`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (data.success) {
          const total = data.transactions.reduce((acc, txn) => acc + txn.Amount, 0);
          setTotalTransferred(total);
        } else {
          alert("Could not fetch transactions");
        }
      } catch (err) {
        console.error("Transaction Fetch Error:", err);
      }
    };

    fetchTransactions();
  }, []);

  // Logout function
  const Logout = async () => {
    try {
      const res = await fetch(`${host}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/auth");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Something went wrong, please try again.");
    }
  };

  // 🔸 Account not found UI
  if (!account || !account.name) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white text-center p-6">
        <h2 className="text-3xl font-bold mb-2">No Account Found</h2>
        <p className="mb-6 text-lg text-gray-300">Please create an account to access your dashboard.</p>
        <button
          onClick={createAccount}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full shadow-lg transition"
        >
          Create Account 🚀
        </button>
      </div>
    );
  }

  // ✅ Account exists: Show Profile
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-2xl text-center w-full max-w-md transition-all duration-300 hover:scale-[1.03]">
        <div className="mb-4">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${account.name}`}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full shadow-md"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{account.name}</h2>
        <p className="text-gray-500 mb-4">{account.email}</p>

        <div className="bg-gray-100 p-5 rounded-xl text-left space-y-2 shadow-sm">
          <p className="text-lg font-medium text-gray-700">
            💰 <span className="font-semibold">Balance:</span> ₹{account.balance || 0}
          </p>
          <p className="text-lg font-medium text-gray-700">
            📤 <span className="font-semibold">Transferred Amount:</span> ₹{totalTransferred}
          </p>
          <p className="text-lg font-medium text-gray-700">
            🏦 <span className="font-semibold">Account No:</span> {account.accountNo || "N/A"}
          </p>
          <p className="text-lg font-medium text-gray-700">
            📞 <span className="font-semibold">Phone:</span> {account.phone || "Not Provided"}
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={createAccount}
            className="bg-green-600 text-white font-medium rounded-full px-6 py-2 shadow-md hover:bg-green-700 transition"
          >
            Update Info
          </button>
          <button
            onClick={Logout}
            className="bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
