import React, { useState } from "react";
import "../styles/EventDetails.css";
import { useNavigate } from "react-router-dom";


import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Phone,
  Mail,
} from "lucide-react";

const EventDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();


  const event = {
    id: 1,
    title: "AI & Machine Learning Workshop 2024",
    description:
      "Join us for an immersive workshop covering the latest trends in Artificial Intelligence and Machine Learning. Ideal for beginners and intermediate learners.",
    banner:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop&auto=format",

    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop&auto=format",
    ],

    date: "March 14, 2025",
    time: "09:00 - 16:00",
    location: "University of El Eulma, Auditorium A1",

    club: {
      name: "AI Student Club",
      logo:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&auto=format",
    },

    organizers: [
      {
        id: 1,
        name: "Ahmed Benali",
        role: "Coordinator",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: 2,
        name: "Sarah Mansouri",
        role: "Logistics",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        id: 3,
        name: "Karim Ferhat",
        role: "Media",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
    ],

    contact: {
      email: "contact@aiclub.com",
      phone: "+213 555 123 456",
    },
  };

  return (
    <div className="event-details-page">
      {/* Banner */}
      <div className="banner-container">
        <img src={event.banner} alt={event.title} className="banner-img" />
        <div className="banner-overlay" />
        <h1 className="banner-title">{event.title}</h1>
      </div>

      {/* Content */}
      <div className="content-container">
        {/* Buttons */}
        <div className="top-buttons">
          <button onClick={() => navigate("/register")} className="btn-register">
              Register Now
          </button>

          <button onClick={() => setIsSaved(!isSaved)}>
            {isSaved ? (
              <BookmarkCheck className="icon-saved" />
            ) : (
              <Bookmark className="icon-unsaved" />
            )}
          </button>
        </div>

        <div className="main-grid">
          {/* LEFT SIDE */}
          <div>
            <p className="event-description">{event.description}</p>

            {/* Tabs */}
            <div className="tabs-container">
              <div className="tabs">
                {["overview", "gallery", "organizers", "contact"].map((tab) => (
                  <button
                    key={tab}
                    className={`tab-btn ${
                      activeTab === tab ? "active-tab" : ""
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* TAB CONTENT */}
              <div className="tab-content">
                {/* Overview */}
                {activeTab === "overview" && (
                  <div className="overview-grid">
                    <div className="overview-item">
                      <Calendar className="icon-brown" />
                      <p>{event.date}</p>
                    </div>

                    <div className="overview-item">
                      <Clock className="icon-brown" />
                      <p>{event.time}</p>
                    </div>

                    <div className="overview-item">
                      <MapPin className="icon-brown" />
                      <p>{event.location}</p>
                    </div>
                  </div>
                )}

                {/* Gallery */}
                {activeTab === "gallery" && (
                  <div className="gallery-grid">
                    {event.images.map((img, i) => (
                      <motion.img
                        key={i}
                        src={img}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="gallery-img"
                      />
                    ))}
                  </div>
                )}

                {/* Organizers */}
                {activeTab === "organizers" && (
                  <div className="organizers-grid">
                    {event.organizers.map((org) => (
                      <div key={org.id} className="organizer-card">
                        <img src={org.avatar} className="organizer-avatar" />
                        <div>
                          <p className="organizer-name">{org.name}</p>
                          <p className="organizer-role">{org.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Contact */}
                {activeTab === "contact" && (
                  <div className="contact-section">
                    <div className="contact-item">
                      <Mail className="icon-brown" />
                      <p>{event.contact.email}</p>
                    </div>

                    <div className="contact-item">
                      <Phone className="icon-brown" />
                      <p>{event.contact.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — SIDEBAR */}
          <div className="sidebar">
            <h3 className="sidebar-title">Club</h3>

            <div className="club-info">
              <img src={event.club.logo} className="club-logo" />
              <p className="club-name">{event.club.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
