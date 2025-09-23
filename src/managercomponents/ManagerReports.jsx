import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManagerReports.css";
export default function ManagerReport() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
   const [searchName, setSearchName] = useState(""); // Task Name filter
  const [searchDate, setSearchDate] = useState(""); // Created Date filter
const manager = JSON.parse(localStorage.getItem("manager"));
  // const token = localStorage.getItem("managerToken");
  useEffect(() => {
    if (manager?.id) fetchManagerTasks();
  }, [manager]);

  const fetchManagerTasks = async () => {
    try {
      const res = await axios.get(`https://task-managment-server-neon.vercel.app/api/tasks/user/${manager.id}`);
      setTasks(res.data || []);
    } catch (err) {
      console.error("❌ Error fetching manager tasks:", err);
    } finally {
      setLoading(false);
    }
  };
console.log(tasks,"tasssssssssssssssssssssssss");


 // Filter tasks by name and created date
  const filteredTasks = tasks.filter((task) => {
    const matchesName = task.taskName
      ?.toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesDate = searchDate
      ? new Date(task.createdAt).toISOString().split("T")[0] === searchDate
      : true;
    return matchesName && matchesDate;
  });

  if (loading) return <p className="text-center mt-4">Loading tasks...</p>;

  return (
    // <div className="p-6">
    //   <h1 className="text-2xl font-bold text-center mb-6">📋 Manager Task Report</h1>

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
    //           {Array.isArray(tasks) &&
    //             tasks.map((task,index) =>
    //           (
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
      <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        📋 Manager Task Report
      </h1>

       {/* Filters */}
      <div className="filters mb-4 flex gap-4 justify-center">
        <input
          type="text"
          placeholder="Search by Task.."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="form-control w-50 mb-2"
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="form-control w-50"
        />
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500">
          No tasks found for this manager.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-gray-100">
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
            {/* <tbody>
              {Array.isArray(tasks) &&
                tasks.map((task, index) => (
                  <tr key={task._id} className="hover:bg-gray-50">
                    <td data-label="#" className="border px-4 py-2">
                      {index + 1}
                    </td>
                    <td data-label="Task Name" className="border px-4 py-2">
                      {task.taskName}
                    </td>
                    <td data-label="Description" className="border px-4 py-2">
                      {task.description}
                    </td>
                    <td data-label="Role" className="border px-4 py-2 capitalize">
                      {task.role}
                    </td>
                    <td data-label="Assigned To" className="border px-4 py-2">
                      {task.assignedTo?.name || "N/A"}
                    </td>
                    <td data-label="Assigned By" className="border px-4 py-2">
                      {task.assignedBy || "N/A"}
                    </td>
                    <td data-label="Repeat" className="border px-4 py-2">
                      {task.repeat}
                    </td>
                    <td
                      data-label="Status"
                      className={`border px-4 py-2 font-semibold ${
                        task.status === "completed"
                          ? "text-green-600"
                          : task.status === "pending"
                          ? "text-yellow-600"
                          : task.status === "in-progress"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {task.status}
                    </td>
                    <td data-label="Scheduled Time" className="border px-4 py-2">
                      {new Date(task.scheduledTime).toLocaleString()}
                    </td>
                    <td data-label="Created At" className="border px-4 py-2">
                      {new Date(task.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody> */}
              <tbody>
              {Array.isArray(filteredTasks) &&
                filteredTasks.map((task, index) => (
                  <tr key={task._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{task.taskName}</td>
                    <td className="border px-4 py-2">{task.description}</td>
                    <td className="border px-4 py-2 capitalize">{task.role}</td>
                    <td className="border px-4 py-2">{task.assignedTo?.name || "N/A"}</td>
                    <td className="border px-4 py-2">{task.assignedBy || "N/A"}</td>
                    <td className="border px-4 py-2">{task.repeat}</td>
                    <td
                      className={`border px-4 py-2 font-semibold ${
                        task.status === "completed"
                          ? "text-green-600"
                          : task.status === "pending"
                          ? "text-yellow-600"
                          : task.status === "in-progress"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {task.status}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(task.scheduledTime).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(task.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
