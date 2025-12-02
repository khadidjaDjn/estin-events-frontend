import React, { useState } from 'react';
import { Calendar, Users, TrendingUp, Clock, Search, Filter, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import AdminNavbar from './AdminNavbar';

const AdminEvents = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const events = [
    { 
      id: 1, 
      title: "AI Summit", 
      attendees: 120, 
      capacity: 150,
      date: "Dec 12, 2024", 
      time: "09:00 AM",
      manager: "Dr. Karim",
      status: "done",
      category: "Technology",
      location: "Main Hall"
    },
    { 
      id: 2, 
      title: "Robotics Expo", 
      attendees: 85, 
      capacity: 100,
      date: "Dec 20, 2024", 
      time: "02:00 PM",
      manager: "Sara",
      status: "upcoming",
      category: "Engineering",
      location: "Exhibition Center"
    },
    { 
      id: 3, 
      title: "Hackathon 2025", 
      attendees: 200, 
      capacity: 200,
      date: "Jan 14, 2025", 
      time: "10:00 AM",
      manager: "Yacine",
      status: "upcoming",
      category: "Competition",
      location: "Tech Hub"
    },
    { 
      id: 4, 
      title: "Startup Pitch Night", 
      attendees: 45, 
      capacity: 80,
      date: "Dec 01, 2024", 
      time: "06:00 PM",
      manager: "Dr. Karim",
      status: "ongoing",
      category: "Business",
      location: "Conference Room A"
    },
    { 
      id: 5, 
      title: "Data Science Workshop", 
      attendees: 65, 
      capacity: 70,
      date: "Nov 28, 2024", 
      time: "01:00 PM",
      manager: "Amina",
      status: "done",
      category: "Workshop",
      location: "Lab 3"
    },
    { 
      id: 6, 
      title: "Career Fair 2024", 
      attendees: 320, 
      capacity: 400,
      date: "Dec 05, 2024", 
      time: "09:00 AM",
      manager: "Yacine",
      status: "upcoming",
      category: "Career",
      location: "Sports Complex"
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return { bg: '#e0f2fe', color: '#0369a1', border: '#7dd3fc' };
      case 'ongoing': return { bg: '#dcfce7', color: '#15803d', border: '#86efac' };
      case 'done': return { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1' };
      default: return { bg: '#f1f5f9', color: '#6b7280', border: '#cbd5e1' };
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.status === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.manager.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: events.length,
    upcoming: events.filter(e => e.status === 'upcoming').length,
    ongoing: events.filter(e => e.status === 'ongoing').length,
    done: events.filter(e => e.status === 'done').length
  };

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
        {/* Header */}
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

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)',
            padding: '1.5rem',
            borderRadius: '12px',
            color: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '0.875rem', fontWeight: '500' }}>Total Events</p>
                <h2 style={{ margin: '0.5rem 0 0 0', fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.total}</h2>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '0.75rem',
                borderRadius: '10px'
              }}>
                <Calendar size={28} />
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem', fontWeight: '500' }}>Upcoming</p>
                <h2 style={{ margin: '0.5rem 0 0 0', fontSize: '2.5rem', fontWeight: 'bold', color: '#0369a1' }}>{stats.upcoming}</h2>
              </div>
              <div style={{
                background: '#e0f2fe',
                padding: '0.75rem',
                borderRadius: '10px'
              }}>
                <Clock size={28} style={{ color: '#0369a1' }} />
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem', fontWeight: '500' }}>Ongoing</p>
                <h2 style={{ margin: '0.5rem 0 0 0', fontSize: '2.5rem', fontWeight: 'bold', color: '#15803d' }}>{stats.ongoing}</h2>
              </div>
              <div style={{
                background: '#dcfce7',
                padding: '0.75rem',
                borderRadius: '10px'
              }}>
                <TrendingUp size={28} style={{ color: '#15803d' }} />
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem', fontWeight: '500' }}>Completed</p>
                <h2 style={{ margin: '0.5rem 0 0 0', fontSize: '2.5rem', fontWeight: 'bold', color: '#475569' }}>{stats.done}</h2>
              </div>
              <div style={{
                background: '#f1f5f9',
                padding: '0.75rem',
                borderRadius: '10px'
              }}>
                <Users size={28} style={{ color: '#475569' }} />
              </div>
            </div>
          </div>
        </div>

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
                placeholder="Search events or managers..."
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
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: filter === status ? '#6d28d9' : 'white',
                    color: filter === status ? 'white' : '#475569',
                    border: `1px solid ${filter === status ? '#6d28d9' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: filter === status ? '600' : '500',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
          gap: '1.5rem'
        }}>
          {filteredEvents.map(event => {
            const statusStyle = getStatusColor(event.status);
            const attendancePercentage = (event.attendees / event.capacity) * 100;
            
            return (
              <div
                key={event.id}
                style={{
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

                {/* Event Title */}
                <h3 style={{ 
                  color: '#1e293b', 
                  margin: '0 0 1rem 0', 
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  paddingRight: '100px'
                }}>
                  {event.title}
                </h3>

                {/* Category */}
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
                  {event.category}
                </div>

                {/* Event Details */}
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                    <Calendar size={16} />
                    <span style={{ fontWeight: '500' }}>{event.date} • {event.time}</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                    <Users size={16} />
                    <span style={{ fontWeight: '500' }}>Manager: {event.manager}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                    <MapPin size={16} />
                    <span style={{ fontWeight: '500' }}>{event.location}</span>
                  </div>
                </div>

                {/* Attendance Bar */}
                <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: '500' }}>Attendance</span>
                    <span style={{ color: '#1e293b', fontSize: '0.875rem', fontWeight: '600' }}>
                      {event.attendees}/{event.capacity}
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: '#f1f5f9',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${attendancePercentage}%`,
                      height: '100%',
                      background: attendancePercentage > 90 ? 
                        '#16a34a' : 
                        attendancePercentage > 70 ? 
                        '#6d28d9' :
                        '#6d28d9',
                      transition: 'width 0.3s ease',
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => navigate(`/admin/events/${event.id}`)}
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


// import React from "react";
// import { Link } from "react-router-dom";
// import AdminNavbar from "./AdminNavbar";
// import "../styles/AdminEvents.css";

// const AdminEvents = () => {
  
//   const events = [
//     { id: 1, title: "AI Summit", attendees: 120, date: "Dec 12, 2024", manager: "Dr. Karim" },
//     { id: 2, title: "Robotics Expo", attendees: 85, date: "Dec 20, 2024", manager: "Sara" },
//     { id: 3, title: "Hackathon", attendees: 200, date: "Jan 14, 2025", manager: "Yacine" },
//   ];

//   return (
//     <div className="admin-container">
//       <AdminNavbar />
//       <div className="admin-events-content">
//         <h1>All Events</h1>

//         <table className="admin-table">
//           <thead>
//             <tr>
//               <th>Event</th>
//               <th>Date</th>
//               <th>Attendees</th>
//               <th>Manager</th>
//               <th>Details</th>
//             </tr>
//           </thead>

//           <tbody>
//             {events.map(e => (
//               <tr key={e.id}>
//                 <td>{e.title}</td>
//                 <td>{e.date}</td>
//                 <td>{e.attendees}</td>
//                 <td>{e.manager}</td>
//                 <td>
//                   <Link to={`/admin/events/${e.id}`} className="btn-view">View</Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminEvents;
