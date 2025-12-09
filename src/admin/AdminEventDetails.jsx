import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminEventDetails.css';
import { Calendar, Clock, MapPin, Users, Star, ArrowLeft, Edit, Trash2, Download, Share2, Mail, UserCheck, UserPlus } from 'lucide-react';
import AdminNavbar from './AdminNavbar';
import { useNavigate, useParams } from 'react-router-dom';

const EventDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { eventId } = useParams();

  const token = localStorage.getItem('authToken');
  const clubId = localStorage.getItem('clubId');

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError(null);

      if (!token) {
        setError('Authorization token is missing. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/admins/api/admin/events/${clubId}/${eventId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEvent(res.data || {});
      } catch (err) {
        console.error(err);
        setError('Failed to fetch event data');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [clubId, eventId, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!event) return <div>No event data found.</div>;

  const getStatusClass = (status) => {
    switch (status) {
      case 'upcoming': return 'status-upcoming';
      case 'ongoing': return 'status-ongoing';
      case 'done': return 'status-done';
      default: return 'status-default';
    }
  };

  const statusClass = getStatusClass(event.status);
  const attendanceRate = event.stats?.totalRegistrations
    ? ((event.stats.attended / event.stats.totalRegistrations) * 100).toFixed(0)
    : 0;
  const attendedBarHeight = `${attendanceRate}%`;
  const feedbackBarHeight = event.stats?.totalRegistrations
    ? `${(event.stats.feedbackSubmitted / event.stats.totalRegistrations) * 100}%`
    : '0%';

  const handleViewDemands = () => {
    navigate(`/admin/events/${event.id}/particDemands`);
  };

  return (
    <div className="event-details-page">
      <AdminNavbar />

      <div className="content-area">
        {/* Header with Cover Image */}
        <div className="cover-header">
          <img src={event.coverImage} alt={event.title} className="cover-image" />
          <div className="cover-overlay">
            <button onClick={() => window.history.back()} className="back-button">
              <ArrowLeft size={20} /> Back to Events
            </button>
            <div className="header-info-bar">
              <div>
                <div className="tags-container">
                  <div className={`tag status-tag ${statusClass}`}>{event.status}</div>
                  <div className="tag category-tag">{event.category}</div>
                </div>
                <h1 className="event-title">{event.title}</h1>
                <div className="event-meta">
                  <div className="meta-item"><Calendar size={18} /><span>{event.date}</span></div>
                  <div className="meta-item"><Clock size={18} /><span>{event.time}</span></div>
                  <div className="meta-item"><MapPin size={18} /><span>{event.location}</span></div>
                </div>
              </div>
              <div className="header-actions">
                <button className="action-button secondary-action"><Share2 size={18} /> Share</button>
                <button className="action-button primary-action"><Edit size={18} /> Edit Event</button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-value purple-text">{event.stats?.totalRegistrations || 0}</div>
            <div className="stat-label">Total Registrations</div>
          </div>
          <div className="stat-card">
            <div className="stat-value purple-text">{event.stats?.attended || 0}</div>
            <div className="stat-label">Attended</div>
          </div>
          <div className="stat-card">
            <div className="stat-value purple-text">{attendanceRate}%</div>
            <div className="stat-label">Attendance Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-value purple-text">{event.stats?.averageRating || 0}<Star size={20} className="star-icon" /></div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs-bar">
            {['overview', 'attendees', 'organizers', 'gallery', 'reviews'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`tab-button ${activeTab === tab ? 'active-tab' : ''}`}>{tab}</button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="content-padding">
          {activeTab === 'overview' && (
            <div className="overview-grid">
              <div>
                <div className="card description-card">
                  <h2 className="card-title">About This Event</h2>
                  <p className="description-text">{event.description || 'No description available.'}</p>
                  <h3 className="highlight-title">Event Highlights</h3>
                  <ul className="highlight-list">
                    {(event.highlights || []).map((h, i) => <li key={i} className="highlight-item">{h}</li>)}
                  </ul>
                </div>

                <div className="card attendance-chart-card">
                  <h3 className="chart-title">Attendance Overview</h3>
                  <div className="bar-chart-container">
                    <div className="bar-chart-column">
                      <div className="bar registered-bar" style={{ height: '80%' }}>{event.stats?.totalRegistrations || 0}</div>
                      <div className="bar-label">Registered</div>
                    </div>
                    <div className="bar-chart-column">
                      <div className="bar attended-bar" style={{ height: attendedBarHeight }}>{event.stats?.attended || 0}</div>
                      <div className="bar-label">Attended</div>
                    </div>
                    <div className="bar-chart-column">
                      <div className="bar feedback-bar" style={{ height: feedbackBarHeight }}>{event.stats?.feedbackSubmitted || 0}</div>
                      <div className="bar-label">Feedback</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="card sidebar-card">
                  <h3 className="sidebar-title">Quick Actions</h3>
                  <div className="quick-actions-container">
                    <button className="action-button-sidebar primary-sidebar-action"><Download size={18} /> Export Attendees</button>
                    <button className="action-button-sidebar primary-sidebar-action" onClick={handleViewDemands}><UserPlus size={18} /> Attending demands</button>
                    <button className="action-button-sidebar delete-action"><Trash2 size={18} /> Delete Event</button>
                  </div>
                </div>

                <div className="card sidebar-card">
                  <h3 className="sidebar-title">Event Details</h3>
                  <div className="detail-list">
                    <div className="detail-item"><div className="detail-label">Capacity</div><div className="detail-value">{event.capacity || 0} people</div></div>
                    <div className="detail-item"><div className="detail-label">Status</div><div className="detail-value capitalize-text">{event.status || 'N/A'}</div></div>
                    <div className="detail-item"><div className="detail-label">Duration</div><div className="detail-value">8 hours</div></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attendees' && (
            <div className="card full-width-card">
              <div className="attendees-header">
                <h2 className="section-title"><UserCheck size={24} className="icon-margin-right" /> Confirmed Attendees ({(event.attendeesList || []).length})</h2>
                <button className="action-button primary-action"><Download size={18} /> Export List (CSV)</button>
              </div>
              <div className="attendees-table-container">
                <table className="attendees-table">
                  <thead>
                    <tr><th>ID</th><th>Name</th><th>Email</th><th>Registration Date</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {(event.attendeesList || []).map(a => (
                      <tr key={a.id}>
                        <td>{a.id}</td>
                        <td>{a.name}</td>
                        <td>{a.email}</td>
                        <td>{a.registrationDate}</td>
                        <td>
                          <button className="table-action-button email-action"><Mail size={16} /></button>
                          <button className="table-action-button delete-action"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TODO: organizers, gallery, reviews tabs */}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
