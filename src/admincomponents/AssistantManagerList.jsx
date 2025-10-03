import React, { useEffect, useState, useContext } from "react";
// import api from "../api";
// import { AuthContext } from "../AuthContext";
import "./AssistantManagerList.css";
import AddAssistantManagerModalForm from "./AddAssistantManagerModalForm";
import axios from "axios";
import ResetAssistantManagerPassword from "./ResetAssistantManagerPassword";

 function AssistantManagerList() {
//   const { logout } = useContext(AuthContext);
  const [assistants, setAssistants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
 const [searchTerm, setSearchTerm] = useState(""); // ✅ Search term state
  
  const [selectedAssistantId, setSelectedAssistantId] = useState(null);

  const fetchAssistants = async () => {
    try {
      const res = await axios.get("https://task-manageratlas.vercel.app/api/assistant-managers");
      setAssistants(res.data);
    } catch (err) {
      console.error("Error fetching assistant managers:", err);
    }
  };

  useEffect(() => {
    fetchAssistants();
  }, []);

   // ✅ Filtered assistants based on search term
  const filteredAssistants = assistants.filter((am) =>
    am.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Delete Assistant Manager
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assistant manager?")) return;

    try {
      await axios.delete(
        `https://task-manageratlas.vercel.app/api/assistant-managers/${id}`
      );
      fetchAssistants(); // Refresh list
    } catch (err) {
      console.error("Error deleting assistant manager:", err);
      alert("Failed to delete assistant manager");
    }
  };
console.log(selectedAssistantId,"selectedAssistantIdddddddd");

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
         {/* ✅ Search Input */}
        <input
          type="text"
          placeholder="Search by name..."
          className="form-control w-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
              <th>Action</th> {/* ✅ New column */}
            </tr>
          </thead>
          {/* <tbody>
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
          </tbody> */}
           <tbody>
            {filteredAssistants.length > 0 ? (
              filteredAssistants.map((am) => (
                <tr key={am._id}>
                  <td>{am.name}</td>
                  <td>{am.managerId ? am.managerId.name : "-"}</td>
                  <td>{am.contactNumber || "-"}</td>
                  <td>{am.role}</td>
                  <td>
  <div className="action-buttons">
    {/* ✅ Reset Password Button */}
    <button
      className="reset-btn"
      onClick={() => setSelectedAssistantId(am._id)}
    >
      🔑 Reset Password
    </button>
    <button
      className="delete-btn"
      onClick={() => handleDelete(am._id)}
    >
      🗑 Delete
    </button>
  </div>
</td>

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

        {selectedAssistantId && (
        <ResetAssistantManagerPassword
          assistantId={selectedAssistantId}
          onClose={() => setSelectedAssistantId(null)}
          onPasswordReset={fetchAssistants}
        />
      )}
    </div>
  );
}

export default AssistantManagerList;