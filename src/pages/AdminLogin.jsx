import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/api/admin-login/", {
        username,
        password,
      });

      if (res.data.message) {
        localStorage.setItem("isAdmin", "true");
        window.dispatchEvent(new Event("storage"));
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid username or password ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-teal-50 via-green-50 to-cyan-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md text-center border-2 border-teal-100"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-4xl">🔒</span>
        </div>
        
        <h2 className="text-3xl font-bold text-teal-700 mb-6">
          Admin Login
        </h2>
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border-2 border-teal-200 rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-2 border-teal-200 rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
          required
        />
        
        {error && <p className="text-red-500 mb-4 font-semibold">{error}</p>}
        
        <button
          type="submit"
          className="bg-gradient-to-r from-teal-600 to-green-700 text-white w-full py-3 rounded-lg hover:from-teal-700 hover:to-green-800 font-semibold transition-all shadow-lg hover:shadow-xl"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;