import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TaskListTable.css";
import TaskAssignFormModal from "./TaskAssignFormModal";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
function TaskListTable() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch tasks
  
  const fetchTasks = async () => {
    try {
      const res = await axios.get("https://task-managment-server-neon.vercel.app/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  console.log("Taskssssssssssssssss:", tasks);
  
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`https://task-managment-server-neon.vercel.app/api/tasks/${id}`);
      fetchTasks(); // refresh after delete
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task");
    }
  };
 // ✅ Calculate status counts for Pie Chart
  const statusCounts = tasks.reduce(
    (acc, task) => {
      acc[task.status || "pending"] += 1;
      return acc;
    },
    { pending: 0, "in-progress": 0, completed: 0 }
  );

  const pieData = [
    { name: "Pending", value: statusCounts.pending },
    { name: "In Progress", value: statusCounts["in-progress"] },
    { name: "Completed", value: statusCounts.completed },
  ];

  const COLORS = ["#facc15", "#3b82f6", "#22c55e"]; // yellow, blue, green

  return (
    // <div className="task-list-container">
    //       {/* ✅ Pie Chart Section */}
    //   <div className="task-status-chart" style={{ marginTop: "2rem" }}>
    //     <h3>Task Status Overview</h3>
    //     <ResponsiveContainer width="100%" height={300}>
    //       <PieChart>
    //         <Pie
    //           data={pieData}
    //           cx="50%"
    //           cy="50%"
    //           labelLine={false}
    //           outerRadius={120}
    //           dataKey="value"
    //           label={({ name, value }) => `${name}: ${value}`}
    //         >
    //           {pieData.map((entry, index) => (
    //             <Cell key={`cell-${index}`} fill={COLORS[index]} />
    //           ))}
    //         </Pie>
    //         <Tooltip />
    //         <Legend />
    //       </PieChart>
    //     </ResponsiveContainer>
    //   </div>
    //   <div className="task-list-header">
    //     <h1>Task List</h1>

        
    //     <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
    //       + Add Task
    //     </button>
    //   </div>

    //   <table className="task-table">
    //     <thead>
    //       <tr>
    //         <th>Task Name</th>
    //         <th>Description</th>
    //         <th>Scheduled Time</th>
    //         <th>Role</th>
    //         <th>Assigned To</th>
    //         <th>status</th>
    //         <th>repeat</th>
    //         <th>Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {tasks.length > 0 ? (
    //         tasks.map((t) => (
    //           <tr key={t._id}>
    //             <td>{t.taskName}</td>
    //             <td>{t.description || "—"}</td>
    //             <td>{new Date(t.scheduledTime).toLocaleString()}</td>
    //             <td>{t.role}</td>
    //             <td>{t.assignedTo ? t.assignedTo.name : "Myself"}</td>
    //             <td>{t.status}</td>
    //             <td>{t.repeat}</td>
    //             <td>
    //               <button className="edit-btn">Edit</button>
    //               <button
    //                 className="delete-btn"
    //                 onClick={() => handleDelete(t._id)}
    //               >
    //                 Delete
    //               </button>
    //             </td>
    //           </tr>
    //         ))
    //       ) : (
    //         <tr>
    //           <td colSpan="6" style={{ textAlign: "center" }}>
    //             No tasks found
    //           </td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>

    //   {/* Task Assign Modal */}
    //   <TaskAssignFormModal
    //     isOpen={isModalOpen}
    //     onClose={() => setIsModalOpen(false)}
    //     onCreated={fetchTasks}
    //   />
    // </div>
    <div className="task-list-container">
      {/* ✅ Pie Chart Section */}
      <div className="task-status-chart" style={{ marginTop: "2rem" }}>
        <h3>Task Status Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="task-list-header">
        <h1 className="dashboard-title">Task List</h1>
        <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
          + Add Task
        </button>
      </div>

      {/* ✅ Table Wrapper for Scroll on Mobile/Tablet */}
      <div className="table-wrapper">
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Scheduled Time</th>
              <th>Role</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Repeat</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((t) => (
                <tr key={t._id}>
                  <td>{t.taskName}</td>
                  <td>{t.description || "—"}</td>
                  <td>{new Date(t.scheduledTime).toLocaleString()}</td>
                  <td>{t.role}</td>
                  <td>{t.assignedTo ? t.assignedTo.name : "Myself"}</td>
                  <td>{t.status}</td>
                  <td>{t.repeat}</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(t._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Task Assign Modal */}
      <TaskAssignFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={fetchTasks}
      />
    </div>
 
    
  );
}
export default TaskListTable;

