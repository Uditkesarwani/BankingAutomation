


import { useNavigate } from "react-router-dom";
import useVeryfy from "../utils/Verfy";
import React, { useState, useEffect } from "react";
import {
  UserIcon,
  UserGroupIcon,
  EnvelopeIcon,
  CurrencyRupeeIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { host } from "../host";

const Transfer = () => {

  useVeryfy();
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState({
    SenderName: "",
    CustomerName: "",
    Email: "",
    Amount: "",
    Aadhaar: "",
  });

  const [balance, setBalance] = useState(0);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasAccount, setHasAccount] = useState(true); // new state
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${host}/api/transactions/getUser`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success && data.account) {
          setInputValue((prev) => ({
            ...prev,
            SenderName: data.account.name,
          }));
          setBalance(data.account.balance);
          setHasAccount(true);
        } else {
          setHasAccount(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setHasAccount(false);
      }
    };
    fetchUser();
  }, []);

  const formatAadhaar = (value) => {
    const raw = value.replace(/\D/g, "").slice(0, 12);
    const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
    return formatted;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Aadhaar") {
      const formatted = formatAadhaar(value);
      setInputValue((prev) => ({ ...prev, [name]: formatted }));

      const digitsOnly = formatted.replace(/\s/g, "");
      if (digitsOnly.length === 12) {
        setAadhaarVerified(true);
      } else {
        setAadhaarVerified(false);
      }
    } else {
      setInputValue({ ...inputValue, [name]: value });
    }
  };

  useEffect(() => {
    let filledFields = 0;
    if (inputValue.SenderName) filledFields++;
    if (inputValue.CustomerName) filledFields++;
    if (inputValue.Email) filledFields++;
    if (inputValue.Amount) filledFields++;
    if (aadhaarVerified) filledFields++;

    const totalFields = 5;
    const percentage = Math.floor((filledFields / totalFields) * 100);
    setProgress(percentage);
  }, [inputValue, aadhaarVerified]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!aadhaarVerified) {
      alert("Please enter a valid 12-digit Aadhaar number.");
      return;
    }
    const transferAmount = Number(amount);

    // ✨ Validation checks
    if (!transferAmount || transferAmount <= 0) {
      return alert("Please enter a valid amount");
    }

    if (balance - transferAmount < 500) {
      return alert("You must maintain a minimum balance of ₹500 after transfer");
    }


    const digitsOnlyAadhaar = inputValue.Aadhaar.replace(/\s/g, "");

    if (parseFloat(inputValue.Amount) > balance) {
      alert("Insufficient balance.");
      return;
    }

    const payload = {
      ...inputValue,
      Aadhaar: digitsOnlyAadhaar,
    };

    const res = await fetch(`${host}/api/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.success) {
      alert("Transaction successful!");
     navigate('/UserTransactions')
    } else {
      alert(data.message || "Transaction failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 flex justify-center items-center p-5">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-4xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-700 mb-2">💸 Transfer Money</h1>
          {hasAccount && (
            <p className="text-lg text-gray-600">
              Current Balance: <span className="text-green-900 font-semibold">₹{balance}</span>
            </p>
          )}
        </div>

        <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4 text-green-800 shadow-sm text-center">
          Welcome to <strong>UBank</strong> – Your trusted transfer platform 🌱
        </div>

        {hasAccount ? (
          <>
            {/* Dynamic Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <form onSubmit={handleSubmit} onChange={handleChange} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium text-gray-700">
                    <UserIcon className="w-5 h-5" /> Sender Name
                  </label>
                  <input
                    type="text"
                    name="SenderName"
                    value={inputValue.SenderName}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium text-gray-700">
                    <UserGroupIcon className="w-5 h-5" /> Beneficiary Name
                  </label>
                  <input
                    type="text"
                    name="CustomerName"
                    required
                    placeholder="Enter receiver's name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-400"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium text-gray-700">
                    <EnvelopeIcon className="w-5 h-5" /> Beneficiary Email
                  </label>
                  <input
                    type="email"
                    name="Email"
                    required
                    placeholder="Enter receiver's email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-400"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium text-gray-700">
                    <CurrencyRupeeIcon className="w-5 h-5" /> Amount
                  </label>
                  <input
                    type="number"
                    name="Amount"
                    required
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 mb-1 font-medium text-gray-700">
                    <IdentificationIcon className="w-5 h-5" /> Aadhaar Number
                  </label>
                  <input
                    type="text"
                    name="Aadhaar"
                    value={inputValue.Aadhaar}
                    placeholder="XXXX XXXX XXXX"
                    maxLength={14}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      aadhaarVerified ? "border-green-500" : "border-gray-300"
                    } focus:ring-green-400`}
                  />
                  {aadhaarVerified && (
                    <p className="text-green-600 mt-1 text-sm">✅ Aadhaar Verified</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!aadhaarVerified}
                className={`w-full py-3 mt-6 rounded-lg text-white font-semibold bg-green-600 transition duration-200 ${
                  !aadhaarVerified ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
                }`}
              >
                🚀 Send Money
              </button>
            </form>

            <div className="border-t border-dashed border-green-300 mt-10 mb-6"></div>

            <div className="text-center text-green-600 text-sm">
              Every transaction is 100% secured with Aadhaar verification ✅
            </div>
          </>
        ) : (
          <div className="max-w-md mx-auto mt-16 bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-200">
          <div className="text-4xl mb-4 text-yellow-500">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Bank Account Found</h2>
          <p className="text-gray-600 mb-6">
            You need to create a bank account to use the transfer service.
          </p>
          <a
            href="/AccountCreate"
            className="inline-block bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
          >
            ➕ Create Account
          </a>
        </div>
        
        )}

        <footer className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} UBank. Crafted with ❤️ by{" "}
          <span className="font-semibold text-green-700">Udit</span>
        </footer>
      </div>
    </div>
  );
};

export default Transfer;

