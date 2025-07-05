import { Link } from "react-router-dom";
import { MdLogout, MdMenu, MdClose } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../host";

const Sidebar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  async function Logout() {
  

    try {
      const res = await fetch(`${host}/api/admin/logout`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
   console.log(data);
   
      if (data.success) {
        localStorage.removeItem("user");
        navigate("/auth");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Something went wrong, please try again.");
    }
  }
  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between bg-blue-900 text-white p-4 shadow-md fixed top-0 left-0 w-full z-50">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={() => setIsOpen(true)} className="text-3xl">
          <MdMenu />
        </button>
      </div>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:block lg:min-h-screen p-6 pt-20 lg:pt-6`}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button onClick={() => setIsOpen(false)} className="text-3xl">
            <MdClose />
          </button>
        </div>

        {/* Desktop Title */}
        <h2 className="text-2xl font-bold mb-6 text-center hidden lg:block">
          Admin Panel
        </h2>

        <ul className="space-y-4">
          <li>
            <Link
              to="/admin"
              className="block p-3 bg-blue-800 rounded hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/view-Login"
              className="block p-3 bg-blue-800 rounded hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              View Login
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-account"
              className="block p-3 bg-blue-800 rounded hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Manage Account
            </Link>
          </li>
          <li>
            <Link
              to="/admin/Viewtransactions"
              className="block p-3 bg-blue-800 rounded hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link
              to="/admin/transactions"
              className="block p-3 bg-blue-800 rounded hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
             View All Transactions

            </Link>
          </li>
          <li>
            <Link
              to="/admin/messages"
              className="block p-3 bg-blue-800 rounded hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Messages
            </Link>
          </li>

        </ul>

        <button
          onClick={() => {
            setIsOpen(false);
            Logout();
          }}
          className="mt-10 bg-red-600 hover:bg-red-700 transition p-3 rounded w-full flex items-center justify-center gap-2"
        >
          <MdLogout /> Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
