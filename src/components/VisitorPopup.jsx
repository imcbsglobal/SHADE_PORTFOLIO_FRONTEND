import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/logo.png";

const VisitorPopup = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [adminData, setAdminData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (isAdmin) {
      setShowPopup(false);
      return;
    }

    const lastLoginTime = sessionStorage.getItem("visitorLoginTime");
    if (!lastLoginTime) {
      setShowPopup(true);
    } else {
      const oneHour = 60 * 60 * 1000;
      const timePassed = Date.now() - parseInt(lastLoginTime, 10);
      if (timePassed > oneHour) setShowPopup(true);
    }
  }, []);

  // ✅ Visitor form submit
  const handleVisitorSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.phone) {
      setError("Name and phone are required");
      return;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ""))) {
      setError("Please enter a valid phone number (10-15 digits)");
      return;
    }

    setLoading(true);
    try {
      // ✅ LOCAL DEVELOPMENT URL
      const response = await axios.post("http://localhost:8000/api/visitors/", {
        name: formData.name.trim(),
        phone: formData.phone.trim().replace(/[\s\-\(\)]/g, ""),
        email: formData.email.trim() || "",
      });

      console.log("✅ Visitor registered:", response.data);
      
      sessionStorage.setItem("visitorLoginTime", Date.now().toString());
      setShowPopup(false);
      
      alert("✅ Welcome! Registration successful.\n📱 Admin has been notified via WhatsApp.");
    } catch (err) {
      console.error("❌ Visitor registration error:", err.response?.data || err.message);
      
      if (err.response?.data) {
        const errorData = err.response.data;
        if (errorData.phone) {
          setError(`Phone: ${errorData.phone[0]}`);
        } else if (errorData.email) {
          setError(`Email: ${errorData.email[0]}`);
        } else if (errorData.name) {
          setError(`Name: ${errorData.name[0]}`);
        } else {
          setError("Error submitting form. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Admin login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!adminData.username || !adminData.password) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    try {
      // ✅ LOCAL DEVELOPMENT URL
      const res = await axios.post("http://localhost:8000/api/admin-login/", {
        username: adminData.username.trim(),
        password: adminData.password,
      });

      if (res.data.message || res.data.token) {
        console.log("✅ Admin login successful:", res.data);
        localStorage.setItem("isAdmin", "true");
        window.dispatchEvent(new Event("storage"));
        setShowPopup(false);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("❌ Admin login error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Invalid username or password ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 text-center border-2 border-teal-100 relative">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-50 to-green-50 opacity-60"></div>
        <div className="relative z-10">
          {!isAdminLogin ? (
            <>
              {/* Visitor Form */}
              <div className="flex flex-col items-center mb-4">
                <img
                  src={logo}
                  alt="Shade Logo"
                  className="w-16 h-16 object-contain mb-2 drop-shadow-md"
                />
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-600">
                  Welcome 👋
                </h2>
                <p className="text-gray-600 text-sm italic mt-1">
                  Enter your details to continue
                </p>
              </div>

              <form onSubmit={handleVisitorSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border-2 border-teal-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  required
                  disabled={loading}
                />
                <input
                  type="tel"
                  placeholder="Phone (10-15 digits)"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full p-2 border-2 border-teal-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  required
                  disabled={loading}
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-2 border-2 border-teal-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  disabled={loading}
                />

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-teal-500 to-green-600 text-white w-full py-2 rounded-md hover:opacity-90 disabled:opacity-50 transition-all shadow-md font-semibold"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>

              <p className="text-sm text-gray-700 mt-4">
                Admin?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminLogin(true);
                    setError("");
                  }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-600 font-bold hover:underline"
                  disabled={loading}
                >
                  Login here
                </button>
              </p>
            </>
          ) : (
            <>
              {/* Admin Form */}
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-600 mb-4">
                Admin Login 🔒
              </h2>

              <form onSubmit={handleAdminLogin} className="space-y-3">
                <input
                  type="text"
                  placeholder="Username"
                  value={adminData.username}
                  onChange={(e) =>
                    setAdminData({ ...adminData, username: e.target.value })
                  }
                  className="w-full p-2 border-2 border-teal-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  required
                  disabled={loading}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={adminData.password}
                  onChange={(e) =>
                    setAdminData({ ...adminData, password: e.target.value })
                  }
                  className="w-full p-2 border-2 border-teal-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  required
                  disabled={loading}
                />

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-teal-500 to-green-600 text-white w-full py-2 rounded-md hover:opacity-90 disabled:opacity-50 transition-all shadow-md font-semibold"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <p className="text-sm text-gray-700 mt-4">
                Back to{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminLogin(false);
                    setError("");
                    setAdminData({ username: "", password: "" });
                  }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-600 font-bold hover:underline"
                  disabled={loading}
                >
                  Visitor Form
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorPopup;