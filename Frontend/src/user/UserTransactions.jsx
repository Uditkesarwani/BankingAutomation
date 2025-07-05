import { Home } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useVeryfy from "../utils/Verfy";
import { host } from "../host";

function UserTransactions() {
  useVeryfy();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const ShowUserDetail = (item) => setSelectedCustomer(item);
  const closeModal = () => setSelectedCustomer(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${host}/api/transactions/getUserBalance`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (data.success) {
          setTransactions(data.transactions);
        } else {
          alert("Could not fetch transactions");
        }
      } catch (err) {
        console.error("Transaction Fetch Error:", err);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📋 Your Recent Transactions</h1>
        <p className="text-gray-600 mt-2">Here’s a history of your latest financial activity.</p>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full bg-white rounded-xl shadow-md border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white text-xs sm:text-sm">
              <th className="py-3 px-2">Sender</th>
              <th className="py-3 px-2">Receiver</th>
              <th className="py-3 px-2 hidden sm:table-cell">Email</th>
              <th className="py-3 px-2">Amount</th>
              <th className="py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((item, index) => (
                <tr key={index} className="text-center border-b hover:bg-indigo-50 text-xs sm:text-sm">
                  <td className="py-2 px-2">{item.SenderName || "N/A"}</td>
                  <td className="py-2 px-2">{item.CustomerName || "N/A"}</td>
                  <td className="py-2 px-2 hidden sm:table-cell">{item.Email || "N/A"}</td>
                  <td className="py-2 px-2 font-semibold text-green-600">₹{item.Amount}</td>
                  <td className="py-2 px-2">
                    <button
                      className="bg-indigo-500 text-white px-4 py-1 rounded-full hover:bg-indigo-700 transition"
                      onClick={() => ShowUserDetail(item)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-gray-500 text-sm">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md text-center relative animate-fadeIn">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4 border-b pb-2">
              🧾 Transaction Details
            </h2>
            <div className="text-gray-800 space-y-2 text-left">
              <p><strong>Sender:</strong> {selectedCustomer.SenderName}</p>
              <p><strong>Receiver:</strong> {selectedCustomer.CustomerName}</p>
              <p><strong>Email:</strong> {selectedCustomer.Email || "N/A"}</p>
              <p><strong>Amount:</strong> ₹{selectedCustomer.Amount}</p>
              <p><strong>Date:</strong> {new Date(selectedCustomer.date).toLocaleString()}</p>
            </div>
            <button
              className="mt-6 bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
          onClick={() => navigate("/")}
        >
          🏠 Back to Home
        </button>
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          onClick={() => navigate("/transfer")}
        >
          💸 Make a Transfer
        </button>
      </div>
    </div>
  );
}

export default UserTransactions;
