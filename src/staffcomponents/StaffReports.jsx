import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StaffReports.css";
export default function StaffReports() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
const staff = JSON.parse(localStorage.getItem("user"));
  // const token = localStorage.getItem("managerToken");
  useEffect(() => {
    if (staff?.id) fetchManagerTasks();
  }, [staff]);

  const fetchManagerTasks = async () => {
    try {
      const res = await axios.get(`https://task-managment-server-neon.vercel.app/api/tasks/user/${staff.id}`);
      setTasks(res.data || []);
    } catch (err) {
      console.error("❌ Error fetching manager tasks:", err);
    } finally {
      setLoading(false);
    }
  };
console.log(tasks,"tasssssssssssssssssssssssss");

  if (loading) return <p className="text-center mt-4">Loading tasks...</p>;

  return (
    // <div className="p-6">
    //   <h1 className="text-2xl font-bold text-center mb-6">📋Staff Task Report</h1>

    //   {tasks.length === 0 ? (
    //     <p className="text-center text-gray-500">No tasks found for this manager.</p>
    //   ) : (
    //     <div className="overflow-x-auto">
    //       <table className="min-w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
    //         <thead className="bg-gray-100">
    //           <tr>
    //             <th className="border border-gray-300 px-4 py-2 text-left">#</th>
    //             <th className="border border-gray-300 px-4 py-2 text-left">Task Name</th>
    //             <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
    //             <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
    //             <th className="border border-gray-300 px-4 py-2 text-left">Assigned To</th>
    //             <th className="border border-gray-300 px-4 py-2 text-left">Assigned By</th>
    //             <th className="border border-gray-300 px-4 py-2 text-left">Repeat</th>
    //             <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
    //             <th className="border border-gray-300 px-4 py-2 text-left">Scheduled Time</th>
    //             <th className="border border-gray-300 px-4 py-2 text-left">Created At</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {tasks.map((task, index) => (
    //             <tr key={task._id} className="hover:bg-gray-50">
    //               <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
    //               <td className="border border-gray-300 px-4 py-2">{task.taskName}</td>
    //               <td className="border border-gray-300 px-4 py-2">{task.description}</td>
    //               <td className="border border-gray-300 px-4 py-2 capitalize">{task.role}</td>
    //               <td className="border border-gray-300 px-4 py-2">
    //                 {task.assignedTo?.name || "N/A"}
    //               </td>
    //               <td className="border border-gray-300 px-4 py-2">
    //                 {task.assignedBy || "N/A"}
    //               </td>
    //               <td className="border border-gray-300 px-4 py-2">{task.repeat}</td>
    //               <td
    //                 className={`border border-gray-300 px-4 py-2 font-semibold ${
    //                   task.status === "completed"
    //                     ? "text-green-600"
    //                     : task.status === "pending"
    //                     ? "text-yellow-600"
    //                     : task.status === "in-progress"
    //                     ? "text-blue-600"
    //                     : "text-gray-500"
    //                 }`}
    //               >
    //                 {task.status}
    //               </td>
    //               <td className="border border-gray-300 px-4 py-2">
    //                 {new Date(task.scheduledTime).toLocaleString()}
    //               </td>
    //               <td className="border border-gray-300 px-4 py-2">
    //                 {new Date(task.createdAt).toLocaleString()}
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   )}
    // </div>
      <div className="staff-reports-container">
      <h1 className="report-title">📋 Staff Task Report</h1>

      {tasks.length === 0 ? (
        <p className="no-tasks-text">No tasks found for this manager.</p>
      ) : (
        <div className="table-responsive">
          <table className="staff-report-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Role</th>
                <th>Assigned To</th>
                <th>Assigned By</th>
                <th>Repeat</th>
                <th>Status</th>
                <th>Scheduled Time</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task.taskName}</td>
                  <td>{task.description}</td>
                  <td>{task.role}</td>
                  <td>{task.assignedTo?.name || "N/A"}</td>
                  <td>{task.assignedBy || "N/A"}</td>
                  <td>{task.repeat}</td>
                  <td className={`status ${task.status}`}>{task.status}</td>
                  <td>{new Date(task.scheduledTime).toLocaleString()}</td>
                  <td>{new Date(task.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}