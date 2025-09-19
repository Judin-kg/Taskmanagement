import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StaffRegistrationForm.css";

function StaffRegistrationForm({ isOpen, onClose, onCreated }) {
  const [form, setForm] = useState({
    name: "",
    assistantManager: "",
    contactNumber: "",
    email: "",
    password: "",
  });

  const [assistantManagers, setAssistantManagers] = useState([]);

  // Fetch assistant managers for dropdown
  useEffect(() => {
    if (isOpen) {
      axios
        .get("http://localhost:3000/api/assistantmanagers")
        .then((res) => setAssistantManagers(res.data))
        .catch((err) =>
          console.error("Error fetching assistant managers:", err)
        );
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/staff", {
        ...form,
        role: "staff",
      });
      setForm({
        name: "",
        assistantManager: "",
        contactNumber: "",
        email: "",
        password: "",
      });
      if (onCreated) onCreated(); // refresh staff list
      onClose();
    } catch (err) {
      console.error("Error creating staff:", err);
      alert("Failed to register staff");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Register Staff</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <select
            name="assistantManager"
            value={form.assistantManager}
            onChange={handleChange}
            required
          >
            <option value="">Select Assistant Manager</option>
            {assistantManagers.map((am) => (
              <option key={am._id} value={am._id}>
                {am.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={form.contactNumber}
            onChange={handleChange}
            required
          />

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

          <div className="modal-actions">
            <button type="submit" className="save-btn">
              Register
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StaffRegistrationForm;
