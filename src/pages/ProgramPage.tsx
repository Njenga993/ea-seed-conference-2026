import { useState, useEffect } from "react";
import "../styles/ProgramPage.css";

type Speaker = {
  name: string;
  title: string;
  organization: string;
  avatar: string;
  bio?: string;
};

type Session = {
  id: string;
  time: string;
  endTime?: string;
  title: string;
  speakers: Speaker[];
  type: "Keynote" | "Panel" | "Workshop" | "Plenary" | "Paper" | "Tutorial";
  track: string;
  room: string;
  description: string;
  tags: string[];
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  capacity?: number;
  registered?: number;
  materials?: string;
};

const programData: Record<string, Session[]> = {
  day1: [
    {
      id: "d1-k1",
      time: "09:00",
      endTime: "10:00",
      title: "Opening Keynote: The Future of Interdisciplinary Research",
      speakers: [
        {
          name: "Prof. Jane Mwangi",
          title: "Director of Global Research",
          organization: "MIT",
          avatar: "JM",
          bio: "Leading expert in cross-disciplinary innovation with 20+ years of experience"
        }
      ],
      type: "Keynote",
      track: "Main Hall",
      room: "Grand Ballroom A",
      description: "An inspiring exploration of how breaking down disciplinary silos is accelerating breakthrough discoveries and addressing complex global challenges.",
      tags: ["Innovation", "Research Strategy", "Global Impact"],
      difficulty: "Beginner",
      capacity: 500,
      registered: 423
    },
    {
      id: "d1-p1",
      time: "10:30",
      endTime: "12:00",
      title: "Panel: AI Ethics and Responsible Innovation",
      speakers: [
        {
          name: "Dr. Sarah Chen",
          title: "AI Ethics Lead",
          organization: "Google",
          avatar: "SC"
        },
        {
          name: "Prof. Michael Rodriguez",
          title: "Philosophy Department",
          organization: "Stanford",
          avatar: "MR"
        },
        {
          name: "Dr. Aisha Patel",
          title: "Policy Advisor",
          organization: "UN",
          avatar: "AP"
        }
      ],
      type: "Panel",
      track: "Technology",
      room: "Conference Room B",
      description: "Industry and academic leaders discuss the ethical implications of AI development and strategies for responsible innovation.",
      tags: ["AI", "Ethics", "Policy"],
      difficulty: "Intermediate",
      capacity: 200,
      registered: 187
    },
    {
      id: "d1-w1",
      time: "13:30",
      endTime: "15:30",
      title: "Workshop: Advanced Data Visualization Techniques",
      speakers: [
        {
          name: "Dr. David Kim",
          title: "Data Science Director",
          organization: "Microsoft Research",
          avatar: "DK"
        }
      ],
      type: "Workshop",
      track: "Data Science",
      room: "Lab 101",
      description: "Hands-on workshop covering cutting-edge tools and techniques for creating impactful data visualizations that communicate complex insights effectively.",
      tags: ["Data Viz", "Tools", "Hands-on"],
      difficulty: "Advanced",
      capacity: 50,
      registered: 48,
      materials: "Laptop required"
    },
    {
      id: "d1-p2",
      time: "16:00",
      endTime: "17:30",
      title: "Paper Presentations: Climate Change Solutions",
      speakers: [
        {
          name: "Multiple Presenters",
          title: "Research Fellows",
          organization: "Various",
          avatar: "MP"
        }
      ],
      type: "Paper",
      track: "Environment",
      room: "Room 205",
      description: "Latest research findings on innovative approaches to climate change mitigation and adaptation strategies.",
      tags: ["Climate", "Research", "Sustainability"],
      difficulty: "Intermediate",
      capacity: 100,
      registered: 76
    }
  ],
  day2: [
    {
      id: "d2-t1",
      time: "09:00",
      endTime: "10:30",
      title: "Tutorial: Machine Learning for Beginners",
      speakers: [
        {
          name: "Dr. Emily Watson",
          title: "ML Engineer",
          organization: "OpenAI",
          avatar: "EW"
        }
      ],
      type: "Tutorial",
      track: "Technology",
      room: "Computer Lab 2",
      description: "Comprehensive introduction to machine learning concepts, algorithms, and practical applications for newcomers to the field.",
      tags: ["ML", "Beginner", "Tutorial"],
      difficulty: "Beginner",
      capacity: 30,
      registered: 29,
      materials: "Python knowledge recommended"
    },
    {
      id: "d2-k2",
      time: "11:00",
      endTime: "12:00",
      title: "Keynote: Quantum Computing Revolution",
      speakers: [
        {
          name: "Prof. John Anderson",
          title: "Quantum Physics Chair",
          organization: "Caltech",
          avatar: "JA",
          bio: "Pioneer in quantum computing research and author of 'Quantum Future'"
        }
      ],
      type: "Keynote",
      track: "Main Hall",
      room: "Grand Ballroom A",
      description: "Exploring the transformative potential of quantum computing and its implications for science, industry, and society.",
      tags: ["Quantum", "Computing", "Future Tech"],
      difficulty: "Intermediate",
      capacity: 500,
      registered: 412
    },
    {
      id: "d2-w2",
      time: "14:00",
      endTime: "16:00",
      title: "Workshop: Design Thinking for Innovation",
      speakers: [
        {
          name: "Lisa Thompson",
          title: "Innovation Consultant",
          organization: "IDEO",
          avatar: "LT"
        }
      ],
      type: "Workshop",
      track: "Innovation",
      room: "Creative Studio 3",
      description: "Interactive workshop applying design thinking methodologies to solve complex problems and foster innovation.",
      tags: ["Design", "Innovation", "Methodology"],
      difficulty: "Beginner",
      capacity: 40,
      registered: 38
    }
  ],
  day3: [
    {
      id: "d3-p3",
      time: "09:00",
      endTime: "10:30",
      title: "Panel: Global Health Challenges Post-Pandemic",
      speakers: [
        {
          name: "Dr. Maria Garcia",
          title: "Global Health Director",
          organization: "WHO",
          avatar: "MG"
        },
        {
          name: "Prof. James Liu",
          title: "Epidemiology",
          organization: "Harvard Medical",
          avatar: "JL"
        }
      ],
      type: "Panel",
      track: "Health",
      room: "Auditorium C",
      description: "Health experts discuss lessons learned from the pandemic and strategies for building more resilient global health systems.",
      tags: ["Health", "Policy", "Pandemic"],
      difficulty: "Intermediate",
      capacity: 300,
      registered: 267
    },
    {
      id: "d3-pl1",
      time: "11:00",
      endTime: "12:30",
      title: "Closing Plenary: Building Bridges for Tomorrow",
      speakers: [
        {
          name: "International Advisory Board",
          title: "Conference Organizers",
          organization: "Global Forum",
          avatar: "IB"
        }
      ],
      type: "Plenary",
      track: "Main Hall",
      room: "Grand Ballroom A",
      description: "Strategic reflections on conference outcomes and setting the agenda for future collaborative research initiatives.",
      tags: ["Future", "Collaboration", "Strategy"],
      difficulty: "Beginner",
      capacity: 500,
      registered: 389
    },
    {
      id: "d3-n1",
      time: "14:00",
      endTime: "16:00",
      title: "Networking Session: Research Collaborations",
      speakers: [
        {
          name: "All Participants",
          title: "Community",
          organization: "Global Forum",
          avatar: "AL"
        }
      ],
      type: "Panel",
      track: "Networking",
      room: "Exhibition Hall",
      description: "Informal networking session to connect with potential research collaborators and explore partnership opportunities.",
      tags: ["Networking", "Collaboration", "Community"],
      difficulty: "Beginner",
      capacity: 400,
      registered: 234
    }
  ]
};

