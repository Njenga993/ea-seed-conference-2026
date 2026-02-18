import { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import "../styles/speakersPage.css";

interface Speaker {
  id: number;
  name: string;
  title: string;
  organization: string;
  bio: string;
  longBio: string;
  image: string;
  topic: string;
  tracks: string[];
  keynote?: boolean;
  featured?: boolean;
  sessions: number[];
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
    email?: string;
  };
  expertise: string[];
  country: string;
  languages: string[];
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
  };
  rating: number;
  reviewCount: number;
}

interface Session {
  id: number;
  title: string;
  time: string;
  day: string;
  track: string;
  type: string;
}

const speakersData: Speaker[] = [
  {
    id: 1,
    name: "Dr. Amina Njoroge",
    title: "Professor of Climate Systems",
    organization: "University of Nairobi",
    bio: "Leading researcher in climate modeling and sustainable policy frameworks across East Africa.",
    longBio: "Dr. Amina Njoroge has dedicated her career to understanding and mitigating climate change impacts in developing regions. With over 15 years of research experience, she has published numerous papers on climate adaptation strategies and has advised governments across Africa on environmental policy.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    topic: "Climate Science",
    tracks: ["Climate Action", "Policy & Governance"],
    keynote: true,
    featured: true,
    sessions: [101, 205, 308],
    social: {
      twitter: "@aminanjoroge",
      linkedin: "amina-njoroge",
      website: "www.aminanjoroge.com",
      email: "a.njoroge@uon.ac.ke"
    },
    expertise: ["Climate Modeling", "Policy Analysis", "Sustainable Development", "Environmental Economics"],
    country: "Kenya",
    languages: ["English", "Swahili", "French"],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: false
    },
    rating: 4.9,
    reviewCount: 127
  },
  {
    id: 2,
    name: "Prof. Daniel Mwangi",
    title: "Director of AI Research",
    organization: "TechLabs Africa",
    bio: "Expert in artificial intelligence applications for environmental monitoring and predictive modeling.",
    longBio: "Professor Daniel Mwangi is a pioneer in applying artificial intelligence to solve environmental challenges. His groundbreaking work in machine learning algorithms for climate prediction has been recognized globally.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    topic: "Artificial Intelligence",
    tracks: ["Technology & Innovation", "Climate Action"],
    keynote: true,
    featured: true,
    sessions: [102, 203, 304],
    social: {
      twitter: "@danielmwangi",
      linkedin: "daniel-mwangi",
      website: "www.techlabsafrica.ai",
      email: "d.mwangi@techlabsafrica.com"
    },
    expertise: ["Machine Learning", "Computer Vision", "Predictive Analytics", "IoT Systems"],
    country: "Kenya",
    languages: ["English", "Swahili"],
    availability: {
      monday: true,
      tuesday: false,
      wednesday: true
    },
    rating: 4.8,
    reviewCount: 95
  },
  {
    id: 3,
    name: "Dr. Grace Ouma",
    title: "Environmental Economist",
    organization: "World Policy Institute",
    bio: "Focuses on sustainable financing models and green transition policies in emerging economies.",
    longBio: "Dr. Grace Ouma is an influential voice in environmental economics, specializing in sustainable financing mechanisms for developing countries. Her research on green bonds and carbon markets has shaped policy decisions across multiple continents.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    topic: "Sustainability",
    tracks: ["Finance & Investment", "Policy & Governance"],
    sessions: [103, 206, 309],
    social: {
      twitter: "@graceouma",
      linkedin: "grace-ouma",
      email: "g.ouma@worldpolicy.org"
    },
    expertise: ["Green Finance", "Carbon Markets", "Sustainable Investment", "Economic Policy"],
    country: "Nigeria",
    languages: ["English", "French", "Yoruba"],
    availability: {
      monday: false,
      tuesday: true,
      wednesday: true
    },
    rating: 4.7,
    reviewCount: 82
  },
  {
    id: 4,
    name: "Eng. Peter Kamau",
    title: "Renewable Energy Specialist",
    organization: "SolarTech Africa",
    bio: "Leads innovative solar grid deployment projects across rural communities.",
    longBio: "Engineer Peter Kamau is at the forefront of renewable energy deployment in Africa. His innovative approach to solar microgrids has brought electricity to over 500,000 people in remote communities.",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    topic: "Renewable Energy",
    tracks: ["Energy Transition", "Technology & Innovation"],
    sessions: [104, 207, 310],
    social: {
      twitter: "@peterkamau",
      linkedin: "peter-kamau",
      website: "www.solartechafrica.com",
      email: "p.kamau@solartechafrica.com"
    },
    expertise: ["Solar Energy", "Microgrids", "Energy Storage", "Rural Electrification"],
    country: "Kenya",
    languages: ["English", "Swahili"],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true
    },
    rating: 4.9,
    reviewCount: 156
  },
  {
    id: 5,
    name: "Dr. Fatima Al-Rashid",
    title: "Marine Biologist",
    organization: "Ocean Conservation Institute",
    bio: "Specializes in coral reef restoration and marine ecosystem protection.",
    longBio: "Dr. Fatima Al-Rashid is a renowned marine biologist dedicated to ocean conservation. Her innovative coral reef restoration techniques have been implemented in over 20 countries.",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    topic: "Marine Conservation",
    tracks: ["Biodiversity", "Climate Action"],
    sessions: [105, 208, 311],
    social: {
      twitter: "@fatimarashid",
      linkedin: "fatima-al-rashid",
      website: "www.oceanconservation.org",
      email: "f.alrashid@oceanconservation.org"
    },
    expertise: ["Coral Reef Restoration", "Marine Ecology", "Ocean Acidification", "Community Conservation"],
    country: "Egypt",
    languages: ["English", "Arabic", "French"],
    availability: {
      monday: true,
      tuesday: false,
      wednesday: true
    },
    rating: 4.8,
    reviewCount: 103
  },
  {
    id: 6,
    name: "Prof. Samuel Adekoya",
    title: "Agricultural Scientist",
    organization: "African Agricultural Research Institute",
    bio: "Pioneering climate-smart agriculture techniques for food security.",
    longBio: "Professor Samuel Adekoya is a leading agricultural scientist focused on developing climate-resilient crop varieties. His work on drought-tolerant maize and sustainable farming practices has helped thousands of farmers.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    topic: "Agriculture",
    tracks: ["Food Security", "Climate Action"],
    sessions: [106, 209, 312],
    social: {
      twitter: "@samueladekoya",
      linkedin: "samuel-adekoya",
      email: "s.adekoya@aari.org"
    },
    expertise: ["Climate-Smart Agriculture", "Crop Genetics", "Soil Science", "Food Systems"],
    country: "Nigeria",
    languages: ["English", "Yoruba", "Hausa"],
    availability: {
      monday: false,
      tuesday: true,
      wednesday: false
    },
    rating: 4.6,
    reviewCount: 78
  }
];

