import React from "react";
import EventCard from "../components/EventCard";
import "../styles/Home.css";

const Home = () => {

  const events = [
    {
      id: 1,
      title: "Open Day ESTIN",
      date: "2025-12-01",
      location: "ESTIN Campus",
      image: "/assets/images/event.png"
    },
    {
      id: 2,
      title: "Tech Workshop",
      date: "2025-12-05",
      location: "Room 101",
      image: "/assets/images/work.jpg"
    },
    {
      id: 3,
      title: "Hackathon 2025",
      date: "2025-12-20",
      location: "Innovation Lab",
      image: "/assets/images/gdsc.png"
    }
  ];

  return (
    <div className="home-container">
      <div className="header-section">
        <h1 className="home-title">Upcoming ESTIN Events</h1>
        <p className="home-subtitle">
          Discover, join and explore events happening on our campus.
        </p>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

    </div>
  );
};

export default Home;
