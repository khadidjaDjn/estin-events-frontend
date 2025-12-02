import React, { useState } from 'react';

import { Calendar, Clock, MapPin, Users, Star, ArrowLeft, Edit, Trash2, Download, Share2, Mail, Phone, Image as ImageIcon, MessageSquare } from 'lucide-react';
import AdminNavbar from './AdminNavbar';

const EventDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');

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
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return { bg: '#dbeafe', color: '#1e40af', border: '#93c5fd' };
      case 'ongoing': return { bg: '#dcfce7', color: '#15803d', border: '#86efac' };
      case 'done': return { bg: '#f3e8ff', color: '#6d28d9', border: '#c4b5fd' };
      default: return { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1' };
    }
  };

  const statusStyle = getStatusColor(event.status);
  const attendanceRate = ((event.attendees / event.capacity) * 100).toFixed(0);

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
        marginLeft: '240px'
      }}>
        {/* Header with Cover Image */}
        <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
          <img 
            src={event.coverImage} 
            alt={event.title}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              filter: 'brightness(0.7)'
            }}
          />
          
          {/* Overlay Content */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '2rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
            color: 'white'
          }}>
            <button
              onClick={() => window.history.back()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '500',
                marginBottom: '1rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            >
              <ArrowLeft size={20} />
              Back to Events
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{
                    padding: '0.4rem 1rem',
                    background: statusStyle.bg,
                    color: statusStyle.color,
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {event.status}
                  </div>
                  <div style={{
                    padding: '0.4rem 1rem',
                    background: 'rgba(109, 40, 217, 0.9)',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {event.category}
                  </div>
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>
                  {event.title}
                </h1>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.95rem', opacity: 0.95 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={18} />
                    <span>{event.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={18} />
                    <span>{event.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={18} />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: 'none',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                >
                  <Share2 size={18} />
                  Share
                </button>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#6d28d9',
                    border: 'none',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#5b21b6'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#6d28d9'}
                >
                  <Edit size={18} />
                  Edit Event
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: '#e2e8f0',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{ background: 'white', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6d28d9', marginBottom: '0.25rem' }}>
              {event.stats.totalRegistrations}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>Total Registrations</div>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6d28d9', marginBottom: '0.25rem' }}>
              {event.stats.attended}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>Attended</div>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6d28d9', marginBottom: '0.25rem' }}>
              {attendanceRate}%
            </div>
            <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>Attendance Rate</div>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6d28d9', marginBottom: '0.25rem' }}>
              {event.stats.averageRating}
              <Star size={20} style={{ display: 'inline', marginLeft: '0.25rem', fill: '#fbbf24', color: '#fbbf24' }} />
            </div>
            <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>Average Rating</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          background: 'white',
          borderBottom: '1px solid #e2e8f0',
          padding: '0 2rem'
        }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['overview', 'organizers', 'gallery', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '1rem 0',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab ? '3px solid #6d28d9' : '3px solid transparent',
                  color: activeTab === tab ? '#6d28d9' : '#64748b',
                  fontSize: '0.95rem',
                  fontWeight: activeTab === tab ? '600' : '500',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: '2rem' }}>
          {activeTab === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
              {/* Description */}
              <div>
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '2rem'
                }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', margin: '0 0 1rem 0' }}>
                    About This Event
                  </h2>
                  <p style={{ color: '#475569', lineHeight: '1.7', margin: '0 0 1.5rem 0' }}>
                    {event.description}
                  </p>
                  
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', margin: '2rem 0 1rem 0' }}>
                    Event Highlights
                  </h3>
                  <ul style={{ color: '#475569', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                    {event.highlights.map((highlight, index) => (
                      <li key={index} style={{ marginBottom: '0.5rem' }}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                {/* Attendance Chart */}
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b', margin: '0 0 1.5rem 0' }}>
                    Attendance Overview
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '200px' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                      <div style={{ 
                        background: 'linear-gradient(to top, #6d28d9, #a78bfa)',
                        height: '80%',
                        borderRadius: '8px 8px 0 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '1.25rem'
                      }}>
                        150
                      </div>
                      <div style={{ textAlign: 'center', marginTop: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                        Registered
                      </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                      <div style={{ 
                        background: 'linear-gradient(to top, #6d28d9, #8b5cf6)',
                        height: `${attendanceRate}%`,
                        borderRadius: '8px 8px 0 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '1.25rem'
                      }}>
                        120
                      </div>
                      <div style={{ textAlign: 'center', marginTop: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                        Attended
                      </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                      <div style={{ 
                        background: 'linear-gradient(to top, #6d28d9, #c4b5fd)',
                        height: '30%',
                        borderRadius: '8px 8px 0 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '1.25rem'
                      }}>
                        45
                      </div>
                      <div style={{ textAlign: 'center', marginTop: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                        Feedback
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                {/* Quick Actions */}
                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', margin: '0 0 1rem 0' }}>
                    Quick Actions
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.875rem',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      color: '#475569',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#6d28d9';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = '#6d28d9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.color = '#475569';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}>
                      <Download size={18} />
                      Export Attendees
                    </button>
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.875rem',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      color: '#475569',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#6d28d9';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = '#6d28d9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.color = '#475569';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}>
                      <MessageSquare size={18} />
                      View Feedback
                    </button>
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.875rem',
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '8px',
                      color: '#dc2626',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#dc2626';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#fef2f2';
                      e.currentTarget.style.color = '#dc2626';
                    }}>
                      <Trash2 size={18} />
                      Delete Event
                    </button>
                  </div>
                </div>

                {/* Event Details Card */}
                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', margin: '0 0 1rem 0' }}>
                    Event Details
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Capacity</div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>{event.capacity} people</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Status</div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b', textTransform: 'capitalize' }}>{event.status}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Duration</div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>8 hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'organizers' && (
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', margin: '0 0 1.5rem 0' }}>
                Event Organizers
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {event.organizers.map(organizer => (
                  <div key={organizer.id} style={{
                    padding: '1.5rem',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#6d28d9';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(109, 40, 217, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6d28d9, #a78bfa)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.25rem',
                        fontWeight: '600'
                      }}>
                        {organizer.avatar}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', margin: '0 0 0.25rem 0' }}>
                          {organizer.name}
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: '#6d28d9', margin: 0, fontWeight: '500' }}>
                          {organizer.role}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                        <Mail size={16} />
                        <span>{organizer.email}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
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
  <div style={{
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #e2e8f0'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>
        Event Gallery
      </h2>
      <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.25rem',
        background: '#6d28d9',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: '600',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = '#5b21b6'}
      onMouseLeave={(e) => e.currentTarget.style.background = '#6d28d9'}>
        <ImageIcon size={18} />
        Add Photos
      </button>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
      {event.gallery.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Gallery ${index + 1}`}
          style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
        />
      ))}
    </div>
  </div>
)}

{activeTab === 'reviews' && (
  <div style={{
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #e2e8f0'
  }}>
    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', margin: '0 0 1.5rem 0' }}>
      Reviews
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {event.reviews.map(review => (
        <div key={review.id} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6d28d9, #a78bfa)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600'
          }}>
            {review.avatar}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>{review.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={16} style={{ fill: '#fbbf24', color: '#fbbf24' }} />
                ))}
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#475569', margin: '0.25rem 0' }}>{review.comment}</p>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{review.date}</span>
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