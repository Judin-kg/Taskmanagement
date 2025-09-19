// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import "./AssistantManagerDashboard.css";

// export default function AsstManagerAssignList() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Get logged-in assistant manager and token
//   const assistantManager = JSON.parse(localStorage.getItem("assistantManager"));
//   const token = localStorage.getItem("assistantManagerToken");

//   useEffect(() => {
//     if (!assistantManager) return;

//     axios
//       .get(`http://localhost:3000/api/tasks/user/${assistantManager.id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // ✅ secure API call
//         },
//       })
//       .then((res) => {
//         setTasks(res.data.tasks || res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching assistant manager tasks:", err);
//       })
//       .finally(() => setLoading(false));
//   }, [assistantManager, token]);

//   if (!assistantManager) {
//     return <p className="no-login">Please login as an assistant manager first.</p>;
//   }

//   return (
//     <div className="assistant-dashboard">
//       <h2 className="dashboard-title">
//         Welcome, {assistantManager.name || assistantManager.email}
//       </h2>

//       {loading ? (
//         <p className="loading-text">Loading tasks...</p>
//       ) : tasks.length === 0 ? (
//         <p className="no-task-text">No tasks assigned to you.</p>
//       ) : (
//         <table className="task-table">
//           <thead>
//             <tr>
//               <th>Task Name</th>
//               <th>Description</th>
//               <th>Scheduled Time</th>
//               <th>Assigned By</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task) => (
//               <tr key={task._id}>
//                 <td>{task.taskName}</td>
//                 <td>{task.description}</td>
//                 <td>{new Date(task.scheduledTime).toLocaleString()}</td>
//                 {/* <td>{task.assignedBy?.name || "N/A"}</td> */}
//                 <td>{task.assignedBy}</td>
//                 <td>{task.status || "Pending"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AsstManagerAssignList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const assistantManager = JSON.parse(localStorage.getItem("assistantManager"));
  const token = localStorage.getItem("assistantManagerToken");

  useEffect(() => {
    if (!assistantManager) return;

    axios
      .get(`http://localhost:3000/api/tasks/user/${assistantManager.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTasks(res.data.tasks || res.data);
      })
      .catch((err) => console.error("Error fetching assistant manager tasks:", err))
      .finally(() => setLoading(false));
  }, [assistantManager, token]);

  // ✅ Handle Status Change
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/api/tasks/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Update state locally (instant UI update)
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  if (!assistantManager) {
    return <p className="no-login">Please login as an assistant manager first.</p>;
  }
  // ✅ Prepare data for Pie Chart
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
    <div className="assistant-dashboard">
      <h2 className="dashboard-title">
        Welcome, {assistantManager.name || assistantManager.email}
      </h2>

      {loading ? (
        <p className="loading-text">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="no-task-text">No tasks assigned to you.</p>
      ) : (
     <>
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

        <table className="task-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Scheduled Time</th>
              <th>Assigned By</th>
              <th>repeat</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.taskName}</td>
                <td>{task.description}</td>
                <td>{new Date(task.scheduledTime).toLocaleString()}</td>
                <td>{task.assignedBy}</td>
                <td>{task.repeat || "once"}</td>
                <td>
                  {/* ✅ Dropdown for status change */}
                  <select
                    value={task.status || "pending"}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      )}
    </div>
  );
}
