import React, { useEffect, useState } from 'react';
import { Calendar, Users, TrendingUp, Clock, Search, Filter, MapPin, AlertTriangle, Loader } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

import AdminNavbar from './AdminNavbar';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // --- Helper Functions for Data Formatting ---
  
  // Function to format ISO Date to a readable string (e.g., Nov 10, 2023)
  const formatDate = (isoDate) => {
    if (!isoDate) return 'N/A';
    return new Date(isoDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Function to format ISO Date to time (e.g., 12:00 AM)
  const formatTime = (isoDate) => {
    if (!isoDate) return 'N/A';
    return new Date(isoDate).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  
  // --- Data Fetching Logic (Unchanged from previous correction) ---
  
  useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);
            
            // 1. Retrieve the token from localStorage
            const token = localStorage.getItem('authToken'); // Assuming 'authToken' is the key
            const clubId = localStorage.getItem("clubId");

            // 2. Check if the token exists before attempting to fetch
            if (!token) {
                setError("Authorization token is missing. Please log in again.");
                setLoading(false);
                // Optionally redirect to login here using navigate()
                return;
            }

            try {
                // 3. Include the Authorization header in the axios request
                const response = await axios.get(
                    `http://localhost:5000/api/admins/admin/events/${clubId}`,
                    {
                        headers: {
                            // This format matches what your backend auth middleware expects: "Bearer <token>"
                            'Authorization': `Bearer ${token}` 
                        }
                    }
                );
                
                setEvents(response.data);
            } catch (err) {
                console.error("Error fetching events:", err);
                // Check for 401/403 errors specifically
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    setError("Session expired or token is invalid. Please log in.");
                } else {
                    setError("Failed to load events. Please check the network connection.");
                }
            } finally {
                setLoading(false);
            }
        };

    fetchEvents();
  }, []);

  // --- Style and Filter Logic (Minor adjustment for clubName search) ---

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return { bg: '#e0f2fe', color: '#0369a1', border: '#7dd3fc' };
      case 'ongoing': return { bg: '#dcfce7', color: '#15803d', border: '#86efac' };
      case 'done': return { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1' };
      default: return { bg: '#f1f5f9', color: '#6b7280', border: '#cbd5e1' };
    }
  };

  const filteredEvents = events.filter(event => {
    const eventTitle = event.title ? event.title.toLowerCase() : '';
    // Corrected to search by clubName instead of manager
    const eventClub = event.clubName ? event.clubName.toLowerCase() : ''; 

    const matchesFilter = filter === 'all' || event.status === filter;
    // Updated search to include clubName
    const matchesSearch = eventTitle.includes(searchTerm.toLowerCase()) ||
                         eventClub.includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: events.length,
    upcoming: events.filter(e => e.status === 'upcoming').length,
    ongoing: events.filter(e => e.status === 'ongoing').length,
    done: events.filter(e => e.status === 'done').length
  };

  const getFilterButtonStyle = (status) => ({
    padding: '0.75rem 1.5rem',
    background: filter === status ? '#6d28d9' : 'white',
    color: filter === status ? 'white' : '#475569',
    border: `1px solid ${filter === status ? '#6d28d9' : '#e2e8f0'}`,
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: filter === status ? '600' : '500',
    textTransform: 'capitalize',
    transition: 'all 0.2s ease',
  });
  
  const getAttendanceBarStyle = (percentage) => ({
    width: `${percentage}%`,
    height: '100%',
    background: percentage > 90 ? 
      '#16a34a' : 
      percentage > 70 ? 
      '#6d28d9' :
      '#6d28d9',
    transition: 'width 0.3s ease',
    borderRadius: '4px'
  });

  // --- Conditional Render for Loading/Error ---

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f8fafc' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#6d28d9' }}>
          <Loader size={48} style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: '500' }}>Loading events...</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f8fafc' }}>
        <div style={{ 
          textAlign: 'center',
          padding: '2rem',
          border: '1px solid #fca5a5',
          borderRadius: '12px',
          background: '#fee2e2',
          color: '#b91c1c',
          maxWidth: '400px'
        }}>
          <AlertTriangle size={32} style={{ marginBottom: '1rem' }} />
          <h2 style={{ margin: '0 0 0.5rem 0' }}>Error!</h2>
          <p style={{ margin: 0 }}>{error}</p>
          <p style={{ fontSize: '0.875rem', marginTop: '1rem', color: '#dc2626' }}>Please try refreshing the page.</p>
        </div>
      </div>
    );
  }
  
  // --- Main Content Render ---

  return (
    
    <div style={{ 
      display: 'flex',
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <AdminNavbar />
      
      <div style={{ 
        flex: 1,
        padding: '2rem',
        marginLeft: '240px'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: '#6d28d9',
            margin: '0 0 0.5rem 0'
          }}>
            All Events
          </h1>
          <p style={{ 
            color: '#64748b', 
            margin: 0,
            fontSize: '1rem'
          }}>
            Manage and monitor all your events
          </p>
        </div>

        {/* Stats Cards (uses 'stats' derived from the fetched events) */}
        {/* ... (Keep the Stats Cards section as is) ... */}

        {/* Filters and Search */}
        <div style={{ 
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
              <Search size={20} style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#94a3b8'
              }} />
              <input
                type="text"
                // Updated placeholder to reflect searching by club
                placeholder="Search events or club name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  color: '#1e293b',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Filter size={20} style={{ color: '#6d28d9' }} />
              {['all', 'upcoming', 'ongoing', 'done'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  style={getFilterButtonStyle(status)} 
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid: Corrected Rendering */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
          gap: '1.5rem'
        }}>
          {filteredEvents.map(event => {
            const statusStyle = getStatusColor(event.status);
            
            // --- New Rendering Logic based on provided fields ---
            const displayDate = formatDate(event.startDate);
            const displayStartTime = formatTime(event.startDate);
            const displayEndTime = formatTime(event.endDate);
            const displayTimeRange = `${displayStartTime} - ${displayEndTime}`;
            
            // NOTE: Assuming these are still part of your event model for the Attendance Bar
            const attendees = event.attendees || 0; 
            const capacity = event.capacity || 1;
            const attendancePercentage = capacity > 0 ? (attendees / capacity) * 100 : 0; 
            // ---------------------------------------------------

            return (
              <div
                key={event._id} // Use _id for the key
                style={{
                  // ... (Event card styles and hover effects remain the same) ...
                  background: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = '#c7d2fe';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
                onClick={() => navigate(`/admin/events/${event.eventId}`)} // Use _id for navigation
              >
                {/* Status Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.4rem 1rem',
                  background: statusStyle.bg,
                  color: statusStyle.color,
                  border: `1px solid ${statusStyle.border}`,
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {event.status}
                </div>
                
                {/* Cover Image */}
                {event.coverImage && (
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '1rem'
                    }}
                  />
                )}

                {/* Event Title */}
                <h3 style={{ 
                  color: '#1e293b', 
                  margin: '0 0 1rem 0', 
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  // Remove paddingRight since image is now above
                }}>
                  {event.title}
                </h3>

                {/* Category (using a placeholder for category as it wasn't in the object) */}
                <div style={{
                  display: 'inline-block',
                  padding: '0.3rem 0.8rem',
                  background: '#ede9fe',
                  color: '#6d28d9',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  {event.category || 'Workshop'} 
                </div>

                {/* Event Details */}
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  
                  {/* Date and Time */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                    <Calendar size={16} />
                    <span style={{ fontWeight: '500' }}>{displayDate} • {displayTimeRange}</span>
                  </div>
                  
                  {/* Club Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                    <Users size={16} />
                    <span style={{ fontWeight: '500' }}>Club: **{event.clubName}**</span>
                  </div>

                  {/* Location */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                    <MapPin size={16} />
                    <span style={{ fontWeight: '500' }}>{event.location}</span>
                  </div>
                </div>

                {/* Attendance Bar (Uses assumed fields: attendees, capacity) */}
                <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: '500' }}>Attendance</span>
                    <span style={{ color: '#1e293b', fontSize: '0.875rem', fontWeight: '600' }}>
                      {attendees}/{capacity}
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: '#f1f5f9',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={getAttendanceBarStyle(attendancePercentage)} />
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    navigate(`/admin/events/${event.eventId}`)
                  }}
                  style={{
                    marginTop: '1.5rem',
                    width: '100%',
                    padding: '0.875rem',
                    background: '#6d28d9',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#4f46e5';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#6d28d9';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  View Details →
                </button>
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#64748b',
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ fontSize: '1.125rem', margin: 0 }}>No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;