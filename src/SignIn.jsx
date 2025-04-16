import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

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
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-white to-green-100">
      <div className="flex items-center justify-center h-full w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 flex flex-col items-center space-y-6 w-full max-w-md text-center">
          <h1 className="text-4xl font-bold text-gray-800">Welcome 👋</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Sign in with your Google account to begin your mock interview journey.
            <br />This is a fake sign in.
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 w-full bg-white border border-gray-300 hover:border-blue-500 text-gray-700 px-5 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            <FcGoogle size={24} />
            <span className="font-medium text-base">Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
