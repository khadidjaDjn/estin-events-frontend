import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <h2 className="admin-logo">Admin Panel</h2>

      <ul className="admin-nav-links">   {/* FIXED CLASS NAME */}
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/recent-events">Recent Events</Link></li>
        <li><Link to="/admin/events">All Events</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
