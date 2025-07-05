

import { useState } from "react";
import ForgotPassword from "./forgatePassword";
import SignUp from "./signUp";
import Login from "./login";

export default function AuthPage({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 shadow-lg rounded-lg bg-white">
        {isForgotPassword ? (
          <ForgotPassword setIsForgotPassword={setIsForgotPassword} />
        ) : isLogin ? (
          <Login setUser={setUser} setIsLogin={setIsLogin} setIsForgotPassword={setIsForgotPassword} />
        ) : (
          <SignUp setUser={setUser} setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
}