const sessionsData: Session[] = [
  { id: 101, title: "Climate Modeling for Africa", time: "09:00", day: "Monday", track: "Climate Action", type: "Keynote" },
  { id: 102, title: "AI in Environmental Monitoring", time: "10:30", day: "Monday", track: "Technology & Innovation", type: "Keynote" },
  { id: 103, title: "Green Finance Mechanisms", time: "14:00", day: "Monday", track: "Finance & Investment", type: "Workshop" },
  { id: 104, title: "Solar Microgrids Implementation", time: "15:30", day: "Monday", track: "Energy Transition", type: "Panel" },
  { id: 105, title: "Coral Reef Restoration", time: "17:00", day: "Monday", track: "Biodiversity", type: "Presentation" },
  { id: 106, title: "Climate-Smart Agriculture", time: "18:30", day: "Monday", track: "Food Security", type: "Workshop" },
];

const SpeakersPage = () => {
  const [search, setSearch] = useState("");
  const [filterTopic, setFilterTopic] = useState("All");
  const [filterTrack, setFilterTrack] = useState("All");
  const [filterCountry, setFilterCountry] = useState("All");
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [bookmarkedSpeakers, setBookmarkedSpeakers] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    const saved = localStorage.getItem("bookmarkedSpeakers");
    if (saved) {
      setBookmarkedSpeakers(JSON.parse(saved));
    }
  }, []);

  const toggleBookmark = (speakerId: number) => {
    setBookmarkedSpeakers(prev => {
      const updated = prev.includes(speakerId)
        ? prev.filter(id => id !== speakerId)
        : [...prev, speakerId];
      localStorage.setItem("bookmarkedSpeakers", JSON.stringify(updated));
      return updated;
    });
  };

  const topics = useMemo(() => ["All", ...new Set(speakersData.map(s => s.topic))], []);
  const tracks = useMemo(() => ["All", ...new Set(speakersData.flatMap(s => s.tracks))], []);
  const countries = useMemo(() => ["All", ...new Set(speakersData.map(s => s.country))], []);

  const filteredSpeakers = useMemo(() => {
    let filtered = speakersData.filter(speaker => {
      const matchesSearch = speaker.name.toLowerCase().includes(search.toLowerCase()) ||
                           speaker.organization.toLowerCase().includes(search.toLowerCase()) ||
                           speaker.expertise.some(exp => exp.toLowerCase().includes(search.toLowerCase()));
      const matchesTopic = filterTopic === "All" || speaker.topic === filterTopic;
      const matchesTrack = filterTrack === "All" || speaker.tracks.includes(filterTrack);
      const matchesCountry = filterCountry === "All" || speaker.country === filterCountry;
      
      return matchesSearch && matchesTopic && matchesTrack && matchesCountry;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "sessions":
          return b.sessions.length - a.sessions.length;
        case "country":
          return a.country.localeCompare(b.country);
        default:
          return 0;
      }
    });

    return filtered;
  }, [search, filterTopic, filterTrack, filterCountry, sortBy]);

  const featuredSpeakers = speakersData.filter(s => s.featured);
  const keynoteSpeakers = speakersData.filter(s => s.keynote);

  const getSessionInfo = (sessionId: number) => {
    return sessionsData.find(s => s.id === sessionId);
  };

  return (
    <div className="speakers-page">
      {/* Hero Section */}
      <section className="speakers-hero">
        <div className="hero-container">
          <div className="hero-breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span className="current">Speakers</span>
          </div>
          <div className="hero-content">
            <div className="hero-left">
              <span className="hero-tag">Meet the Experts</span>
              <h1>Our Distinguished Speakers</h1>
              <p className="hero-description">
                Leading researchers, innovators, and policymakers from around the world 
                shaping the future of sustainable development.
              </p>
            </div>
            <div className="hero-right">
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-value">{speakersData.length}</span>
                  <span className="stat-label">Speakers</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{keynoteSpeakers.length}</span>
                  <span className="stat-label">Keynotes</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{countries.length - 1}</span>
                  <span className="stat-label">Countries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Speakers</h2>
            <p>Meet our distinguished lineup of experts</p>
          </div>
          <div className="featured-grid">
            {featuredSpeakers.map((speaker) => (
              <div
                key={speaker.id}
                className="featured-card"
                onClick={() => setSelectedSpeaker(speaker)}
              >
                <div className="featured-image">
                  <img src={speaker.image} alt={speaker.name} />
                  <div className="featured-overlay">
                    <button className="view-profile-btn">View Profile</button>
                  </div>
                </div>
                <div className="featured-content">
                  <h3>{speaker.name}</h3>
                  <p className="featured-title">{speaker.title}</p>
                  <p className="featured-org">{speaker.organization}</p>
                  <div className="featured-meta">
                    <span className="country"> {speaker.country}</span>
                    <span className="rating"> {speaker.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keynote Speakers */}
      <section className="keynote-section">
        <div className="container">
          <div className="section-header">
            <h2>Keynote Speakers</h2>
            <p>Visionary leaders delivering transformative insights</p>
          </div>
          <div className="keynote-grid">
            {keynoteSpeakers.map((speaker) => (
              <div
                key={speaker.id}
                className="keynote-card"
                onClick={() => setSelectedSpeaker(speaker)}
              >
                <div className="keynote-badge">KEYNOTE</div>
                <img src={speaker.image} alt={speaker.name} />
                <div className="keynote-info">
                  <h3>{speaker.name}</h3>
                  <p className="keynote-title">{speaker.title}</p>
                  <p className="keynote-org">{speaker.organization}</p>
                  <div className="keynote-topic">{speaker.topic}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="controls-section">
        <div className="container">
          <div className="controls-header">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search speakers by name, organization, or expertise..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
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
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  ⊞
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <div className="filters-panel">
                <div className="filter-group">
                  <label>Topic</label>
                  <select value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)}>
                    {topics.map(topic => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Track</label>
                  <select value={filterTrack} onChange={(e) => setFilterTrack(e.target.value)}>
                    {tracks.map(track => (
                      <option key={track} value={track}>{track}</option>
                    ))}
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Country</label>
                  <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)}>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Sort By</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="rating">Rating</option>
                    <option value="sessions">Sessions</option>
                    <option value="country">Country</option>
                  </select>
                </div>
                
                <button 
                  className="clear-filters"
                  onClick={() => {
                    setFilterTopic("All");
                    setFilterTrack("All");
                    setFilterCountry("All");
                    setSortBy("name");
                    setSearch("");
                  }}
                >
                  Clear All
                </button>
              </div>
            )}
          </AnimatePresence>

          <div className="results-info">
            <span>Showing {filteredSpeakers.length} of {speakersData.length} speakers</span>
            {bookmarkedSpeakers.length > 0 && (
              <span className="bookmark-badge">{bookmarkedSpeakers.length} bookmarked</span>
            )}
          </div>
        </div>
      </section>

      {/* Speakers Grid/List */}
      <section className="speakers-section">
        <div className="container">
          {viewMode === 'grid' && (
            <div className="speakers-grid">
              {filteredSpeakers.map((speaker) => (
                <div
                  key={speaker.id}
                  className="speaker-card"
                  onClick={() => setSelectedSpeaker(speaker)}
                >
                  <button 
                    className="bookmark-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(speaker.id);
                    }}
                  >
                    {bookmarkedSpeakers.includes(speaker.id) ? '❤️' : '🤍'}
                  </button>
                  
                  <div className="speaker-image">
                    <img src={speaker.image} alt={speaker.name} />
                    {speaker.keynote && (
                      <div className="speaker-badge">Keynote</div>
                    )}
                  </div>
                  
                  <div className="speaker-info">
                    <h3>{speaker.name}</h3>
                    <p className="speaker-title">{speaker.title}</p>
                    <p className="speaker-org">{speaker.organization}</p>
                    
                    <div className="speaker-meta">
                      <span className="country"> {speaker.country}</span>
                      <span className="rating"> {speaker.rating}</span>
                    </div>
                    
                    <div className="speaker-tracks">
                      {speaker.tracks.slice(0, 2).map((track, i) => (
                        <span key={i} className="track-tag">{track}</span>
                      ))}
                    </div>
                    
                    <div className="speaker-sessions">
                      {speaker.sessions.length} sessions
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="speakers-list">
              {filteredSpeakers.map((speaker) => (
                <div
                  key={speaker.id}
                  className="speaker-list-item"
                  onClick={() => setSelectedSpeaker(speaker)}
                >
                  <img src={speaker.image} alt={speaker.name} />
                  <div className="speaker-list-content">
                    <div className="speaker-list-header">
                      <div>
                        <h3>{speaker.name}</h3>
                        <p className="speaker-list-title">{speaker.title}</p>
                        <p className="speaker-list-org">{speaker.organization}</p>
                      </div>
                      <button 
                        className="bookmark-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(speaker.id);
                        }}
                      >
                        {bookmarkedSpeakers.includes(speaker.id) ? '❤️' : '🤍'}
                      </button>
                    </div>
                    
                    <p className="speaker-list-bio">{speaker.bio}</p>
                    
                    <div className="speaker-list-meta">
                      <span> {speaker.country}</span>
                      <span> {speaker.rating} ({speaker.reviewCount} reviews)</span>
                      <span> {speaker.sessions.length} sessions</span>
                    </div>
                    
                    <div className="speaker-list-expertise">
                      {speaker.expertise.slice(0, 3).map((exp, i) => (
                        <span key={i} className="expertise-tag">{exp}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredSpeakers.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon"></div>
              <h3>No speakers found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Speaker Modal */}
      <AnimatePresence>
        {selectedSpeaker && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedSpeaker(null)}
          >
            <div
              className="speaker-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setSelectedSpeaker(null)}
              >
                ✕
              </button>
              
              <div className="modal-header">
                <img src={selectedSpeaker.image} alt={selectedSpeaker.name} />
                <div className="modal-header-info">
                  <h2>{selectedSpeaker.name}</h2>
                  <p className="modal-title">{selectedSpeaker.title}</p>
                  <p className="modal-org">{selectedSpeaker.organization}</p>
                  <div className="modal-meta">
                    <span>📍 {selectedSpeaker.country}</span>
                    <span>⭐ {selectedSpeaker.rating} ({selectedSpeaker.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="modal-body">
                <div className="modal-section">
                  <h3>About</h3>
                  <p>{selectedSpeaker.longBio}</p>
                </div>
                
                <div className="modal-section">
                  <h3>Expertise</h3>
                  <div className="expertise-list">
                    {selectedSpeaker.expertise.map((exp, i) => (
                      <span key={i} className="expertise-tag">{exp}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-section">
                  <h3>Sessions</h3>
                  <div className="sessions-list">
                    {selectedSpeaker.sessions.map(sessionId => {
                      const session = getSessionInfo(sessionId);
                      return session ? (
                        <div key={session.id} className="session-item">
                          <span className="session-day">{session.day}</span>
                          <span className="session-time">{session.time}</span>
                          <span className="session-title">{session.title}</span>
                          <span className="session-track">{session.track}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
                
                <div className="modal-section">
                  <h3>Languages</h3>
                  <div className="languages-list">
                    {selectedSpeaker.languages.map((lang, i) => (
                      <span key={i} className="language-tag">{lang}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-section">
                  <h3>Connect</h3>
                  <div className="social-links">
                    {selectedSpeaker.social.twitter && (
                      <a href="#" className="social-link">Twitter: {selectedSpeaker.social.twitter}</a>
                    )}
                    {selectedSpeaker.social.linkedin && (
                      <a href="#" className="social-link">LinkedIn Profile</a>
                    )}
                    {selectedSpeaker.social.website && (
                      <a href="#" className="social-link">Personal Website</a>
                    )}
                    {selectedSpeaker.social.email && (
                      <a href={`mailto:${selectedSpeaker.social.email}`} className="social-link">
                        {selectedSpeaker.social.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => toggleBookmark(selectedSpeaker.id)}
                >
                  {bookmarkedSpeakers.includes(selectedSpeaker.id) ? '❤️ Bookmarked' : '🤍 Bookmark Speaker'}
                </button>
                <button className="btn btn-secondary">Schedule Meeting</button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Interested in Speaking?</h2>
          <p>
            Join our community of thought leaders and share your expertise 
            with a global audience committed to sustainable development.
          </p>
          <div className="cta-buttons">
            <a href="/registration-abstract" className="btn btn-primary">
              Submit Abstract
            </a>
            <a href="/speaker-guidelines" className="btn btn-secondary">
              Speaker Guidelines
            </a>
          </div>
          <p className="cta-deadline"> Abstract Deadline: March 15, 2026</p>
        </div>
      </section>
    </div>
  );
};

export default SpeakersPage;