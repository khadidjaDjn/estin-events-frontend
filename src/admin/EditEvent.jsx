import React, { useState } from "react";
import { ArrowLeft, UploadCloud } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import "../styles/EditEvent.css";

const EditEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event || {};

  const token = localStorage.getItem("authToken");
  const clubId = localStorage.getItem("clubId");

  const [form, setForm] = useState({
    title: event.title || "",
    date: event.date || "",
    time: event.time || "",
    location: event.location || "",
    category: event.category || "",
    capacity: event.capacity || 0,
    description: event.description || "",
    coverImage: event.coverImage || "https://plus.unsplash.com/premium_photo-1664304168263-f18dcc6fb94a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Use fixed image only for now
    setForm({ ...form, coverImage: "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !clubId) return alert("Missing auth or club info");
    console.log(event.eventId)
    try {
      await axios.post(
        `http://localhost:5000/api/admins/api/admin/events/${clubId}/${event.eventId}/edit`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Event updated!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Failed to update event");
    }
  };

  if (!location.state?.event) return <div style={{ padding: "2rem" }}>Event not found!</div>;

  return (
    <div className="edit-layout">
      <AdminNavbar />
      <div className="edit-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>

        <h1 className="edit-title">Edit Event</h1>

        <form className="edit-form" onSubmit={handleSubmit}>
          {/* Cover Image */}
          <div className="edit-section">
            <label className="edit-label">Cover Image</label>
            <div className="cover-upload">
              {form.coverImage && (
                <img src={form.coverImage} alt="Cover" className="cover-preview" />
              )}
              <label className="upload-btn">
                <UploadCloud size={20} />
                Change Image
                <input type="file" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          {/* Event Metadata */}
          <div className="edit-grid">
            {[
              { label: "Title", name: "title", type: "text" },
              { label: "Date", name: "date", type: "text" },
              { label: "Time", name: "time", type: "text" },
              { label: "Location", name: "location", type: "text" },
              { label: "Category", name: "category", type: "text" },
              { label: "Capacity", name: "capacity", type: "number" },
            ].map((field) => (
              <div key={field.name}>
                <label className="edit-label">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  className="edit-input"
                  value={form[field.name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="edit-section">
            <label className="edit-label">Description</label>
            <textarea
              name="description"
              className="edit-textarea"
              rows="6"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <button className="save-btn" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
