import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import "../styles/Home.css";

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    // Fetch upcoming events
    axios.get("http://localhost:5000/api/events/upcoming")
      .then(res => setUpcomingEvents(res.data))
      .catch(err => console.error(err));

    // Fetch popular events
    axios.get("http://localhost:5000/api/events/popular")
      .then(res => setPopularEvents(res.data))
      .catch(err => console.error(err));

    // Fetch recent/done events (most recent)
    axios.get("http://localhost:5000/api/events/done")
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setRecentEvents(sorted.slice(0, 3));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home-container">
      {/* Upcoming Events */}
      <div className="header-section">
        <h1 className="home-title">Upcoming Events</h1>
        <p className="home-subtitle">
          Discover, join and explore events happening on our campus.
        </p>
      </div>
      <div className="events-grid">
        {upcomingEvents.map((event) => (
          <EventCard key={event.eventId} event={event} />
        ))}
      </div>

      {/* Most Rated Events */}
      <div className="header-section">
        <h2 className="home-title">Popular Events</h2>
      </div>
      <div className="events-grid">
        {popularEvents.map((event) => (
          <EventCard key={event.eventId} event={event} />
        ))}
      </div>

      {/* Most Recent Events */}
      <div className="header-section">
        <h2 className="home-title">New Events</h2>
      </div>
      <div className="events-grid">
        {recentEvents.map((event) => (
          <EventCard key={event.eventId} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Home;