const ProgramPage = () => {
  const [activeDay, setActiveDay] = useState("day1");
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());
  const [filterTrack, setFilterTrack] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedSessions, setBookmarkedSessions] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showFilters, setShowFilters] = useState(false);

  const dayLabels = {
    day1: "Day 1 - June 15, 2026",
    day2: "Day 2 - June 16, 2026",
    day3: "Day 3 - June 17, 2026"
  };

  const typeIcons = {
    "Keynote": "🎤",
    "Panel": "👥",
    "Workshop": "🛠️",
    "Plenary": "🏛️",
    "Paper": "📄",
    "Tutorial": "📚"
  };

  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedSessions');
    if (saved) {
      setBookmarkedSessions(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleSessionExpansion = (sessionId: string) => {
    const newExpanded = new Set(expandedSessions);
    if (newExpanded.has(sessionId)) {
      newExpanded.delete(sessionId);
    } else {
      newExpanded.add(sessionId);
    }
    setExpandedSessions(newExpanded);
  };

  const toggleBookmark = (sessionId: string) => {
    const newBookmarked = new Set(bookmarkedSessions);
    if (newBookmarked.has(sessionId)) {
      newBookmarked.delete(sessionId);
    } else {
      newBookmarked.add(sessionId);
    }
    setBookmarkedSessions(newBookmarked);
    localStorage.setItem('bookmarkedSessions', JSON.stringify([...newBookmarked]));
  };

  const filterSessions = (sessions: Session[]) => {
    return sessions.filter(session => {
      const matchesTrack = filterTrack === "All" || session.track === filterTrack;
      const matchesType = filterType === "All" || session.type === filterType;
      const matchesSearch = searchQuery === "" || 
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.speakers.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        session.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesTrack && matchesType && matchesSearch;
    });
  };

  const sessions = filterSessions(programData[activeDay]);

  const getUniqueTracks = () => {
    const tracks = new Set<string>();
    Object.values(programData).flat().forEach(session => {
      tracks.add(session.track);
    });
    return Array.from(tracks);
  };

  const getUniqueTypes = () => {
    const types = new Set<string>();
    Object.values(programData).flat().forEach(session => {
      types.add(session.type);
    });
    return Array.from(types);
  };

  return (
    <div className="program-page">
      {/* Hero Section */}
      <section className="program-hero">
        <div className="hero-container">
          <div className="hero-breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span className="current">Program</span>
          </div>
          <div className="hero-content">
            <div className="hero-left">
              <span className="hero-tag">2026 Program</span>
              <h1>Conference Schedule</h1>
              <p className="hero-description">
                Three days of inspiring keynotes, interactive workshops, and 
                groundbreaking research presentations
              </p>
            </div>
            <div className="hero-right">
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-value">50+</span>
                  <span className="stat-label">Sessions</span>
                </div>
                <div className="stat">
                  <span className="stat-value">100+</span>
                  <span className="stat-label">Speakers</span>
                </div>
                <div className="stat">
                  <span className="stat-value">7</span>
                  <span className="stat-label">Tracks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="controls-section">
        <div className="container">
          {/* Day Tabs */}
          <div className="day-tabs">
            {Object.entries(dayLabels).map(([day, label]) => (
              <button
                key={day}
                className={`day-tab ${activeDay === day ? "active" : ""}`}
                onClick={() => {
                  setActiveDay(day);
                  setExpandedSessions(new Set());
                }}
              >
                <span className="day-name">{label.split(' - ')[0]}</span>
                <span className="day-date">{label.split(' - ')[1]}</span>
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="controls-header">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search sessions, speakers, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon"></span>
            </div>

            <div className="controls-actions">
              <button 
                className={`filter-btn ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <span>⚙️</span> Filters
              </button>
              
              <div className="view-toggle">
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List view"
                >
                  ☰
                </button>
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  ⊞
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <label>Track</label>
                <select
                  value={filterTrack}
                  onChange={(e) => setFilterTrack(e.target.value)}
                >
                  <option value="All">All Tracks</option>
                  {getUniqueTracks().map(track => (
                    <option key={track} value={track}>{track}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="All">All Types</option>
                  {getUniqueTypes().map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <button 
                className="clear-filters"
                onClick={() => {
                  setFilterTrack("All");
                  setFilterType("All");
                  setSearchQuery("");
                }}
              >
                Clear All
              </button>
            </div>
          )}

          {/* Results Info */}
          <div className="results-info">
            <span>Showing {sessions.length} of {programData[activeDay].length} sessions</span>
            {bookmarkedSessions.size > 0 && (
              <span className="bookmark-badge">{bookmarkedSessions.size} bookmarked</span>
            )}
          </div>
        </div>
      </section>

      {/* Sessions Display */}
      <section className="sessions-section">
        <div className="container">
          {sessions.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No sessions found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          ) : (
            <>
              {viewMode === 'list' && (
                <div className="sessions-list">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className={`session-card ${expandedSessions.has(session.id) ? 'expanded' : ''}`}
                    >
                      <div className="session-main" onClick={() => toggleSessionExpansion(session.id)}>
                        <div className="session-time">
                          <div className="time">{session.time}</div>
                          {session.endTime && (
                            <div className="end-time">{session.endTime}</div>
                          )}
                        </div>

                        <div className="session-content">
                          <div className="session-header">
                            <div className="session-type">
                              <span className="type-icon">{typeIcons[session.type]}</span>
                              <span>{session.type}</span>
                            </div>
                            <button 
                              className="bookmark-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(session.id);
                              }}
                            >
                              {bookmarkedSessions.has(session.id) ? '⭐' : '☆'}
                            </button>
                          </div>

                          <h3 className="session-title">{session.title}</h3>
                          
                          <div className="session-speakers">
                            {session.speakers.map((speaker, idx) => (
                              <div key={idx} className="speaker">
                                <span className="speaker-avatar">{speaker.avatar}</span>
                                <div>
                                  <div className="speaker-name">{speaker.name}</div>
                                  <div className="speaker-title">{speaker.title}, {speaker.organization}</div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="session-meta">
                            <span> {session.track}</span>
                            <span> {session.room}</span>
                            {session.capacity && (
                              <span> {session.registered}/{session.capacity}</span>
                            )}
                            {session.difficulty && (
                              <span className={`difficulty ${session.difficulty.toLowerCase()}`}>
                                {session.difficulty}
                              </span>
                            )}
                          </div>

                          <div className="session-tags">
                            {session.tags.map((tag, idx) => (
                              <span key={idx} className="tag">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {expandedSessions.has(session.id) && (
                        <div className="session-expanded">
                          <div className="expanded-section">
                            <h4>About this session</h4>
                            <p>{session.description}</p>
                          </div>

                          {session.materials && (
                            <div className="expanded-section">
                              <h4>Materials & Requirements</h4>
                              <p>{session.materials}</p>
                            </div>
                          )}

                          {session.speakers[0].bio && (
                            <div className="expanded-section">
                              <h4>Speaker Bio</h4>
                              {session.speakers.map((speaker, idx) => (
                                speaker.bio && (
                                  <p key={idx}><strong>{speaker.name}:</strong> {speaker.bio}</p>
                                )
                              ))}
                            </div>
                          )}

                          <div className="session-actions">
                            <button className="btn btn-primary">Add to Calendar</button>
                            <button className="btn btn-secondary">Share Session</button>
                            <button className="btn btn-secondary">Set Reminder</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {viewMode === 'grid' && (
                <div className="grid-view">
                  {sessions.map((session) => (
                    <div key={session.id} className="grid-card">
                      <div className="grid-header">
                        <span className="grid-icon">{typeIcons[session.type]}</span>
                        <span className="grid-type">{session.type}</span>
                      </div>
                      <div className="grid-body">
                        <h4>{session.title}</h4>
                        <p className="grid-time">{session.time}</p>
                        <p className="grid-speakers">
                          {session.speakers.map(s => s.name).join(', ')}
                        </p>
                        <div className="grid-tags">
                          {session.tags.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="grid-tag">{tag}</span>
                          ))}
                        </div>
                        <button 
                          className="grid-bookmark"
                          onClick={() => toggleBookmark(session.id)}
                        >
                          {bookmarkedSessions.has(session.id) ? '⭐' : '☆'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Get the Complete Program</h2>
          <p>Download the full conference schedule with detailed session information</p>
          
          <div className="cta-buttons">
            <button className="btn btn-primary">
              <span></span> Download PDF Program
            </button>
            <button className="btn btn-secondary">
              <span></span> Add to Mobile App
            </button>
          </div>

          <div className="cta-features">
            <div className="feature">
              <span className="feature-icon">✓</span>
              <span>Full session details</span>
            </div>
            <div className="feature">
              <span className="feature-icon">✓</span>
              <span>Speaker bios</span>
            </div>
            <div className="feature">
              <span className="feature-icon">✓</span>
              <span>Venue maps</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramPage;