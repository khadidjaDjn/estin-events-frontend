import React from "react";
import "../styles/Profile.css";
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

const Profile = () => {
  // Stats
  const stats = [
    { title: "Total Events", value: 156, change: "+12%" },
    { title: "Total Attendees", value: 3245, change: "+18%" },
    { title: "Active Events", value: 24, change: "8 this week" },
    { title: "Avg. Rating", value: 4.7, change: "+0.3" },
  ];

  // Chart data
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

  // Recent events
  const recentEvents = [
    {
      title: "AI & Machine Learning Summit 2024",
      status: "Active",
      date: "Dec 15, 2024",
      attendees: 145,
      category: "Technology",
    },
    {
      title: "Career Development Workshop",
      status: "Active",
      date: "Dec 18, 2024",
      attendees: 87,
      category: "Workshop",
    },
    {
      title: "Research Symposium 2024",
      status: "Active",
      date: "Dec 20, 2024",
      attendees: 203,
      category: "Academic",
    },
    {
      title: "Startup Pitch Competition",
      status: "Draft",
      date: "Dec 22, 2024",
      attendees: 156,
      category: "Competition",
    },
  ];

  return (
    <div className="profile-page">
      <h1 className="profile-title">Admin Dashboard</h1>
      <p className="profile-subtitle">Manage events and view analytics</p>

      <button className="btn-create-event">Create Event</button>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card">
            <h3>{stat.value}</h3>
            <p>{stat.title}</p>
            <span className="stat-change">{stat.change}</span>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Events Created Line Chart */}
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

        {/* Total Attendance Line Chart */}
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

        {/* Events by Category Pie Chart */}
        <div className="chart-card">
          <h3>Events by Category</h3>
          <PieChart width={350} height={200}>
            <Pie
              data={eventsByCategory}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={70}
              fill="#8884d8"
              label
            >
              {eventsByCategory.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Recent Events Table */}
      <div className="recent-events">
        <h2>Recent Events</h2>
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Status</th>
              <th>Date</th>
              <th>Attendees</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {recentEvents.map((event, i) => (
              <tr key={i}>
                <td>{event.title}</td>
                <td>{event.status}</td>
                <td>{event.date}</td>
                <td>{event.attendees}</td>
                <td>{event.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
