import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { host } from "../host";

const AdminUserTransactions = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchUserTransactions = async () => {
      try {
        const res = await fetch(`${host}/api/admin/user-transactions/${userId}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setTransactions(data.transactions);
        }
      } catch (err) {
        console.error("Error fetching user transactions:", err);
      }
    };

    fetchUserTransactions();
  }, [userId]);

  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-2">
          Transactions of User
        </h2>
        <p className="text-center text-gray-500 mb-6">
          User ID: <span className="font-medium text-black">{userId}</span>
        </p>

        {/* Back to Manage Users Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate("/admin/Viewtransactions")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition"
          >
            ← Back to Manage Users
          </button>
        </div>

        {transactions.length === 0 ? (
          <p className="text-center text-gray-500">No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse rounded-lg overflow-hidden">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Sender</th>
                  <th className="px-4 py-3 text-left">Receiver</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-gray-100 transition">
                    <td className="px-4 py-3">{tx.SenderName}</td>
                    <td className="px-4 py-3">{tx.CustomerName}</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">₹{tx.Amount}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(tx.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserTransactions;
