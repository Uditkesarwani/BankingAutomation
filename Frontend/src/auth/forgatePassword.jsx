import { useState } from "react";

export default function ForgotPassword({ setIsForgotPassword }) {
  const [email, setEmail] = useState("");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }
    alert("If your email exists in our system, you will receive a password reset link.");
    setIsForgotPassword(false);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <input type="email" placeholder="Enter your email" className="w-full p-2 border rounded"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Send Reset Link</button>
      </form>
      <p className="text-center text-sm mt-4">
        <span className="text-blue-500 cursor-pointer" onClick={() => setIsForgotPassword(false)}>
          Back to Login
        </span>
      </p>
    </>
  );
}
