import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import { Mail, Phone, Users, Calendar, MapPin, Info } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const club = {
    name: "AI Student Club",
    banner:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop&auto=format",
    logo:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=300&fit=crop&auto=format",

    description:
      "The AI Student Club promotes innovation in artificial intelligence by organizing hands-on workshops, competitions, coding sessions, and community events. Its goal is to empower students to learn modern AI tools such as machine learning, deep learning, computer vision, NLP, and robotics.\n\nThe club also collaborates with other local and international communities, participates in hackathons, and helps students build strong portfolios through projects and teamwork.",

    founded: "2019",
    categories: ["AI", "Machine Learning", "Robotics", "Deep Learning"],

    contact: {
      email: "contact@aiclub.com",
      phone: "+213 555 123 456",
    },

    members: [
      { name: "Ahmed Benali", role: "President", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Sarah Mansouri", role: "Vice President", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "Karim Ferhat", role: "Media Manager", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Nour Rahali", role: "Logistics Manager", avatar: "https://i.pravatar.cc/150?img=4" },
    ],

    events: [
      {
        id: 1,
        title: "AI & Machine Learning Workshop",
        date: "2025-03-14",
        image:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&auto=format",
      },
      {
        id: 2,
        title: "Deep Learning Hackathon",
        date: "2025-02-05",
        image:
          "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=400&h=300&fit=crop&auto=format",
      },
      {
        id: 3,
        title: "Intro to AI – Open Session",
        date: "2024-10-10",
        image:
          "https://images.unsplash.com/photo-1581090464777-5cbf39c5be1e?w=400&h=300&fit=crop&auto=format",
      },
    ],
  };

  const today = new Date();

  const upcomingEvents = club.events.filter(
    (e) => new Date(e.date) >= today
  );

  const pastEvents = club.events.filter(
    (e) => new Date(e.date) < today
  );

  return (
    <div className="club-profile">
      {/* Banner */}
      <div className="club-banner">
        <img src={club.banner} className="club-banner-img" />
        <div className="club-banner-overlay"></div>

        <div className="club-profile-header">
          <img src={club.logo} className="club-logo" />
          <h1 className="club-title">{club.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="club-content">
        {/* Tabs */}
        <div className="tabs">
          {["overview", "members", "events", "contact"].map((tab) => (
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
              <div className="info-item"><Calendar size={18}/> Founded: {club.founded}</div>
              <div className="info-item"><Info size={18}/> Fields: {club.categories.join(", ")}</div>
            </div>
          </div>
        )}

        {/* MEMBERS */}
        {activeTab === "members" && (
          <div className="members-grid">
            {club.members.map((m, i) => (
              <div className="member-card" key={i}>
                <img src={m.avatar} className="member-avatar" />
                <div>
                  <p className="member-name">{m.name}</p>
                  <p className="member-role">{m.role}</p>
                </div>
              </div>
            ))}
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
                  key={ev.id}
                  onClick={() => navigate(`/event/${ev.id}`)}
                >
                  <img src={ev.image} className="club-event-img" />
                  <div className="club-event-info">
                    <p className="club-event-title">{ev.title}</p>
                    <p className="club-event-date"><Calendar size={16} /> {ev.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="section-title">Past Events</h2>
            <div className="events-grid-club">
              {pastEvents.map((ev) => (
                <div
                  className="club-event-card past"
                  key={ev.id}
                  onClick={() => navigate(`/event/${ev.id}`)}
                >
                  <img src={ev.image} className="club-event-img" />
                  <div className="club-event-info">
                    <p className="club-event-title">{ev.title}</p>
                    <p className="club-event-date"><Calendar size={16} /> {ev.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CONTACT */}
        {activeTab === "contact" && (
          <div className="contact-section">
            <div className="contact-item"><Mail /> <p>{club.contact.email}</p></div>
            <div className="contact-item"><Phone /> <p>{club.contact.phone}</p></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
