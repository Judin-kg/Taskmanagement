import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManagerTaskAssignModal.css";

function ManagerTaskAssignModal({ isOpen, onClose, onCreated }) {
  const [form, setForm] = useState({
    taskName: "",
    description: "",
    scheduledTime: "",
    role: "",
    assignedTo: "",
    assignedBy: "", // ✅ new field
    status: "pending", // ✅ new status field
    repeat: "once", // ✅ new repeat field
  });

  const [users, setUsers] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem("manager")); // <- Get logged-in user
    console.log("Logged-in userrrrrrrrrrrrrrr:", loggedUser.id);
     console.log(localStorage,"localStoragegegegegegege");
     
     
    useEffect(() => {
    if (loggedUser) {
      // ✅ set assignedBy automatically when modal opens
      setForm((prev) => ({ ...prev, assignedBy: loggedUser.id }));
    }
  }, [loggedUser]);

    
  useEffect(() => {
    if (form.role) {
       if (form.role === "myself" && loggedUser) {
        // Automatically set assignedTo to logged-in user's id
        setForm((prev) => ({ ...prev, assignedTo: loggedUser.id }));
        setUsers([]); // no dropdown
        return;
      }
      let endpoint = "";
      if (form.role === "manager") endpoint = "/api/managers";
      else if (form.role === "assistantmanager") endpoint = "/api/assistant-managers";
      else if (form.role === "staff") endpoint = "/api/auth";

      if (endpoint) {
        axios
          .get(`https://task-managment-server-neon.vercel.app${endpoint}`)
          .then((res) => setUsers(res.data))
          .catch((err) => console.error("Error fetching users:", err));
      } else {
        setUsers([]);
      }
    }
  }, [form.role]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://task-managment-server-neon.vercel.app/api/tasks", form);
      setForm({
        taskName: "",
        description: "",
        scheduledTime: "",
        role: "",
        assignedTo: "",
        assignedBy: loggedUser?.id || "", // reset with loggedUser id
        status: "pending", // reset status to default
        repeat: "once", // ✅ new repeat field
      });
      if (onCreated) onCreated();
      onClose();
    } catch (err) {
      console.error("Error assigning task:", err);
      alert("Failed to assign task");
    }
  };

  if (!isOpen) return null;
console.log("Form dataaaaaaaaaaaaaaa:", form);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Assign Task</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            name="taskName"
            placeholder="Task Name"
            value={form.taskName}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            type="datetime-local"
            name="scheduledTime"
            value={form.scheduledTime}
            onChange={handleChange}
            required
          />

          <select name="role" value={form.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="myself">Myself</option>
            {/* <option value="manager">Manager</option> */}
            <option value="assistantmanager">Assistant Manager</option>
            <option value="staff">Staff</option>
          </select>

          {/* Conditional dropdown based on role */}
          {form.role !== "" && form.role !== "myself" && (
            <select
              name="assignedTo"
              value={form.assignedTo}
              onChange={handleChange}
              required
            >
              <option value="">Select {form.role}</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>
          )}


          {/* ✅ Status Dropdown */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

           {/* ✅ Repeat Dropdown */}
        <select
            name="repeat"
            value={form.repeat}
            onChange={handleChange}
            required
          >
            <option value="once">Once</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>


          {/* ✅ Show assignedBy info (read-only) */}
          <input
            type="text"
            name="assignedBy"
            value={loggedUser?.role || ""}
            readOnly
            className="readonly-field"
            placeholder="Assigned By"
          />

          <div className="modal-actions">
            <button type="submit" className="save-btn">
              Assign Task
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

export default ManagerTaskAssignModal;