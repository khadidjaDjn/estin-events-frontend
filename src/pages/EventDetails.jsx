import React, { useState, useEffect } from "react";
import "../styles/EventDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Mail, Phone } from "lucide-react";
import axios from "axios";

const EventDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // eventId from URL

  useEffect(() => {
    // Fetch event details from backend
    axios.get(`http://localhost:5000/api/events/${id}`)
      .then(res => {
        setEvent(res.data);
        setReviews(res.data.reviews || []);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  const now = new Date();
  const eventEnded = new Date(event.endDate) < now;

  return (
    <div className="event-details-pagee">
      {/* Banner */}
      <div className="banner-container">
        <img src={event.bannerImage} alt={event.title} className="banner-img" />
        <div className="banner-overlay" />
        <h1 className="banner-title">{event.title}</h1>
      </div>

      <div className="content-container">
        <button
          onClick={() => navigate("/register")}
          className="btn-register"
        >
          Register Now
        </button>

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
                    className={`tab-btn ${activeTab === tab ? "active-tab" : ""}`}
                    onClick={() => setActiveTab(tab)}
                    disabled={tab === "gallery" && !eventEnded}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="tab-content">
                {/* Overview */}
                {activeTab === "overview" && (
                  <div className="overview-grid">
                    <div className="overview-item">
                      <Calendar className="icon-brown" />
                      <p>{new Date(event.startDate).toDateString()} - {new Date(event.endDate).toDateString()}</p>
                    </div>
                    <div className="overview-item">
                      <Clock className="icon-brown" />
                      <p>{event.startTime} - {event.endTime}</p>
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
                    {event.gallery?.map((img, i) => (
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
                    {event.organizers?.map((org, i) => (
                      <div key={i} className="organizer-card">
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
                    {event.club?.email && (
                      <div className="contact-item">
                        <Mail className="icon-brown" />
                        <p>{event.club.email}</p>
                      </div>
                    )}
                    {event.club?.phone && (
                      <div className="contact-item">
                        <Phone className="icon-brown" />
                        <p>{event.club.phone}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — SIDEBAR */}
          <div className="sidebar">
            <h3 className="sidebar-title">Club</h3>
            <div className="club-info">
              <img src={event.club?.logo} className="club-logo" />
              <div>
                <p className="club-name">{event.club?.name}</p>
                <p className="club-description">{event.club?.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <div className="reviews-header">
            <h3 className="reviews-title">Reviews</h3>
            <button
              className={`btn-add-review ${!eventEnded ? "disabled-btn" : ""}`}
              disabled={!eventEnded}
              onClick={() => navigate("/add-review")}
            >
              Add Review
            </button>
          </div>

          {reviews.length === 0 && <p>No reviews yet. Be the first to review!</p>}

          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-avatar">{review.name[0]}</div>
              <div>
                <p className="review-name">{review.name}</p>
                <p className="review-date">{review.date}</p>
                <p className="review-text">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
