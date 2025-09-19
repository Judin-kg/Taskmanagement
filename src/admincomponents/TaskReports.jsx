
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function TaskReports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#FFBB28", "#00C49F", "#FF8042", "#8884d8", "#0088FE"];

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tasks/reports");
      setReport(res.data);
    } catch (err) {
      console.error("❌ Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading reports...</p>;
  if (!report) return <p className="text-center mt-4 text-red-500">Failed to load reports</p>;

  // ✅ Convert objects to arrays for Recharts
  const statusData = Object.entries(report.statusCounts || {}).map(([key, value]) => ({
    name: key,
    value,
  }));

  const repeatData = Object.entries(report.repeatCounts || {}).map(([key, value]) => ({
    name: key,
    value,
  }));

  const topUserData = report.topUsers.map((user) => ({
    name: user.name,
    value: user.count,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">📊 Task Reports</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-blue-900">Total Tasks</h2>
          <p className="text-2xl font-bold">{report.totalTasks}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-yellow-900">Pending</h2>
          <p className="text-2xl font-bold">
            {report.statusCounts?.pending || 0}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-green-900">Completed</h2>
          <p className="text-2xl font-bold">
            {report.statusCounts?.completed || 0}
          </p>
        </div>
      </div>

      {/* Pie Chart - Task Status */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Task Status Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Repeat Types */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Tasks by Repeat Type</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={repeatData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Top Users */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Top Users by Task Count</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topUserData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

        {/* 📋 Table View */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Task Report Table</h2>
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Category</th>
              <th className="border p-2 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {/* Status Counts */}
            {statusData.map((s, i) => (
              <tr key={`status-${i}`}>
                <td className="border p-2 font-medium">{s.name || "Unknown"}</td>
                <td className="border p-2">{s.value}</td>
              </tr>
            ))}

            {/* Repeat Counts */}
            {repeatData.map((r, i) => (
              <tr key={`repeat-${i}`}>
                <td className="border p-2 font-medium">{r.name}</td>
                <td className="border p-2">{r.value}</td>
              </tr>
            ))}

            {/* Top Users
            {topUserData.map((u, i) => (
              <tr key={`user-${i}`}>
                <td className="border p-2 font-medium">User {u.name}</td>
                <td className="border p-2">{u.value}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

