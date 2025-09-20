import React, { useEffect, useState, useContext } from "react";
// import api from "../api";
// import { AuthContext } from "../AuthContext";
import "./AssistantManagerList.css";
import AddAssistantManagerModalForm from "./AddAssistantManagerModalForm";
import axios from "axios";

 function AssistantManagerList() {
//   const { logout } = useContext(AuthContext);
  const [assistants, setAssistants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAssistants = async () => {
    try {
      const res = await axios.get("https://task-managment-server-neon.vercel.app/api/assistant-managers");
      setAssistants(res.data);
    } catch (err) {
      console.error("Error fetching assistant managers:", err);
    }
  };

  useEffect(() => {
    fetchAssistants();
  }, []);

  return (
    // <div className="assistant-manager-list-container">
    //   <div className="assistant-manager-list-header">
    //     <h1>Assistant Manager List</h1>
    //     <button
    //       className="add-assistant-btn"
    //       onClick={() => setIsModalOpen(true)}
    //     >
    //       + Add Assistant Manager
    //     </button>
    //   </div>

    //   {/* <button className="logout-btn" onClick={logout}>
    //     Logout
    //   </button> */}

    //   <table className="assistant-manager-table">
    //     <thead>
    //       <tr>
    //         <th>Name</th>
    //         <th>Under Manager</th>
    //         <th>Contact Number</th>
    //         <th>Role</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {assistants.length > 0 ? (
    //         assistants.map((am) => (
    //           <tr key={am._id}>
    //             <td>{am.name}</td>
    //             <td>{am.managerId ? am.managerId.name : "-"}</td>
    //             <td>{am.contactNumber || "-"}</td>
    //             <td>{am.role}</td>
    //           </tr>
    //         ))
    //       ) : (
    //         <tr>
    //           <td colSpan="4" style={{ textAlign: "center" }}>
    //             No Assistant Managers found
    //           </td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>

    //   {/* Add Assistant Manager Modal */}
    //   <AddAssistantManagerModalForm
    //     isOpen={isModalOpen}
    //     onClose={() => setIsModalOpen(false)}
    //     onCreated={fetchAssistants}
    //   />
    // </div>
     <div className="assistant-manager-list-container">
      <div className="assistant-manager-list-header">
        <h1>Assistant Manager List</h1>
        <button
          className="add-assistant-btn"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Assistant Manager
        </button>
      </div>

      {/* Table Wrapper for scroll */}
      <div className="table-wrapper">
        <table className="assistant-manager-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Under Manager</th>
              <th>Contact Number</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {assistants.length > 0 ? (
              assistants.map((am) => (
                <tr key={am._id}>
                  <td>{am.name}</td>
                  <td>{am.managerId ? am.managerId.name : "-"}</td>
                  <td>{am.contactNumber || "-"}</td>
                  <td>{am.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No Assistant Managers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Assistant Manager Modal */}
      <AddAssistantManagerModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={fetchAssistants}
      />
    </div>
  );
}

export default AssistantManagerList;