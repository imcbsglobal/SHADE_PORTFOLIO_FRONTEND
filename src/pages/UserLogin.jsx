// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";

// const UserLogin = () => {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await axios.post("https://shade.imcbs.com/api/user-login/", {
//         phone,
//         password,
//       });

//       if (res.data.message) {
//         localStorage.setItem("isUser", "true");
//         localStorage.setItem("userData", JSON.stringify(res.data.user));
//         window.dispatchEvent(new Event("storage"));
//         navigate("/");
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || "Invalid credentials ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-100 to-pink-100">
//       <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
//         <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6 text-center">
//           User Login 👤
//         </h2>
        
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               placeholder="Enter your phone"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2"
//               >
//                 {showPassword ? (
//                   <EyeOff className="w-5 h-5 text-gray-500" />
//                 ) : (
//                   <Eye className="w-5 h-5 text-gray-500" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-gray-600">
//             Don't have an account?{" "}
//             <button
//               onClick={() => navigate("/user-register")}
//               className="text-purple-600 font-bold hover:underline"
//             >
//               Register here
//             </button>
//           </p>
//           <p className="text-gray-600 mt-2">
//             Admin?{" "}
//             <button
//               onClick={() => navigate("/admin-login")}
//               className="text-pink-600 font-bold hover:underline"
//             >
//               Login here
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;