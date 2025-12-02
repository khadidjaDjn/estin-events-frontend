import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <img
          src="/assets/logos/eventlogo.png"
          alt="ESTIN Events Logo"
          className="nav-logo"
        />
      </div>

      {/* CENTER */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        <li className="clubs-dropdown">
          Clubs ▾
          <ul className="dropdown-menu">
            <li><Link to="/profile?club=ic">IC Club</Link></li>
            <li><Link to="/profile?club=robotics">Robotics Club</Link></li>
            <li><Link to="/profile?club=gdsc">GDSC</Link></li>
          </ul>
        </li>

        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      {/* RIGHT */}
      <div className="nav-right">
        <Link to="/signup" className="btn-primary">Sign In</Link>
      </div>

    </nav>
  );
};

export default Navbar;
