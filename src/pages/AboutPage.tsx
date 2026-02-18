import { useState } from "react";
import "../styles/AboutPage.css";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("history");

  return (
    <div className="about-page">
      {/* 1. Compact Hero Section */}
      <section className="about-hero">
        <div className="hero-container">
          <div className="hero-breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span className="current">About</span>
          </div>
          <div className="hero-content">
            <div className="hero-left">
              <h1>2026 Conference</h1>
              <p className="hero-description">
                Advancing research, innovation, and global collaboration
                through interdisciplinary dialogue.
              </p>
              <div className="hero-meta">
                <span className="hero-date">November 2026</span>
                <span className="hero-location">Nairobi</span>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-stat">
                <span className="hero-stat-value">25+</span>
                <span className="hero-stat-label">Years of Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Conference Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Attendees</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">40+</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">60+</div>
              <div className="stat-label">Sessions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Speakers</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Conference Overview */}
      <section className="content-section">
        <div className="container narrow">
          <h2>Conference Overview</h2>
          <p className="lead-text">
            The 2026 International Conference brings together scholars,
            researchers, policy makers, and industry professionals to explore
            transformative ideas shaping the future of research and innovation.
          </p>
          <p>
            Designed as a platform for rigorous academic exchange and
            cross-sector collaboration, the conference fosters critical
            discussions that bridge theory and practice across multiple
            disciplines.
          </p>
        </div>
      </section>

      {/* 4. Key Themes */}
      <section className="content-section bg-light">
        <div className="container">
          <h2 className="text-center">Key Themes</h2>
          <div className="themes-grid">
            <div className="theme-card">
              <span className="theme-icon"></span>
              <h3>Scientific Innovation</h3>
              <p>Exploring breakthrough research and methodologies</p>
            </div>
            <div className="theme-card">
              <span className="theme-icon"></span>
              <h3>Global Challenges</h3>
              <p>Addressing pressing issues through collaborative solutions</p>
            </div>
            <div className="theme-card">
              <span className="theme-icon"></span>
              <h3>Future Technologies</h3>
              <p>Examining emerging technologies and their impact</p>
            </div>
            <div className="theme-card">
              <span className="theme-icon"></span>
              <h3>Cross-Disciplinary Dialogue</h3>
              <p>Fostering connections between diverse fields</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. History Tabs */}
      <section className="content-section">
        <div className="container narrow">
          <h2>Our Legacy</h2>
          <div className="tabs-container">
            <div className="tabs-header">
              <button 
                className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
                onClick={() => setActiveTab("history")}
              >
                History
              </button>
              <button 
                className={`tab-btn ${activeTab === "impact" ? "active" : ""}`}
                onClick={() => setActiveTab("impact")}
              >
                Impact
              </button>
              <button 
                className={`tab-btn ${activeTab === "evolution" ? "active" : ""}`}
                onClick={() => setActiveTab("evolution")}
              >
                Evolution
              </button>
            </div>
            <div className="tabs-content">
              {activeTab === "history" && (
                <div className="tab-pane">
                  <h3>A Tradition of Excellence</h3>
                  <p>
                    Founded in 2001, our conference has grown from a small gathering 
                    of 50 researchers to a global platform connecting thousands of 
                    minds across disciplines. Our journey reflects the changing landscape 
                    of academic collaboration and the increasing importance of 
                    interdisciplinary approaches to complex problems.
                  </p>
                  <p>
                    Over the past two decades, we've hosted Nobel laureates, 
                    groundbreaking researchers, and influential policy makers who 
                    have shaped the direction of their fields.
                  </p>
                </div>
              )}
              {activeTab === "impact" && (
                <div className="tab-pane">
                  <h3>Transformative Impact</h3>
                  <p>
                    Our conference has been the catalyst for numerous research 
                    collaborations, policy changes, and innovative projects. 
                    Participants consistently report that the connections made 
                    during our event lead to significant advancements in their work.
                  </p>
                  <p>
                    From published papers co-authored by attendees who first met 
                    at our conference to policy frameworks influenced by discussions 
                    held in our sessions, the ripple effects of our gathering extend 
                    far beyond the event itself.
                  </p>
                </div>
              )}
              {activeTab === "evolution" && (
                <div className="tab-pane">
                  <h3>Adapting to a Changing World</h3>
                  <p>
                    As the world has changed, so has our conference. We've embraced 
                    new technologies, expanded our focus to include emerging fields, 
                    and adapted our format to meet the evolving needs of the academic 
                    community.
                  </p>
                  <p>
                    The 2026 conference represents our most ambitious vision yet, 
                    with enhanced hybrid participation options, focused networking 
                    opportunities, and an emphasis on translating research into 
                    actionable solutions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Vision & Mission */}
      <section className="split-section">
        <div className="container">
          <div className="split-grid">
            <div className="split-card vision">
              <span className="card-tag">Vision</span>
              <h3>Our Vision</h3>
              <p>
                To become a leading global forum that inspires impactful
                research, drives sustainable development, and cultivates
                intellectual leadership across disciplines.
              </p>
            </div>
            <div className="split-card mission">
              <span className="card-tag">Mission</span>
              <h3>Our Mission</h3>
              <p>
                To create an inclusive environment where innovative ideas
                are presented, debated, refined, and transformed into
                actionable solutions that address global challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why It Matters */}
      <section className="content-section bg-light">
        <div className="container narrow">
          <h2>Why This Conference Matters</h2>
          <p className="lead-text">
            In an era defined by rapid technological change and complex
            global challenges, interdisciplinary collaboration is no longer
            optional — it is essential.
          </p>
          <div className="points-list">
            <div className="point-item">
              <span className="point-number">01</span>
              <div className="point-content">
                <h4>Breaking Silos</h4>
                <p>Facilitating connections between disciplines that rarely interact, creating opportunities for breakthrough insights.</p>
              </div>
            </div>
            <div className="point-item">
              <span className="point-number">02</span>
              <div className="point-content">
                <h4>Global Perspectives</h4>
                <p>Bringing diverse viewpoints together to address universal challenges through international collaboration.</p>
              </div>
            </div>
            <div className="point-item">
              <span className="point-number">03</span>
              <div className="point-content">
                <h4>Actionable Outcomes</h4>
                <p>Focusing not just on discussion but on creating concrete pathways for research implementation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Who Should Attend */}
      <section className="content-section">
        <div className="container">
          <h2 className="text-center">Who Should Attend</h2>
          <div className="attendees-grid">
            <div className="attendee-card">
              <span className="attendee-icon"></span>
              <h3>Academic Researchers</h3>
              <p>Present findings, receive feedback, and explore collaborative opportunities</p>
            </div>
            <div className="attendee-card">
              <span className="attendee-icon"></span>
              <h3>Postgraduate Students</h3>
              <p>Network with established researchers and gain exposure to cutting-edge work</p>
            </div>
            <div className="attendee-card">
              <span className="attendee-icon"></span>
              <h3>Industry Professionals</h3>
              <p>Discover emerging research and identify potential applications</p>
            </div>
            <div className="attendee-card">
              <span className="attendee-icon"></span>
              <h3>Policy Makers</h3>
              <p>Engage with evidence-based research to inform policy development</p>
            </div>
            <div className="attendee-card">
              <span className="attendee-icon"></span>
              <h3>NGO Representatives</h3>
              <p>Connect with researchers working on issues relevant to your mission</p>
            </div>
            <div className="attendee-card">
              <span className="attendee-icon"></span>
              <h3>Innovators</h3>
              <p>Explore cutting-edge research with potential for real-world application</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="content-section bg-light">
        <div className="container narrow">
          <h2 className="text-center">What Past Attendees Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "This conference consistently brings together the brightest minds across disciplines. 
                The connections I've made here have been instrumental in advancing my research."
              </p>
              <div className="testimonial-author">
                <span className="author-initials">JD</span>
                <div>
                  <p className="author-name">Dr. Jane Doe</p>
                  <p className="author-title">MIT, Physics Department</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "The interdisciplinary nature of this conference is unparalleled. 
                I've left each year with new perspectives that have fundamentally changed my approach."
              </p>
              <div className="testimonial-author">
                <span className="author-initials">RS</span>
                <div>
                  <p className="author-name">Prof. Robert Smith</p>
                  <p className="author-title">Oxford University, Medicine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Be Part of the Conversation</h2>
          <p className="cta-text">
            Join us in shaping the dialogue that will influence research,
            policy, and innovation for years to come.
          </p>
          <div className="cta-buttons">
            <a href="/registration" className="btn btn-primary">
              Register Today
            </a>
            <a href="/program" className="btn btn-secondary">
              View Program
            </a>
          </div>
          <p className="deadline-note">
            Early bird registration ends March 31, 2026
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;