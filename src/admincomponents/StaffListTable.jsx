// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./StaffListTable.css";

// export default function StaffListTable() {
//   const [staff, setStaff] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // Fetch staff list
//   const fetchStaff = async () => {
//     try {
//       const res = await axios.get("https://task-managment-server-neon.vercel.app/api/auth");
//       setStaff(res.data);
//     } catch (err) {
//       console.error("Error fetching staff:", err);
//     }
//   };

//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   return (
//     // <div className="staff-list-container">
//     //   <div className="staff-list-header">
//     //     <h1>Staff List</h1>
//     //   </div>

//     //   <table className="staff-table">
//     //     <thead>
//     //       <tr>
//     //         <th>Name</th>
//     //         <th>Assistant Manager</th>
//     //         <th>Contact Number</th>
//     //         <th>Email</th>
//     //         <th>Role</th>
//     //       </tr>
//     //     </thead>
//     //     <tbody>
//     //       {staff.length > 0 ? (
//     //         staff.map((s) => (
//     //           <tr key={s._id}>
//     //             <td>{s.name}</td>
//     //             <td>{s.assistantManager ? s.assistantManager.name : "-"}</td>
//     //             <td>{s.contactNumber}</td>
//     //             <td>{s.email}</td>
//     //             <td>{s.role}</td>
//     //           </tr>
//     //         ))
//     //       ) : (
//     //         <tr>
//     //           <td colSpan="5" style={{ textAlign: "center" }}>
//     //             No staff found
//     //           </td>
//     //         </tr>
//     //       )}
//     //     </tbody>
//     //   </table>
//     // </div>
//      <div className="staff-list-container">
//       <div className="staff-list-header">
//         <h1>Staff List</h1>
//         <button className="add-staff-btn" onClick={() => setIsModalOpen(true)}>
//           + Add Staff
//         </button>
//       </div>

//       {/* Table wrapper for horizontal scroll */}
//       <div className="table-wrapper">
//         <table className="staff-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Assistant Manager</th>
//               <th>Contact Number</th>
//               <th>Email</th>
//               <th>Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {staff.length > 0 ? (
//               staff.map((s) => (
//                 <tr key={s._id}>
//                   <td>{s.name}</td>
//                   <td>{s.assistantManager ? s.assistantManager.name : "-"}</td>
//                   <td>{s.contactNumber || "-"}</td>
//                   <td>{s.email}</td>
//                   <td>{s.role}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" style={{ textAlign: "center" }}>
//                   No staff found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StaffListTable.css";
import AddStaffModal from "./AddStaffModal";

export default function StaffListTable() {
  const [staff, setStaff] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Fetch staff list
  const fetchStaff = async () => {
    try {
      const res = await axios.get("https://task-managment-server-neon.vercel.app/api/auth");
      setStaff(res.data);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

   // ✅ Filter staff based on name
   const filteredStaff = staff.filter((s) =>
    (s.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="staff-list-container">
      <div className="staff-list-header">
        <h1>Staff List</h1>
         {/* ✅ Search Input */}
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by staff..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
          + Add Staff
        </button>
      </div>

      {/* Table wrapper for horizontal scroll */}
      <div className="table-wrapper">
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
          {/* <tbody>
            {staff.length > 0 ? (
              staff.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.assistantManager ? s.assistantManager.name : "-"}</td>
                  <td>{s.contactNumber || "-"}</td>
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
          </tbody> */}
           <tbody>
            {filteredStaff.length > 0 ? (
              filteredStaff.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.assistantManager ? s.assistantManager.name : "-"}</td>
                  <td>{s.contactNumber || "-"}</td>
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

      {/* Add Staff Modal */}
      <AddStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={fetchStaff} // Refresh staff list after adding
      />
    </div>
  );
}
