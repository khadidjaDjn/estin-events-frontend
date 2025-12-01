// src/pages/Register.jsx
import React, { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Registration successful!");
    setFormData({ fullName: "", email: "", phone: "" });
  };

  

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Event Registration</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </label>

          <label>
            Phone
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </label>

          <button type="submit" className="btn-submit">
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
