import React from "react";
import { Link } from "react-router-dom"; // <-- import Link
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img
          src="/assets/logos/eventlogo.png"
          alt="ESTIN Events Logo"
          className="nav-logo"
        />
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about-us">About Us</Link></li> {/* <-- updated */}
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>

      <button className="btn-primary">Create Event</button>
    </nav>
  );
};

export default Navbar;
