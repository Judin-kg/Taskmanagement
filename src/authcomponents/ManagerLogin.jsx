import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ManagerLogin.css"; // ✅ import CSS file

export default function ManagerLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://task-managment-server-al5a.vercel.app/api/managers/login", form);
      localStorage.setItem("managerToken", res.data.token);
      localStorage.setItem("manager", JSON.stringify(res.data.manager));
      navigate("/manager/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="manager-login-container">
      <div className="manager-login-card">
        <h2 className="manager-login-title">Manager Login</h2>

        {error && <p className="manager-login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="manager-login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="manager-login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}


// src/pages/Login.jsx
// import React, { useState } from "react";
// import axios from "axios";

// const ManagerLogin = ({ onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:3000/api/managers/login", {
//         email,
//         password,
//       });

//       if (res.data && res.data.user) {
//         const user = res.data.user;
//         localStorage.setItem("user", JSON.stringify(user));

//         // ✅ Fetch tasks for logged-in user
//         const taskRes = await axios.get(
//           `http://localhost:3000/api/tasks/user/${user._id}`
//         );
//  console.log("Tasks fetched for userrrrrrrrrrrrrrrrr:", taskRes.data);
 


//         localStorage.setItem("tasks", JSON.stringify(taskRes.data));

//         if (onLogin) onLogin(user, taskRes.data);
        
//       }
//       console.log("Login successfulllllllll:", res.data);
      
//     } catch (err) {
//       console.error("Login failed:", err);
//       alert("Invalid email or password");
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleLogin} className="login-form">
//         <h2>Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default ManagerLogin;
