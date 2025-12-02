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
      image: "/assets/images/event.png",
      club: { name: "ESTIN Student Club", logo: "/assets/images/club1.png" },
      rating: 4.8
    },
    {
      id: 2,
      title: "Tech Workshop",
      date: "2025-12-05",
      location: "Room 101",
      image: "/assets/images/work.jpg",
      club: { name: "AI & Robotics Club", logo: "/assets/images/club2.png" },
      rating: 4.5
    },
    {
      id: 3,
      title: "Hackathon 2025",
      date: "2025-12-20",
      location: "Innovation Lab",
      image: "/assets/images/gdsc.png",
      club: { name: "GDSC ESTIN", logo: "/assets/images/club3.png" },
      rating: 4.9
    },
    {
      id: 4,
      title: "Tech Workshop",
      date: "2025-12-05",
      location: "Room 101",
      image: "/assets/images/work.jpg",
      club: { name: "AI & Robotics Club", logo: "/assets/images/club2.png" },
      rating: 4.2
    },
    {
      id: 5,
      title: "Tech Workshop",
      date: "2025-12-05",
      location: "Room 101",
      image: "/assets/images/work.jpg",
      club: { name: "AI & Robotics Club", logo: "/assets/images/club2.png" },
      rating: 4.6
    },
  ];

  // Sort events by rating and date
  const mostRated = [...events].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const mostRecent = [...events].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

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
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Most Rated Events */}
      <div className="header-section">
        <h2 className="home-title">Popular Events</h2>
      </div>
      <div className="events-grid">
        {mostRated.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Most Recent Events */}
      <div className="header-section">
        <h2 className="home-title">New Events</h2>
      </div>
      <div className="events-grid">
        {mostRecent.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Home;
