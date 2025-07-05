

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useVeryfy from "../utils/Verfy";
import { host } from "../host";

export default function Login({ setIsLogin, setIsForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function handleLogin(e) {
    // useVeryfy()
    e.preventDefault();

    try {
      const res = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ Redirect based on user role
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong, please try again.");
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
      </form>
      <div className="text-center text-sm mt-4">
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setIsForgotPassword(true)}
        >
          Forgot Password?
        </span>
      </div>
      <p className="text-center text-sm mt-4">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </span>
      </p>
    </>
  );
}
