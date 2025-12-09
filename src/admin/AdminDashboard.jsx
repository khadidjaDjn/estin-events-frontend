import React from "react";
import AdminNavbar from "./AdminNavbar";
import "../styles/AdminDashboard.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  
  const stats = [
    { title: "Total Events", value: 156, change: "+12%" },
    { title: "Total Attendees", value: 3245, change: "+18%" },
    { title: "Active Events", value: 24, change: "8 this week" },
    { title: "Avg. Rating", value: 4.7, change: "+0.3" },
  ];

  const eventsCreatedData = [
    { month: "Jul", events: 0 },
    { month: "Aug", events: 7 },
    { month: "Sep", events: 14 },
    { month: "Oct", events: 21 },
    { month: "Nov", events: 28 },
    { month: "Dec", events: 20 },
  ];

  const totalAttendanceData = [
    { month: "Jul", attendees: 0 },
    { month: "Aug", attendees: 250 },
    { month: "Sep", attendees: 500 },
    { month: "Oct", attendees: 750 },
    { month: "Nov", attendees: 1000 },
    { month: "Dec", attendees: 900 },
  ];

  const eventsByCategory = [
    { category: "Technology", value: 35 },
    { category: "Workshop", value: 25 },
    { category: "Academic", value: 20 },
    { category: "Competition", value: 12 },
    { category: "Networking", value: 8 },
  ];

  const COLORS = ["#8b5cf6", "#6d28d9", "#4c1d95", "#a78bfa", "#c4b5fd"];

  return (
    <div className="admin-container">
      <AdminNavbar />

      <div className="admin-content">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">Statistics & Analytics</p>

        {/* Stats Section */}
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
              <span>{stat.change}</span>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Events Created (Last 6 Months)</h3>
            <LineChart width={350} height={200} data={eventsCreatedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="events" stroke="#8b5cf6" strokeWidth={3} />
            </LineChart>
          </div>

          <div className="chart-card">
            <h3>Total Attendance (Last 6 Months)</h3>
            <LineChart width={350} height={200} data={totalAttendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="attendees" stroke="#6d28d9" strokeWidth={3} />
            </LineChart>
          </div>

          <div className="chart-card">
            <h3>Events by Category</h3>
            <PieChart width={350} height={250}>
              <Pie data={eventsByCategory} cx="50%" cy="50%" outerRadius={70} dataKey="value"
                    label={({ name, value }) => `${value}`} // or remove if you don’t want inside labels
              >
              {eventsByCategory.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend formatter={(value, entry) => entry.payload.category} />
            </PieChart>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
