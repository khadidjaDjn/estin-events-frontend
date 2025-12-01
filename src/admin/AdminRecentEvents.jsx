import React from "react";
import AdminNavbar from "./AdminNavbar";
import "../styles/AdminRecent.css";

const AdminRecentEvents = () => {

  const recent = [
    { title: "AI Summit", activity: "Event Created", date: "Today" },
    { title: "Hackathon", activity: "150 Participants Registered", date: "Yesterday" },
    { title: "Robotics Expo", activity: "New Organizer Added", date: "3 days ago" },
  ];

  return (
    <div className="admin-container">
      <AdminNavbar />

      <div className="recent-container">
        <h1>Recent Activities</h1>

        <div className="recent-list">
          {recent.map((item, i) => (
            <div key={i} className="recent-card">
              <h3>{item.title}</h3>
              <p>{item.activity}</p>
              <span>{item.date}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminRecentEvents;
