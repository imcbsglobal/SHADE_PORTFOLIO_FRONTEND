import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/logo.png";

const VisitorPopup = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [loginData, setLoginData] = useState({ phone: "" });
  const [adminData, setAdminData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [mode, setMode] = useState("register"); // 'register', 'login', 'admin'

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    const isUser = sessionStorage.getItem("visitorId");

    if (isAdmin === "true" || isUser) {
      setShowPopup(false);
      return;
    }

    const lastLoginTime = sessionStorage.getItem("visitorLoginTime");

    if (!lastLoginTime) {
      setShowPopup(true);
    } else {
      const oneHour = 60 * 60 * 1000;
      const timePassed = Date.now() - parseInt(lastLoginTime, 10);
      if (timePassed > oneHour) {
        setShowPopup(true);
      }
    }
  }, []);

  // Visitor registration
  const handleVisitorSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.phone) {
      setError("Name and phone are required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://shade.imcbs.com/api/register",
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email || ""
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log("✅ Registration successful:", res.data);

      if (res.data.user) {
        // Store user info in session
        sessionStorage.setItem("visitorId", res.data.user.id);
        sessionStorage.setItem("visitorName", res.data.user.name);
        sessionStorage.setItem("visitorLoginTime", Date.now().toString());

        setSuccess("Registration successful! Welcome to Shade 🎉");

        // Close popup after 1 second
        setTimeout(() => {
          setShowPopup(false);
        }, 1000);

        // Reset form
        setFormData({ name: "", phone: "", email: "" });
      }
    } catch (err) {
      console.error("❌ Registration error:", err);
      console.error("Error details:", err.response?.data);

      const errorMessage = err.response?.data?.error || err.response?.data?.message;

      if (errorMessage) {
        setError(errorMessage);
      } else if (err.response?.status === 400) {
        setError("Invalid input. Please check your details.");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError("Error submitting form. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // User login
  const handleUserLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!loginData.phone) {
      setError("Please enter your phone number");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://shade.imcbs.com/user-login/",
        { phone: loginData.phone },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log("✅ Login successful:", res.data);

      if (res.data.user) {
        sessionStorage.setItem("visitorId", res.data.user.id);
        sessionStorage.setItem("visitorName", res.data.user.name);
        sessionStorage.setItem("visitorLoginTime", Date.now().toString());

        setSuccess(`Welcome back, ${res.data.user.name}! 👋`);

        setTimeout(() => {
          setShowPopup(false);
        }, 1000);

        setLoginData({ phone: "" });
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      const errorMessage = err.response?.data?.error || err.response?.data?.message;

      if (errorMessage) {
        setError(errorMessage);
      } else if (err.response?.status === 404) {
        setError("Phone number not found. Please register first.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Admin login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!adminData.username || !adminData.password) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://shade.imcbs.com/api/admin-login/",
        {
          username: adminData.username,
          password: adminData.password
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log("✅ Admin login successful:", res.data);

      if (res.data.message) {
        localStorage.setItem("isAdmin", "true");
        window.dispatchEvent(new Event("storage"));
        setSuccess("Admin login successful! Redirecting... 🚀");

        setTimeout(() => {
          setShowPopup(false);
          window.location.href = "/dashboard";
        }, 1000);
      }
    } catch (err) {
      console.error("❌ Admin login error:", err);
      const errorMessage = err.response?.data?.error || err.response?.data?.message;
      setError(errorMessage || "Invalid username or password ❌");
    } finally {
      setLoading(false);
    }
  };

  // Reset all states when switching modes
  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setSuccess("");
    setFormData({ name: "", phone: "", email: "" });
    setLoginData({ phone: "" });
    setAdminData({ username: "", password: "" });
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center border-2 border-teal-100">

        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-24 h-24 flex items-center justify-center mb-4 shadow-md rounded-full bg-white">
            <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
          </div>

          <h2 className="text-3xl font-extrabold text-teal-700">
            {mode === "admin" ? "Admin Login" : mode === "login" ? "User Login" : "Welcome to Shade"}
          </h2>

          {mode === "register" && (
            <p className="text-gray-600 text-sm italic mt-2">
              Enter your details to continue
            </p>
          )}
          {mode === "login" && (
            <p className="text-gray-600 text-sm italic mt-2">
              Login with your registered phone number
            </p>
          )}
        </div>

        {/* Registration Form */}
        {mode === "register" && (
          <>
            <form onSubmit={handleVisitorSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                required
                disabled={loading}
              />

              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                required
                disabled={loading}
              />

              <input
                type="email"
                placeholder="Email (optional)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                disabled={loading}
              />

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-teal-500 to-green-600 text-white w-full py-3 rounded-lg hover:from-teal-600 hover:to-green-700 transition-all font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Register"}
              </button>
            </form>

            {/* ONLY Admin link remains */}
            <div className="mt-4 text-sm text-gray-600">
              <p>
                Admin?{" "}
                <button
                  onClick={() => switchMode("admin")}
                  className="text-teal-600 font-semibold hover:underline"
                  disabled={loading}
                >
                  Login here
                </button>
              </p>
            </div>
          </>
        )}

        {/* User Login Form */}
        {mode === "login" && (
          <>
            <form onSubmit={handleUserLogin} className="space-y-4">
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={loginData.phone}
                onChange={(e) => setLoginData({ phone: e.target.value })}
                className="w-full p-3 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                required
                disabled={loading}
                autoFocus
              />

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-teal-500 to-green-600 text-white w-full py-3 rounded-lg hover:from-teal-600 hover:to-green-700 transition-all font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-4 text-sm text-gray-600 space-y-2">
              <p>
                New user?{" "}
                <button
                  onClick={() => switchMode("register")}
                  className="text-teal-600 font-semibold hover:underline"
                  disabled={loading}
                >
                  Register here
                </button>
              </p>
              <p>
                Admin?{" "}
                <button
                  onClick={() => switchMode("admin")}
                  className="text-teal-600 font-semibold hover:underline"
                  disabled={loading}
                >
                  Login here
                </button>
              </p>
            </div>
          </>
        )}

        {/* Admin Login Form */}
        {mode === "admin" && (
          <>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={adminData.username}
                onChange={(e) => setAdminData({ ...adminData, username: e.target.value })}
                className="w-full p-3 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                required
                disabled={loading}
                autoFocus
              />

              <input
                type="password"
                placeholder="Password"
                value={adminData.password}
                onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                className="w-full p-3 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                required
                disabled={loading}
              />

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-teal-500 to-green-600 text-white w-full py-3 rounded-lg hover:from-teal-600 hover:to-green-700 transition-all font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-sm text-gray-600 mt-4">
              Back to{" "}
              <button
                onClick={() => switchMode("register")}
                className="text-teal-600 font-semibold hover:underline"
                disabled={loading}
              >
                Visitor Form
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VisitorPopup;
