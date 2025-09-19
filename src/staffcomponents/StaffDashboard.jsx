// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./StaffDashboard.css"; // ✅ optional CSS for styling

// export default function StaffDashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Get logged-in staff from localStorage
//   const staff = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("userToken");

//   useEffect(() => {
//     if (!staff) return;

//     // ✅ Fetch tasks assigned to this staff member
//     axios
//       .get(`http://localhost:3000/api/tasks/user/${staff.id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         setTasks(res.data.tasks || res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching staff tasks:", err);
//       })
//       .finally(() => setLoading(false));
//   }, [staff, token]);

//   if (!staff) {
//     return <p className="no-login">Please login as staff first.</p>;
//   }

//   return (
//     <div className="staff-dashboard">
//       <h2 className="dashboard-title">Welcome, {staff.name}</h2>

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
//                 <td>{task.assignedBy|| "N/A"}</td>
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
import "./StaffDashboard.css";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function StaffDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Get logged-in staff from localStorage
  const staff = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (!staff) return;

    // ✅ Fetch tasks assigned to this staff member
    axios
      .get(`http://localhost:3000/api/tasks/user/${staff.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTasks(res.data.tasks || res.data);
      })
      .catch((err) => {
        console.error("Error fetching staff tasks:", err);
      })
      .finally(() => setLoading(false));
  }, [staff, token]);

  // ✅ Handle status change
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/api/tasks/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Optimistically update UI
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  // if (!staff) {
  //   return <p className="no-login">Please login as staff first.</p>;
  // }

  // ✅ Prepare data for Pie Chart
  const statusCounts = tasks.reduce(
    (acc, task) => {
      acc[task.status || "pending"]++;
      return acc;
    },
    { pending: 0, "in-progress": 0, completed: 0 }
  );

  const chartData = [
    { name: "Pending", value: statusCounts.pending },
    { name: "In Progress", value: statusCounts["in-progress"] },
    { name: "Completed", value: statusCounts.completed },
  ];

  const COLORS = ["#facc15", "#3b82f6", "#22c55e"]; // Yellow, Blue, Green

  if (!staff) return <p className="no-login">Please login as staff first.</p>;
  return (
    <div className="staff-dashboard">
      <h2 className="dashboard-title">Welcome, {staff.name}</h2>

      {loading ? (
        <p className="loading-text">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="no-task-text">No tasks assigned to you.</p>
      ) : (
<>
         {/* ✅ Pie Chart Section */}
          <div className="chart-container" style={{ width: "100%", height: 300, marginBottom: 20 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={120}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
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
                <td>{task.assignedBy || "N/A"}</td>
                <td>{task.repeat || "once"}</td>
                <td>
                  {/* ✅ Status Dropdown for staff */}
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
