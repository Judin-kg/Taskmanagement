import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StaffListTable.css";

export default function StaffListTable() {
  const [staff, setStaff] = useState([]);

  // Fetch staff list
  const fetchStaff = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth");
      setStaff(res.data);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <div className="staff-list-container">
      <div className="staff-list-header">
        <h1>Staff List</h1>
      </div>

      <table className="staff-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Assistant Manager</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {staff.length > 0 ? (
            staff.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.assistantManager ? s.assistantManager.name : "-"}</td>
                <td>{s.contactNumber}</td>
                <td>{s.email}</td>
                <td>{s.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No staff found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
