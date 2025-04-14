import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Setup = () => {
  const navigate = useNavigate();
  const [name] = useState("John Doe");
  const [role, setRole] = useState("Data Scientist");

  const handleStart = () => {
    navigate("/interview-room", { state: { name, role } });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <input className="border p-2 rounded" value={name} readOnly />
      <select className="border p-2 rounded" value={role} onChange={(e) => setRole(e.target.value)}>
        <option>Data Scientist</option>
        <option>Product Manager</option>
        <option>Frontend Developer</option>
      </select>
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleStart}>
        Start Interview
      </button>
    </div>
  );
};

export default Setup;