
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../host";

const ViewUserTransactions = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${host}/api/admin/MyUser`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        const onlyUsers = data.users.filter((u) => u.role === "user");
        setUsers(onlyUsers);
        setFilteredUsers(onlyUsers);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchEmail, users]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleUserTransactions = (userId) => {
    navigate(`/admin/user-transactions/${userId}`);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          User Transactions Dashboard
        </h1>

        {/* Search Input */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="w-full px-4 py-2 border border-blue-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Card Grid */}
        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((u, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 border border-gray-200 transition"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {u.name}
                </h2>
                <p className="text-gray-600 mb-4">{u.email}</p>
                <button
                  onClick={() => handleUserTransactions(u._id)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white w-full py-2 rounded-xl font-medium transition"
                >
                  View Transactions
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUserTransactions
