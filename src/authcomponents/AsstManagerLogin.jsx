// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./ManagerLogin.css"; // ✅ import CSS file

// export default function AsstManagerLogin() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:3000/api/managers/login", form);
//       localStorage.setItem("managerToken", res.data.token);
//       localStorage.setItem("manager", JSON.stringify(res.data.manager));
//       navigate("/manager/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <div className="manager-login-container">
//       <div className="manager-login-card">
//         <h2 className="manager-login-title"> Asst Manager Login</h2>

//         {error && <p className="manager-login-error">{error}</p>}

//         <form onSubmit={handleSubmit} className="manager-login-form">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />

//           <button type="submit" className="manager-login-btn">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AssistantManagerLogin.css"; // ✅ import CSS file

export default function AsstManagerLogin() {
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
      const res = await axios.post("https://task-managment-server-al5a.vercel.app/api/assistant-managers/login", form);
      localStorage.setItem("assistantManagerToken", res.data.token);
      localStorage.setItem("assistantManager", JSON.stringify(res.data.assistantManager));
      navigate("/asstmanager/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="assistant-manager-login-container">
      <div className="assistant-manager-login-card">
        <h2>Assistant Manager Login</h2>

        {error && <p className="assistant-manager-login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="assistant-manager-login-form">
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

          <button type="submit" className="assistant-manager-login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
