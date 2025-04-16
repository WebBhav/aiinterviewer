import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRocket } from "react-icons/fa";

const Setup = () => {
  const navigate = useNavigate();
  const [name] = useState("John Doe");
  const [role, setRole] = useState("Product Manager");

  const handleStart = () => {
    navigate("/interview-room", { state: { name, role } });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-green-100 to-white p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg transition-all duration-500">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">🎤 Mock Interview Setup</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">Your Name</label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              value={name}
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">Select Role</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Data Scientist</option>
              <option>Product Manager</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Business Manager</option>
            </select>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FaRocket /> Start Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setup;
