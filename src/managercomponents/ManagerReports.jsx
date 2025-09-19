import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManagerReport() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
const manager = JSON.parse(localStorage.getItem("manager"));
  // const token = localStorage.getItem("managerToken");
  useEffect(() => {
    if (manager?.id) fetchManagerTasks();
  }, [manager]);

  const fetchManagerTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/tasks/user/${manager.id}`);
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
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">📋 Manager Task Report</h1>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found for this manager.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Task Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Assigned To</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Assigned By</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Repeat</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Scheduled Time</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(tasks) &&
                tasks.map((task,index) =>
              (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.taskName}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.description}</td>
                  <td className="border border-gray-300 px-4 py-2 capitalize">{task.role}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.assignedTo?.name || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.assignedBy || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{task.repeat}</td>
                  <td
                    className={`border border-gray-300 px-4 py-2 font-semibold ${
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
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(task.scheduledTime).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
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
