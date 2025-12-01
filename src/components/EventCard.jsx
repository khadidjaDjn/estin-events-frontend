import React from "react";
import { Link } from "react-router-dom";
import "../styles/EventCard.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-image">
        <img
          src={event.image || "/assets/images/event.png"}
          alt={event.title || "event image"}
        />
      </div>

      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-info">
          {event.date} • {event.location}
        </p>

        <Link to={`/event/${event.id}`}>
          <button className="btn-details">See Details</button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
