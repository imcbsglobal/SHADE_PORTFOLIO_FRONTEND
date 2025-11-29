// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function UserRegister() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm_password, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const formData = {
//         name,
//         email,
//         phone,
//         password,
//         confirm_password,
//       };

//       // ✅ Correct API URL
//       const res = await axios.post(
//         "https://shade.imcbs.com/api/user-register/",
//         formData
//       );

//       console.log("Registration Success:", res.data);
//       navigate("/login");
//     } catch (err) {
//       console.error("❌ Registration error:", err);
//       alert("Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-12 p-6 shadow-lg rounded-lg border">

//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Create Your Account
//       </h2>

//       <form onSubmit={handleSubmit}>

//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full mb-3 p-3 border rounded"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-3 p-3 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Phone Number"
//           className="w-full mb-3 p-3 border rounded"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-3 p-3 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           className="w-full mb-3 p-3 border rounded"
//           value={confirm_password}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded mt-4"
//           disabled={loading}
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>

//       </form>
//     </div>
//   );
// }

// export default UserRegister;
