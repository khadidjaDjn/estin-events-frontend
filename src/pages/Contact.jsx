import React, { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        Have questions or suggestions? Reach out to the AI Student Club.
      </p>

      <div className="contact-container">
        {/* Contact Info */}
        <div className="contact-info">
          <h2>Our Info</h2>
          <p>Email: contact@aiclub.com</p>
          <p>Phone: +213 555 123 456</p>
          <p>Location: University of El Eulma, Auditorium A1</p>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
          </label>

          <button type="submit" className="btn-submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
