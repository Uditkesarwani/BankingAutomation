
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { Search } from "lucide-react"; // Icon for search input
import { host } from "../host";

const ViewLogin = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${host}/api/admin/MyUser`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
        setFilteredUsers(data.users);
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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        View Login
        </h1>

        {/* Search Input */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-3 px-6">{u.name}</td>
                    <td className="py-3 px-6">{u.email}</td>
                    <td className="py-3 px-6 capitalize">{u.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4 mt-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-xl p-4 space-y-2 border-l-4 border-blue-500"
              >
                <p>
                  <span className="font-semibold text-gray-700">Name:</span>{" "}
                  {u.name}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Email:</span>{" "}
                  {u.email}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Role:</span>{" "}
                  {u.role}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No users found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewLogin;
