import React from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "../styles/AdminEvents.css";

const AdminEvents = () => {
  
  const events = [
    { id: 1, title: "AI Summit", attendees: 120, date: "Dec 12, 2024", manager: "Dr. Karim" },
    { id: 2, title: "Robotics Expo", attendees: 85, date: "Dec 20, 2024", manager: "Sara" },
    { id: 3, title: "Hackathon", attendees: 200, date: "Jan 14, 2025", manager: "Yacine" },
  ];

  return (
    <div className="admin-container">
      <AdminNavbar />
      <div className="admin-events-content">
        <h1>All Events</h1>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Attendees</th>
              <th>Manager</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {events.map(e => (
              <tr key={e.id}>
                <td>{e.title}</td>
                <td>{e.date}</td>
                <td>{e.attendees}</td>
                <td>{e.manager}</td>
                <td>
                  <Link to={`/admin/events/${e.id}`} className="btn-view">View</Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminEvents;
