import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { host } from "../host";

const ManageAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${host}/api/admin/accounts`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      
      if (data.success) {
        setAccounts(data.accounts);
      }
    } catch (err) {
      console.error("Failed to fetch accounts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {

    
    if (!window.confirm("Are you sure you want to delete this account?")) return;

    try {
      const res = await fetch(`${host}/api/admin/delete-account/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      
      

      if (data.success) {
        alert("Account deleted successfully");
        setAccounts((prev) => prev.filter((acc) => acc._id !== id));
      } else {
        alert("Failed to delete account");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Manage Bank Accounts
        </h1>

        {loading ? (
          <p className="text-center">Loading accounts...</p>
        ) : accounts.length === 0 ? (
          <p className="text-center text-gray-500">No accounts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-md text-sm sm:text-base">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Account Number</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Balance</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((acc) => (
                  <tr key={acc._id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4">{acc.accountNo}</td>
                    <td className="py-3 px-4">{acc.email}</td>
                    <td className="py-3 px-4">₹{acc.balance}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(acc._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                      >
                        Delete
                      </button>
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

export default ManageAccount;
