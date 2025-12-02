import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Navbar.css";

const Navbar = ({ openLogin }) => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/clubs")
      .then(res => setClubs(res.data))
      .catch(err => console.error(err));
  }, []);

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
            {clubs.map(club => (
              <li key={club._id}>
                <Link to={`/profile?club=${club._id}`}>{club.name}</Link>
              </li>
            ))}
          </ul>
        </li>

        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      {/* RIGHT */}
      <div className="nav-right">
        <button className="btn-primary" onClick={openLogin}>Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
