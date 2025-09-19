import React, { useEffect, useState } from "react";
import axios from "axios";
import AddDepartmentModalForm from "./AddDepartmentModalForm";
import "./DepartmentListTable.css";

export default function DepartmentListTable() {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/departments");
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="department-list-container">
      <div className="department-list-header">
        <h1>Departments</h1>
        <button className="add-department-btn" onClick={() => setShowModal(true)}>
          + Add Department
        </button>
      </div>

      <table className="department-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.length > 0 ? (
            departments.map((dept) => (
              <tr key={dept._id}>
                <td>{dept.name}</td>
                <td>{dept.description || "-"}</td>
                <td>{new Date(dept.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={async () => {
                      await axios.delete(`http://localhost:3000/api/departments/${dept._id}`);
                      fetchDepartments();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No departments found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <AddDepartmentModalForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={fetchDepartments}
      />
    </div>
  );
}
