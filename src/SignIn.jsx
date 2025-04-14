import React from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    navigate("/setup", {
      state: {
        name: "John Doe",
      }
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={handleGoogleSignIn}
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;