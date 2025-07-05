// components/CreateAccountPrompt.jsx

import { useNavigate } from "react-router-dom";

export default function CreateAccountPrompt() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-100 to-red-300 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">🚫 No Bank Account Found</h2>
        <p className="text-gray-700 mb-6">
          You need to create a bank account before you can transfer money.
        </p>
        <button
          onClick={() => navigate("/AccountCreate")}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md shadow-md transition duration-300"
        >
          Create Account 🏦
        </button>
      </div>
    </div>
  );
}
