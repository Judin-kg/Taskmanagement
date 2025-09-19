// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./CompanyListTable.css";
// import AddCompanyModalForm from "./AddCompanyModalForm";

// export default function CompanyListTable() {
//   const [companies, setCompanies] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const fetchCompanies = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/companies");
//       setCompanies(res.data);
//     } catch (err) {
//       console.error("Error fetching companies:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   return (
//     <div className="company-list-container">
//       <div className="company-list-header">
//         <h1>Company List</h1>
//         <button className="add-company-btn" onClick={() => setIsModalOpen(true)}>
//           + Add Company
//         </button>
//       </div>

//       <table className="company-table">
//         <thead>
//           <tr>
//             <th>Company Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {companies.length > 0 ? (
//             companies.map((c) => (
//               <tr key={c._id}>
//                 <td>{c.name}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="1" style={{ textAlign: "center" }}>
//                 No companies found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Add Company Modal */}
//       <AddCompanyModalForm
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onCreated={fetchCompanies}
//       />
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CompanyListTable.css";
import AddCompanyModalForm from "./AddCompanyModalForm";

export default function CompanyListTable() {
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/companies");
      setCompanies(res.data);
    } catch (err) {
      console.error("Error fetching companies:", err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Delete a company
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/companies/${id}`);
      fetchCompanies();
    } catch (err) {
      console.error("Error deleting company:", err);
    }
  };

  // Placeholder for edit action
  const handleEdit = (company) => {
    alert(`Edit feature coming soon for ${company.name}`);
  };

  return (
    <div className="company-list-container">
      <div className="company-list-header">
        <h1>Company List</h1>
        <button className="add-company-btn" onClick={() => setIsModalOpen(true)}>
          + Add Company
        </button>
      </div>

      <table className="company-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>
                  {/* <button
                    className="edit-btn"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button> */}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                No companies found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Company Modal */}
      <AddCompanyModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={fetchCompanies}
      />
    </div>
  );
}
