import React, { useEffect, useState, useContext } from "react";

import "./ManagerList.css";
import AddManagerModalForm from "./AddManagerModalForm"; // import modal
import axios from "axios";

export default function ManagerList() {

  const [managers, setManagers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // state for modal

  const fetchManagers = async () => {
    try {
      const res = await axios.get("https://task-managment-server-neon.vercel.app/api/managers");
      const managerOnly = res.data.filter((u) => u.role === "manager");
      setManagers(managerOnly);
    } catch (err) {
      console.error("Error fetching managers:", err);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  return (
    // <div className="manager-list-container">
    //   <div className="manager-list-header">
    //     <h1>Manager List</h1>
    //     <button
    //       className="add-manager-btn"
    //       onClick={() => setIsModalOpen(true)}
    //     >
    //       + Add Manager
    //     </button>
    //   </div>

      

    //   <table className="manager-table">
    //     <thead>
    //       <tr>
    //         <th>Name</th>
    //         <th>Contact Number</th>
    //         <th>Email</th>
    //         <th>Department</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {managers.length > 0 ? (
    //         managers.map((m) => (
    //           <tr key={m._id}>
    //             <td>{m.name}</td>
    //             <td>{m.contactNumber || "-"}</td>
    //             <td>{m.email}</td>
    //              <td>{m.departmentId ? m.departmentId.name : "-"}</td>
    //           </tr>
    //         ))
    //       ) : (
    //         <tr>
    //           <td colSpan="3" style={{ textAlign: "center" }}>
    //             No managers found
    //           </td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>

    //   {/* Modal Form */}
    //   <AddManagerModalForm
    //     isOpen={isModalOpen}
    //     onClose={() => setIsModalOpen(false)}
    //     onCreated={fetchManagers}
    //   />
    // </div>
    <div className="manager-list-container">
      {/* Header */}
      <div className="manager-list-header">
        <h1>Manager List</h1>
        <button
          className="add-manager-btn"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Manager
        </button>
      </div>

      {/* Table Wrapper for Scroll */}
      <div className="table-wrapper">
        <table className="manager-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {managers.length > 0 ? (
              managers.map((m) => (
                <tr key={m._id}>
                  <td>{m.name}</td>
                  <td>{m.contactNumber || "-"}</td>
                  <td>{m.email}</td>
                  <td>{m.departmentId ? m.departmentId.name : "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No managers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      <AddManagerModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={fetchManagers}
      />
    </div>
  );
}

