import React from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "../styles/AdminEventDetails.css";

const AdminEventDetails = () => {
  const { id } = useParams();

  const participants = ["Ali", "Meriem", "Yacine", "Sofiane"];
  const mentors = ["Dr. Karim", "Imene"];
  const organizers = ["Rania", "Amine", "Mohamed"];

  return (
    <div className="admin-container">
      <AdminNavbar />

      <div className="event-details-content">
        <h1>Event Details — ID: {id}</h1>

        <div className="details-section">
          <h2>Participants</h2>
          <ul>{participants.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>

        <div className="details-section">
          <h2>Mentors</h2>
          <ul>{mentors.map((m, i) => <li key={i}>{m}</li>)}</ul>
        </div>

        <div className="details-section">
          <h2>Organizers</h2>
          <ul>{organizers.map((o, i) => <li key={i}>{o}</li>)}</ul>
        </div>

      </div>
    </div>
  );
};

export default AdminEventDetails;
