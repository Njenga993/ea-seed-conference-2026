// pages/AboutPage.tsx
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
              <h1>1st Eastern Africa Indigenous Seed Conference 2026</h1>
              <p className="hero-description">
                A landmark gathering bringing together farmers, policymakers, researchers, 
                and seed advocates from across Eastern Africa to champion seed sovereignty 
                and strengthen farmer-managed seed systems.
              </p>
              <div className="hero-meta">
                <span className="hero-date">November 2026</span>
                <span className="hero-location">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Conference Overview */}
      <section className="content-section">
        <div className="container narrow">
          <h2>About the Conference</h2>
          <p className="lead-text">
            The 1st Eastern Africa Indigenous Seed Conference represents a historic 
            convening of diverse stakeholders committed to preserving and strengthening 
            indigenous seed systems across the region.
          </p>
          <p>
            Organized by the Eastern Africa Indigenous Seed Council (EA-ISC), this conference 
            responds to the urgent need to protect farmer-managed seed systems that have 
            sustained communities for generations. As climate change, industrial agriculture, 
            and restrictive policies threaten agricultural biodiversity, indigenous seeds 
            offer resilience, nutrition, and cultural continuity.
          </p>
          <p>
            Over four days, participants will engage in dialogue, share knowledge, and 
            develop collaborative strategies to advance seed sovereignty. The conference 
            aims to amplify farmer voices, influence policy, and strengthen networks 
            across Eastern Africa.
          </p>
        </div>
      </section>

      {/* 3. Key Themes */}
      <section className="content-section bg-light">
        <div className="container">
          <h2 className="text-center">Conference Themes</h2>
          <div className="themes-grid">
            <div className="theme-card">
              <div className="theme-icon">
                <span className="theme-dot"></span>
              </div>
              <h3>Seed Sovereignty</h3>
              <p>Exploring the right of farmers to save, exchange, and sell indigenous seeds</p>
            </div>
            <div className="theme-card">
              <div className="theme-icon">
                <span className="theme-dot"></span>
              </div>
              <h3>Farmer-Managed Systems</h3>
              <p>Strengthening community-based seed conservation and multiplication</p>
            </div>
            <div className="theme-card">
              <div className="theme-icon">
                <span className="theme-dot"></span>
              </div>
              <h3>Climate Resilience</h3>
              <p>Leveraging indigenous seeds for adaptation to climate variability</p>
            </div>
            <div className="theme-card">
              <div className="theme-icon">
                <span className="theme-dot"></span>
              </div>
              <h3>Policy Advocacy</h3>
              <p>Advancing policies that protect and promote indigenous seed systems</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. History Tabs */}
      <section className="content-section">
        <div className="container narrow">
          <h2>Our Story</h2>
          <div className="tabs-container">
            <div className="tabs-header">
              <button 
                className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
                onClick={() => setActiveTab("history")}
              >
                History
              </button>
              <button 
                className={`tab-btn ${activeTab === "vision" ? "active" : ""}`}
                onClick={() => setActiveTab("vision")}
              >
                Vision
              </button>
              <button 
                className={`tab-btn ${activeTab === "values" ? "active" : ""}`}
                onClick={() => setActiveTab("values")}
              >
                Values
              </button>
            </div>
            <div className="tabs-content">
              {activeTab === "history" && (
                <div className="tab-pane">
                  <h3>A Movement Takes Root</h3>
                  <p>
                    The Eastern Africa Indigenous Seed Conference emerged from years of advocacy 
                    by farmers, civil society organizations, and researchers concerned about the 
                    erosion of agricultural biodiversity. Informal gatherings of seed keepers 
                    across Kenya, Uganda, Tanzania, and Ethiopia revealed a shared challenge: 
                    indigenous seed systems were increasingly marginalized by policies favoring 
                    commercial varieties.
                  </p>
                  <p>
                    In 2024, a coalition of 15 organizations came together to envision a regional 
                    platform that would amplify farmer voices, document indigenous knowledge, and 
                    advocate for policy change. The result is this inaugural conference, designed 
                    to catalyze a movement for seed sovereignty across Eastern Africa.
                  </p>
                </div>
              )}
              {activeTab === "vision" && (
                <div className="tab-pane">
                  <h3>Our Vision</h3>
                  <p>
                    We envision an Eastern Africa where indigenous seed systems are recognized, 
                    protected, and strengthened as the foundation of food sovereignty, climate 
                    resilience, and cultural continuity. Farmers' rights to save, exchange, and 
                    sell indigenous seeds are enshrined in policy and practice.
                  </p>
                  <p>
                    By 2030, we aim to establish a robust regional network of farmer-managed 
                    seed banks, influence seed policy across at least five countries, and ensure 
                    that indigenous varieties comprise a significant portion of the region's 
                    cultivated agricultural biodiversity.
                  </p>
                </div>
              )}
              {activeTab === "values" && (
                <div className="tab-pane">
                  <h3>Guiding Principles</h3>
                  <p>
                    <strong>Farmer-Centered:</strong> Farmers' knowledge and priorities guide all aspects 
                    of our work. We recognize farmers as the primary custodians of seed diversity.
                  </p>
                  <p>
                    <strong>Biodiversity:</strong> We celebrate agricultural biodiversity as essential for 
                    nutrition, adaptation, and resilience in the face of environmental change.
                  </p>
                  <p>
                    <strong>Sovereignty:</strong> We affirm the right of communities to control their seed 
                    systems free from restrictive intellectual property regimes.
                  </p>
                  <p>
                    <strong>Solidarity:</strong> We build bridges across communities, disciplines, and 
                    sectors, recognizing that seed sovereignty requires collective action.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why It Matters */}
      <section className="content-section bg-light">
        <div className="container narrow">
          <h2>Why Seed Sovereignty Matters</h2>
          <p className="lead-text">
            Indigenous seeds are not just genetic resources—they embody generations of 
            farmer knowledge, cultural identity, and adaptation to local conditions.
          </p>
          <div className="points-list">
            <div className="point-item">
              <span className="point-number">01</span>
              <div className="point-content">
                <h4>Climate Resilience</h4>
                <p>Indigenous varieties have adapted over centuries to local conditions, offering drought tolerance, pest resistance, and reliable yields under stress.</p>
              </div>
            </div>
            <div className="point-item">
              <span className="point-number">02</span>
              <div className="point-content">
                <h4>Nutritional Diversity</h4>
                <p>Indigenous seeds provide diverse, nutrient-dense foods that industrial monocultures cannot match, contributing to food security and public health.</p>
              </div>
            </div>
            <div className="point-item">
              <span className="point-number">03</span>
              <div className="point-content">
                <h4>Farmer Independence</h4>
                <p>Farmer-managed seed systems reduce dependence on commercial seed companies, keeping control in the hands of those who feed communities.</p>
              </div>
            </div>
            <div className="point-item">
              <span className="point-number">04</span>
              <div className="point-content">
                <h4>Cultural Heritage</h4>
                <p>Seeds carry stories, traditions, and knowledge. Protecting indigenous seeds means protecting cultural identity and intergenerational wisdom.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Who Should Attend */}
      <section className="content-section">
        <div className="container">
          <h2 className="text-center">Who Should Attend</h2>
          <div className="attendees-grid">
            <div className="attendee-card">
              <div className="attendee-icon">
                <span className="attendee-dot"></span>
              </div>
              <h3>Farmers & Seed Keepers</h3>
              <p>Share knowledge, connect with peers, and strengthen farmer-managed seed systems</p>
            </div>
            <div className="attendee-card">
              <div className="attendee-icon">
                <span className="attendee-dot"></span>
              </div>
              <h3>Researchers</h3>
              <p>Present findings, learn from farmer knowledge, and identify research priorities</p>
            </div>
            <div className="attendee-card">
              <div className="attendee-icon">
                <span className="attendee-dot"></span>
              </div>
              <h3>Policy Makers</h3>
              <p>Engage with evidence and farmer perspectives to inform seed policy development</p>
            </div>
            <div className="attendee-card">
              <div className="attendee-icon">
                <span className="attendee-dot"></span>
              </div>
              <h3>Civil Society</h3>
              <p>Build alliances and develop advocacy strategies for seed sovereignty</p>
            </div>
            <div className="attendee-card">
              <div className="attendee-icon">
                <span className="attendee-dot"></span>
              </div>
              <h3>Development Partners</h3>
              <p>Understand community priorities and align support with farmer-led initiatives</p>
            </div>
            <div className="attendee-card">
              <div className="attendee-icon">
                <span className="attendee-dot"></span>
              </div>
              <h3>Students & Youth</h3>
              <p>Learn from elders, build networks, and contribute to the next generation of seed advocacy</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Organizing Partners */}
      <section className="content-section bg-light">
        <div className="container narrow">
          <h2 className="text-center">Organizing Partners</h2>
          <div className="partners-list">
            <div className="partner-item">
              <span className="partner-dot"></span>
              <div className="partner-content">
                <h4>Eastern Africa Indigenous Seed Council (EA-ISC)</h4>
                <p>Lead organizer and convener of the conference</p>
              </div>
            </div>
            <div className="partner-item">
              <span className="partner-dot"></span>
              <div className="partner-content">
                <h4>African Biodiversity Network</h4>
                <p>Supporting farmer engagement and knowledge sharing</p>
              </div>
            </div>
            <div className="partner-item">
              <span className="partner-dot"></span>
              <div className="partner-content">
                <h4>Participatory Ecological Land Use Management (PELUM) Kenya</h4>
                <p>Coordinating farmer participation and field visits</p>
              </div>
            </div>
            <div className="partner-item">
              <span className="partner-dot"></span>
              <div className="partner-content">
                <h4>Seed Savers Network Kenya</h4>
                <p>Documenting indigenous seed knowledge and practices</p>
              </div>
            </div>
            <div className="partner-item">
              <span className="partner-dot"></span>
              <div className="partner-content">
                <h4>University of Nairobi, Department of Plant Science</h4>
                <p>Providing technical and research support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>Join the Movement</h2>
          <p className="cta-text">
            Be part of the first gathering dedicated to seed sovereignty in Eastern Africa. 
            Together, we can protect indigenous seeds for generations to come.
          </p>
          <div className="cta-buttons">
            <a href="/registration" className="btn btn-primary">
              Register Now
            </a>
            <a href="/abstract-submission" className="btn btn-secondary">
              Submit Abstract
            </a>
          </div>
          <p className="deadline-note">
            Early registration ends October 31, 2026
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;