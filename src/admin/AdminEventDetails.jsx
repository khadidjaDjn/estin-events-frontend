import React, { useState } from 'react';
import '../styles/AdminEventDetails.css';
import { Calendar, Clock, MapPin, Users, Star, ArrowLeft, Edit, Trash2, Download, Share2, Mail, Phone, Image as ImageIcon, MessageSquare, UserCheck, Menu, UserPlus } from 'lucide-react'; // <-- ADD UserCheck icon
import AdminNavbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom'; // <-- NEW IMPORT

const EventDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate(); // <-- Initialize useNavigate

  // Mock event data - replace with actual data from your backend
  const event = {
    id: 1,
    title: "AI Summit 2024",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
    date: "Dec 12, 2024",
    time: "09:00 AM - 05:00 PM",
    status: "done",
    category: "Technology",
    location: "Main Hall, Building A",
    attendees: 120,
    capacity: 150,
    description: "Join us for the most anticipated AI Summit of 2024! This full-day conference brings together industry leaders, researchers, and enthusiasts to explore the latest advancements in artificial intelligence. From machine learning breakthroughs to ethical AI discussions, this event covers it all.",
    highlights: [
      "Keynote speeches from AI industry leaders",
      "Hands-on workshops and demonstrations",
      "Networking opportunities with professionals",
      "Panel discussions on AI ethics and future trends"
    ],
    organizers: [
      { id: 1, name: "Dr. Karim Benzema", role: "Lead Organizer", email: "karim@estin.dz", phone: "+213 555 123 456", avatar: "KB" },
      { id: 2, name: "Sarah Mansouri", role: "Event Coordinator", email: "sarah@estin.dz", phone: "+213 555 234 567", avatar: "SM" },
      { id: 3, name: "Yacine Rahmouni", role: "Technical Lead", email: "yacine@estin.dz", phone: "+213 555 345 678", avatar: "YR" },
      { id: 4, name: "Amina Benali", role: "Marketing Manager", email: "amina@estin.dz", phone: "+213 555 456 789", avatar: "AB" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559223607-4a38e5e29d07?w=400&h=300&fit=crop"
    ],
    reviews: [
      { id: 1, name: "Ahmed Belkacem", rating: 5, comment: "Absolutely fantastic event! The speakers were incredibly knowledgeable and the workshops were hands-on and practical.", date: "Dec 13, 2024", avatar: "AB" },
      { id: 2, name: "Fatima Zohra", rating: 5, comment: "One of the best tech conferences I've attended. Great organization and networking opportunities.", date: "Dec 13, 2024", avatar: "FZ" },
      { id: 3, name: "Mehdi Hamdi", rating: 4, comment: "Very informative sessions. The only improvement would be to have more breakout sessions.", date: "Dec 14, 2024", avatar: "MH" },
      { id: 4, name: "Leila Mansour", rating: 5, comment: "Exceeded my expectations! The panel on AI ethics was particularly enlightening.", date: "Dec 14, 2024", avatar: "LM" }
    ],
    stats: {
      totalRegistrations: 150,
      attended: 120,
      feedbackSubmitted: 45,
      averageRating: 4.7
    },
    // NEW MOCK DATA FOR ATTENDEES
    attendeesList: [
      { id: 101, name: "Amine Cherif", email: "amine.c@mail.com", registrationDate: "2024-11-01" },
      { id: 102, name: "Nour El Houda", email: "nour.h@mail.com", registrationDate: "2024-11-05" },
      { id: 103, name: "Samir Bouzid", email: "samir.b@mail.com", registrationDate: "2024-11-08" },
      { id: 104, name: "Dalila Ouali", email: "dalila.o@mail.com", registrationDate: "2024-11-10" },
      { id: 105, name: "Bilal Khelifi", email: "bilal.k@mail.com", registrationDate: "2024-11-15" },
    ]
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'upcoming': return 'status-upcoming';
      case 'ongoing': return 'status-ongoing';
      case 'done': return 'status-done';
      default: return 'status-default';
    }
  };

  const statusClass = getStatusClass(event.status);
  const attendanceRate = ((event.attendees / event.capacity) * 100).toFixed(0);

  // Dynamic bar chart height for Attended (80% for Registered is constant)
  const attendedBarHeight = `${attendanceRate}%`;
  const feedbackBarHeight = `${(event.stats.feedbackSubmitted / event.stats.totalRegistrations) * 100}%`;
  const handleViewDemands = () => {
    console.log(event.id)
      navigate(`/admin/events/${event.id}/particDemands`);
  };
  const handleEditEvent = () => {
  navigate(`/admin/events/${event.id}/edit`, { state: { event } });
};


  return (
    <div className="event-details-page">
      <AdminNavbar />

      <div className="content-area">
        {/* Header with Cover Image */}
        <div className="cover-header">
          <img 
            src={event.coverImage} 
            alt={event.title}
            className="cover-image"
          />
          
          {/* Overlay Content */}
          <div className="cover-overlay">
            <button
              onClick={() => window.history.back()}
              className="back-button"
            >
              <ArrowLeft size={20} />
              Back to Events
            </button>

            <div className="header-info-bar">
              <div>
                <div className="tags-container">
                  <div className={`tag status-tag ${statusClass}`}>
                    {event.status}
                  </div>
                  <div className="tag category-tag">
                    {event.category}
                  </div>
                </div>
                <h1 className="event-title">
                  {event.title}
                </h1>
                <div className="event-meta">
                  <div className="meta-item">
                    <Calendar size={18} />
                    <span>{event.date}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={18} />
                    <span>{event.time}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={18} />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="header-actions">
                <button className="action-button secondary-action">
                  <Share2 size={18} />
                  Share
                </button>
                <button className="action-button primary-action" onClick={handleEditEvent}>
  <Edit size={18} />
  Edit Event
</button>

              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-value purple-text">
              {event.stats.totalRegistrations}
            </div>
            <div className="stat-label">Total Registrations</div>
          </div>
          <div className="stat-card">
            <div className="stat-value purple-text">
              {event.stats.attended}
            </div>
            <div className="stat-label">Attended</div>
          </div>
          <div className="stat-card">
            <div className="stat-value purple-text">
              {attendanceRate}%
            </div>
            <div className="stat-label">Attendance Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-value purple-text">
              {event.stats.averageRating}
              <Star size={20} className="star-icon" />
            </div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs-bar">
            {['overview', 'attendees', 'organizers', 'gallery', 'reviews'].map(tab => (
              <button // <-- ADDED 'attendees' TO THE MAP
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-button ${activeTab === tab ? 'active-tab' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="content-padding">
          {activeTab === 'overview' && (
            <div className="overview-grid">
              {/* Description */}
              <div>
                <div className="card description-card">
                  <h2 className="card-title">
                    About This Event
                  </h2>
                  <p className="description-text">
                    {event.description}
                  </p>
                  
                  <h3 className="highlight-title">
                    Event Highlights
                  </h3>
                  <ul className="highlight-list">
                    {event.highlights.map((highlight, index) => (
                      <li key={index} className="highlight-item">{highlight}</li>
                    ))}
                  </ul>
                </div>

                {/* Attendance Chart */}
                <div className="card attendance-chart-card">
                  <h3 className="chart-title">
                    Attendance Overview
                  </h3>
                  <div className="bar-chart-container">
                    {/* Registered Bar */}
                    <div className="bar-chart-column">
                      <div className="bar registered-bar" style={{ height: '80%' }}>
                        150
                      </div>
                      <div className="bar-label">
                        Registered
                      </div>
                    </div>
                    {/* Attended Bar */}
                    <div className="bar-chart-column">
                      <div className="bar attended-bar" style={{ height: attendedBarHeight }}>
                        120
                      </div>
                      <div className="bar-label">
                        Attended
                      </div>
                    </div>
                    {/* Feedback Bar */}
                    <div className="bar-chart-column">
                      <div className="bar feedback-bar" style={{ height: feedbackBarHeight }}>
                        45
                      </div>
                      <div className="bar-label">
                        Feedback
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                {/* Quick Actions */}
                <div className="card sidebar-card">
                  <h3 className="sidebar-title">
                    Quick Actions
                  </h3>
                  <div className="quick-actions-container">
                    <button className="action-button-sidebar primary-sidebar-action">
                      <Download size={18} />
                      Export Attendees
                    </button>
                    <button className="action-button-sidebar primary-sidebar-action"
                    onClick={handleViewDemands}>
                      <UserPlus size={18} />
                      Attending demands
                    </button>
                    <button className="action-button-sidebar delete-action">
                      <Trash2 size={18} />
                      Delete Event
                    </button>
                  </div>
                </div>

                {/* Event Details Card */}
                <div className="card sidebar-card">
                  <h3 className="sidebar-title">
                    Event Details
                  </h3>
                  <div className="detail-list">
                    <div className="detail-item">
                      <div className="detail-label">Capacity</div>
                      <div className="detail-value">{event.capacity} people</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Status</div>
                      <div className="detail-value capitalize-text">{event.status}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Duration</div>
                      <div className="detail-value">8 hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NEW ATTENDEES TAB CONTENT */}
          {activeTab === 'attendees' && (
            <div className="card full-width-card">
              <div className="attendees-header">
                <h2 className="section-title">
                  <UserCheck size={24} className="icon-margin-right" />
                  Confirmed Attendees ({event.attendeesList.length})
                </h2>
                <button className="action-button primary-action">
                    <Download size={18} />
                    Export List (CSV)
                </button>
              </div>

              <div className="attendees-table-container">
                <table className="attendees-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Registration Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.attendeesList.map(attendee => (
                      <tr key={attendee.id}>
                        <td>{attendee.id}</td>
                        <td className="attendee-name">{attendee.name}</td>
                        <td>{attendee.email}</td>
                        <td>{attendee.registrationDate}</td>
                        <td>
                          <button className="table-action-button email-action">
                            <Mail size={16} />
                          </button>
                          <button className="table-action-button delete-action">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'organizers' && (
            <div className="card full-width-card">
              <h2 className="section-title">
                Event Organizers
              </h2>
              <div className="organizers-grid">
                {event.organizers.map(organizer => (
                  <div key={organizer.id} className="organizer-card">
                    <div className="organizer-header">
                      <div className="organizer-avatar">
                        {organizer.avatar}
                      </div>
                      <div>
                        <h3 className="organizer-name">
                          {organizer.name}
                        </h3>
                        <p className="organizer-role">
                          {organizer.role}
                        </p>
                      </div>
                    </div>
                    <div className="organizer-contact">
                      <div className="contact-item">
                        <Mail size={16} />
                        <span>{organizer.email}</span>
                      </div>
                      <div className="contact-item">
                        <Phone size={16} />
                        <span>{organizer.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="card full-width-card">
              <div className="gallery-header">
                <h2 className="section-title">
                  Event Gallery
                </h2>
                <button className="add-photos-button">
                  <ImageIcon size={18} />
                  Add Photos
                </button>
              </div>
              <div className="gallery-grid">
                {event.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="gallery-image"
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="card full-width-card">
              <h2 className="section-title">
                Reviews
              </h2>
              <div className="reviews-list">
                {event.reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-avatar">
                      {review.avatar}
                    </div>
                    <div className="review-content">
                      <div className="review-header">
                        <h3 className="reviewer-name">{review.name}</h3>
                        <div className="review-rating">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} size={16} className="star-filled" />
                          ))}
                        </div>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default EventDetails;