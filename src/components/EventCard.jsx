import React from "react";
import { Link } from "react-router-dom";
import "../styles/EventCard.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-image">
        <img
          src={event.coverImage || "/assets/images/event.png"} // <- backend field
          alt={event.title || "event image"}
        />
      </div>

      <div className="event-content">
        <h3 className="event-title">{event.name}</h3> {/* <- backend uses 'name' */}
        <p className="event-info">
          {new Date(event.startDate).toLocaleDateString()} • {event.location}
        </p>
        {event.clubName && (
          <p className="event-club">Club: {event.clubName}</p>
        )}

        <Link to={`/event/${event.eventId}`}> {/* <- use eventId for route */}
          <button className="btn-details">See Details</button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
