import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AdminNavbar.css";

const AdminNavbar = ({ club }) => {
  const navigate = useNavigate();
  const clubName = club?.name || "Admin Panel";
  const clubLogo = club?.logoUrl || "/assets/logos/téléchargement.png"; // default logo

  const handleLogout = () => {
    // 1. Remove JWT and club info from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("clubName");
    localStorage.removeItem("clubAvatar");

    // 2. Redirect to login page
    navigate("/");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-logo-container">
        <img src={clubLogo} alt={`${clubName} logo`} className="admin-logo-img" />
        <h2 className="admin-logo">{clubName}</h2>
      </div>

      <ul className="admin-nav-links">
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/events">All Events</Link></li>
        <li><Link to="/admin/addEvent">Create Events</Link></li>
        <li>
          <button 
            onClick={handleLogout} 
            style={{ 
              background: "transparent", 
              border: "none", 
              color: "#fff", 
              cursor: "pointer", 
              padding: "0", 
              font: "inherit" 
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
