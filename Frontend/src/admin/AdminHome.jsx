import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import {host} from '../host'
import {
  Users,
  CreditCard,
  Banknote,
  Repeat,
  ShieldCheck,
} from "lucide-react"; // install lucide-react if not yet

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${host}/api/admin/MyUser`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setUsers(data.users);
        }
      } catch (err) {
        console.error("User Fetch Error:", err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${host}/api/admin/transactions`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setTransactions(data.transactions);
          setTotalAmount(data.totalAmount);
        }
      } catch (err) {
        console.error("Transactions Fetch Error:", err);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch(`${host}/api/admin/accounts`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setAccounts(data.accounts);
        }
      } catch (err) {
        console.error("Accounts Fetch Error:", err);
      }
    };
    fetchAccounts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-10">
          Welcome, Admin
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <StatCard title="Total Users" value={users.length} icon={<Users />} gradient="from-blue-500 to-blue-700" />
          <StatCard title="Total Accounts" value={accounts.length} icon={<CreditCard />} gradient="from-green-500 to-green-700" />
          <StatCard title="Total Amount Transacted" value={`₹${totalAmount}`} icon={<Banknote />} gradient="from-red-500 to-red-700" />
          <StatCard title="Total Transactions" value={transactions.length} icon={<Repeat />} gradient="from-purple-500 to-purple-700" />
          <StatCard title="Admins" value={users.filter((u) => u.role === "admin").length} icon={<ShieldCheck />} gradient="from-yellow-400 to-yellow-600" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, gradient }) => {
  return (
    <div
      className={`bg-gradient-to-r ${gradient} text-white p-6 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">{title}</h2>
        <div className="p-2 bg-white rounded-full text-black">{icon}</div>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default AdminHome;
