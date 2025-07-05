import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { host } from "../host";
const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) {
      setUser(storedUser);
    } else {
      // navigate("/auth"); // <-- Direct redirect if user not found
    }
  }, []);

  async function Logout() {
    if (!user) return;

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
  }

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/UserTransactions", name: "Transactions" },
    { path: "/transfer", name: "Transfer" },
    { path: "/services", name: "Services" },
    { path: "/contact", name: "Contact" },
    { path: "/AccountCreate", name: "Create Account" },
    { path: "/profile", name: "Profile" },
  ];

  return (
    <>
      <div className="bg-black text-white fixed top-0 left-0 w-full z-[1000] shadow-md">
        <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
          <h1 className="text-lg font-bold bg-white text-black px-3 py-1 rounded">
            UBank - Bank made smarter
          </h1>

          <div className="hidden lg:flex items-center gap-5">
            <ul className="flex gap-5 text-base font-medium">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`px-3 py-1 rounded transition ${
                      location.pathname === link.path
                        ? "bg-gray-800 text-white font-bold"
                        : "hover:text-gray-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {user && (
              <button
                onClick={Logout}
                className="bg-red-500 px-4 py-1 rounded text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>

          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="lg:hidden fixed top-16 right-0 w-64 h-full bg-black text-white p-6 space-y-4 shadow-lg z-[999] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block px-4 py-2 rounded ${
                    location.pathname === link.path
                      ? "bg-gray-800 text-white font-bold"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {user && (
              <li>
                <button
                  onClick={Logout}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="pt-15">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
