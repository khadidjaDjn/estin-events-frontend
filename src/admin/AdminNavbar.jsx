import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminNavbar.css";


const AdminNavbar = ({ club }) => {
  const clubName = club?.name || "Admin Panel";
  const clubLogo = club?.logoUrl || "/assets/logos/téléchargement.png"; //default logo

  return (
    <nav className="admin-navbar">
      <div className="admin-logo-container">
        <img src={clubLogo} alt={`${clubName} logo`} className="admin-logo-img" />

        <h2 className="admin-logo">{clubName}</h2>
      </div>

      <ul className="admin-nav-links">
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/recent-events">Recent Events</Link></li>
        <li><Link to="/admin/events">All Events</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
