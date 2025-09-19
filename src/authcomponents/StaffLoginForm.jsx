import React, { useState } from "react";
import axios from "axios";
import "./StaffLoginForm.css";
import { Link } from "react-router-dom";

function StaffLoginForm({ onLoginSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/staff/login", form);

      // Store token or user info in localStorage
      localStorage.setItem("staffToken", res.data.token);
      localStorage.setItem("staffUser", JSON.stringify(res.data.user));

      setError("");
      if (onLoginSuccess) onLoginSuccess(res.data.user);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Staff Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <div className="mt-3 text-center">
        <span>Don't have an account? </span>
        <Link to="/signup">Sign Up</Link>
      </div>
      </div>
    </div>
  );
}

export default StaffLoginForm;
