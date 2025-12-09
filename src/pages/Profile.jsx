import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Profile.css";
import { Mail, Phone, Users, Calendar, MapPin, Info } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [club, setClub] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract club id from query param
  const searchParams = new URLSearchParams(location.search);
  const clubId = searchParams.get("club");

  useEffect(() => {
    if (!clubId) return;

    // Fetch club profile from backend
    axios.get(`http://localhost:5000/api/clubs/${clubId}`)
      .then(res => setClub(res.data))
      .catch(err => console.error(err));
  }, [clubId]);

  if (!club) return <p>Loading...</p>;

  const today = new Date();
  const upcomingEvents = club.upcomingEvents || [];
  const pastEvents = club.pastEvents || [];

  return (
    <div className="club-profile">
      {/* Banner */}
      <div className="club-banner">
        <img src={club.bannerImage} className="club-banner-img" alt={club.name} />
        <div className="club-banner-overlay"></div>

        <div className="club-profile-header">
          <img src={club.avatar} className="club-logo" alt={club.name} />
          <h1 className="club-title">{club.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="club-content">
        {/* Tabs */}
        <div className="tabs">
          {["overview", "events", "contact"].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active-tab" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="overview-card">
            <h2 className="section-title">About the Club</h2>
            <p className="club-description">{club.description}</p>

            <div className="club-info-grid">
              <div className="info-item"><Calendar size={18}/> Founded: {new Date(club.foundationDate).getFullYear()}</div>
              {/* You can add categories if available */}
            </div>
          </div>
        )}


        {/* EVENTS */}
        {activeTab === "events" && (
          <>
            <h2 className="section-title">Upcoming Events</h2>
            <div className="events-grid-club">
              {upcomingEvents.map((ev) => (
                <div
                  className="club-event-card"
                  key={ev.eventId}
                  onClick={() => navigate(`/event/${ev.eventId}`)}
                >
                  <img src={ev.bannerImage} className="club-event-img" alt={ev.name} />
                  <div className="club-event-info">
                    <p className="club-event-title">{ev.name}</p>
                    <p className="club-event-date"><Calendar size={16} /> {new Date(ev.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="section-title">Past Events</h2>
            <div className="events-grid-club">
              {pastEvents.map((ev) => (
                <div
                  className="club-event-card past"
                  key={ev.eventId}
                  onClick={() => navigate(`/event/${ev.eventId}`)}
                >
                  <img src={ev.bannerImage} className="club-event-img" alt={ev.name} />
                  <div className="club-event-info">
                    <p className="club-event-title">{ev.name}</p>
                    <p className="club-event-date"><Calendar size={16} /> {new Date(ev.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CONTACT */}
        {activeTab === "contact" && (
          <div className="contact-section">
            {club.email && <div className="contact-item"><Mail /> <p>{club.email}</p></div>}
            {club.phone && <div className="contact-item"><Phone /> <p>{club.phone}</p></div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
