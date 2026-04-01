// pages/AboutPage.tsx
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/AboutPage.css";

// Import background images
import heroBackground from "../assets/about_us_.webp"; // Your hero background image

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("history");
  const [activeThemeTab, setActiveThemeTab] = useState(0);
  const [faqSchema, setFaqSchema] = useState({});

  // Conference themes data
  const conferenceThemes = [
    {
      id: 1,
      title: "Farmer-Managed Seed Systems in Practice",
      description:
        "This theme explores the recognition and contribution of FMSS; indigenous practices and innovation in seed conservation, selection, production and preservation, seed fairs, community seed networks and farmer-to-farmer learning and exchange mechanisms; practices and lessons from community seed banking. It also examines strengthening linkages between farmer knowledge and formal research through participatory approaches (PPB, PVS, Seed Diversity Kits), documentation, and evidence generation to inform practice and policy, as well as current status on the conservation of indigenous livestock breeds and strategies to safeguard local livestock breeds in the region.",
      keyTopics: [
        "Community Seed Banking",
        "Participatory Research Approaches",
        "Farmer-to-Farmer Learning",
        "Indigenous Livestock Conservation",
        "Seed Fairs and Exchange",
      ],
      subThemes: [
        "Indigenous practices in seed conservation",
        "Participatory Plant Breeding (PPB)",
        "Participatory Varietal Selection (PVS)",
        "Seed Diversity Kits",
        "Community seed networks",
      ],
    },
    {
      id: 2,
      title: "Seeds, Climate Change and Resilience",
      description:
        "This theme highlights the role of indigenous and local seed varieties in climate adaptation, emergency seed response and resilience building, and sustaining farmer livelihoods under changing environmental conditions. It examines how traditional seed systems contribute to agricultural resilience and food security in the face of climate variability.",
      keyTopics: [
        "Climate Adaptation Strategies",
        "Emergency Seed Response",
        "Resilient Livelihoods",
        "Indigenous Varieties",
      ],
      subThemes: [
        "Drought-tolerant varieties",
        "Climate-smart agriculture",
        "Disaster risk reduction",
        "Ecosystem-based adaptation",
      ],
    },
    {
      id: 3,
      title: "Gender Equity and Social Inclusion in Seed Initiatives",
      description:
        "This theme explores the central role of women and youth in seed conservation, selection, exchange, and leadership within FMSS, and strategies to strengthen youth and women-led seed initiatives and networks. It examines how intergenerational knowledge transfer, seed literacy, and youth innovation can secure the future of farmer-managed seed systems and seed sovereignty.",
      keyTopics: [
        "Women Leadership",
        "Youth Engagement",
        "Intergenerational Knowledge",
        "Seed Literacy",
        "Social Inclusion",
      ],
      subThemes: [
        "Women-led seed initiatives",
        "Youth innovation in agriculture",
        "Gender-responsive policies",
        "Intergenerational knowledge transfer",
        "Youth employment in seed systems",
      ],
    },
    {
      id: 4,
      title: "Market Innovations around Farmer Managed Seed Systems",
      description:
        "This theme explores farmer-led and community-based seed enterprises; opportunities and challenges in local seed markets, and how seed business models can support livelihoods while safeguarding seed sovereignty. It includes discussions on neglected and underutilized crops and their utilization, and innovative solutions for utilization of indigenous foods.",
      keyTopics: [
        "Seed Enterprises",
        "Local Seed Markets",
        "Indigenous Foods",
        "Business Models",
        "Value Addition",
      ],
      subThemes: [
        "Community-based seed enterprises",
        "Market access for indigenous seeds",
        "Neglected and underutilized species",
        "Indigenous food systems",
        "Value chain development",
      ],
    },
    {
      id: 5,
      title: "Data Sovereignty and Trends in Farmer Managed Seed Systems",
      description:
        "This theme examines the risks and threats with knowledge sharing on farmers seeds including Digital Sequencing Information (DSI), gene mapping, and genome editing. It explores strategies to ensure farmers keep power over data on their seeds and knowledge. The theme also examines changing farmer seed practices, documentation, digital tools, private sector interest, and biopiracy implications, as well as the protection of traditional knowledge and cultural significance of seeds and indigenous foods.",
      keyTopics: [
        "Digital Rights",
        "Traditional Knowledge Protection",
        "Biopiracy Prevention",
        "Data Governance",
        "Digital Sequencing Information",
      ],
      subThemes: [
        "Digital Sequencing Information (DSI)",
        "Gene mapping and genome editing",
        "Farmer data rights",
        "Digital documentation tools",
        "Protection of traditional knowledge",
      ],
    },
    {
      id: 6,
      title: "Policy Solutions and Opportunities for FMSS & Seed Sovereignty",
      description:
        "This theme reflects on legal, policy, and governance frameworks supporting farmers' seeds. It advances Farmers' Rights and Seed Sovereignty and identifies advocacy strategies to protect and advance farmers' rights at local, national, and regional levels. The theme also explores farmer's variety registration mechanisms in policy frameworks across the region including Open-Source seed systems, Organic seed systems, Dual Seed Systems, and Quality Declared Seed (QDS) systems.",
      keyTopics: [
        "Farmers' Rights",
        "Policy Frameworks",
        "Regional Advocacy",
        "Seed Registration",
        "Governance",
      ],
      subThemes: [
        "Open-Source seed systems",
        "Organic seed systems",
        "Dual Seed Systems",
        "Quality Declared Seed (QDS)",
        "Regional policy harmonization",
      ],
    },
  ];

  // Generate FAQ schema with updated themes
  useEffect(() => {
    setFaqSchema({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the history of the Eastern Africa Indigenous Seed Conference?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The conference emerged from years of advocacy by farmers, civil society organizations, and researchers. In 2024, a coalition of 15 organizations came together to envision a regional platform that would amplify farmer voices, document indigenous knowledge, and advocate for policy change.",
          },
        },
        {
          "@type": "Question",
          name: "What is the vision of EA-ISC 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We envision an Eastern Africa where indigenous seed systems are recognized, protected, and strengthened as the foundation of food sovereignty, climate resilience, and cultural continuity. Farmers' rights to save, exchange, and sell indigenous seeds are enshrined in policy and practice.",
          },
        },
        {
          "@type": "Question",
          name: "What are the core values of the conference?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our guiding principles include: Farmer-Centered approaches, Biodiversity conservation, Seed Sovereignty, and Solidarity across communities, disciplines, and sectors.",
          },
        },
        {
          "@type": "Question",
          name: "Why is seed sovereignty important for Eastern Africa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Seed sovereignty ensures climate resilience through locally-adapted varieties, nutritional diversity, farmer independence from commercial seed companies, and preservation of cultural heritage embodied in indigenous seeds.",
          },
        },
        {
          "@type": "Question",
          name: "Who should attend the Eastern Africa Indigenous Seed Conference?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The conference welcomes farmers and seed keepers, researchers, policy makers, civil society organizations, development partners, students, and youth interested in seed sovereignty and agricultural biodiversity.",
          },
        },
        {
          "@type": "Question",
          name: "What are the main themes of the conference?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The six main themes include: Farmer-Managed Seed Systems in Practice; Seeds, Climate Change and Resilience; Gender Equity and Social Inclusion; Market Innovations; Data Sovereignty and Trends; and Policy Solutions for Seed Sovereignty.",
          },
        },
        {
          "@type": "Question",
          name: "What is Farmer-Managed Seed Systems (FMSS)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Farmer-Managed Seed Systems refer to the practices where farmers save, select, exchange, and manage their own seeds, maintaining genetic diversity and adapting varieties to local conditions.",
          },
        },
        {
          "@type": "Question",
          name: "How does the conference address data sovereignty in seed systems?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The conference examines risks related to digital sequencing information, gene mapping, and genome editing, while developing strategies to ensure farmers maintain control over data related to their seeds and traditional knowledge.",
          },
        },
      ],
    });
  }, []);

  // Structured data for AboutPage
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About the 1st Eastern Africa Indigenous Seed Conference 2026",
    description:
      "Learn about the landmark gathering championing seed sovereignty and strengthening farmer-managed seed systems across Eastern Africa.",
    url: "https://eaindigenousseedsconference.org/about",
    mainEntity: {
      "@type": "Event",
      name: "1st Eastern Africa Indigenous Seed Conference 2026",
      description:
        "A four-day conference focused on seed sovereignty, farmer-managed seed systems, and policy advocacy for indigenous seed protection.",
      startDate: "2026-11-17",
      endDate: "2026-11-20",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Nairobi, Kenya",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nairobi",
          addressCountry: "KE",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Eastern Africa Indigenous Seed Council",
        url: "https://eaindigenousseedsconference.org",
        sameAs: [
          "https://twitter.com/EAISC2026",
          "https://linkedin.com/company/eaisc2026",
          "https://facebook.com/eaisc2026",
        ],
      },
      keywords:
        "indigenous seeds, seed sovereignty, farmer-managed seed systems, Eastern Africa agriculture, food security, climate resilience, agricultural biodiversity",
    },
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://eaindigenousseedsconference.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://eaindigenousseedsconference.org/about",
      },
    ],
  };

  // Organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Eastern Africa Indigenous Seed Council",
    alternateName: "EA-ISC",
    url: "https://eaindigenousseedsconference.org",
    logo: "https://eaindigenousseedsconference.org/logo.png",
    foundingDate: "2024",
    description:
      "Council dedicated to protecting and strengthening indigenous seed systems across Eastern Africa",
    sameAs: [
      "https://twitter.com/EAISC2026",
      "https://linkedin.com/company/eaisc2026",
      "https://facebook.com/eaisc2026",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254-712-451-777",
      contactType: "customer service",
      email: "info@eaindigenousseedsconference.org",
      availableLanguage: ["English", "Swahili"],
    },
  };

  // Partnership structured data
  const partnershipData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EA-ISC 2026 Organizing Partners",
    member: [
      {
        "@type": "Organization",
        name: "Eastern Africa Indigenous Seed Council (EA-ISC)",
        role: "Lead Organizer",
      },
      {
        "@type": "Organization",
        name: "African Biodiversity Network",
        role: "Supporting Partner",
      },
      {
        "@type": "Organization",
        name: "Participatory Ecological Land Use Management (PELUM) Kenya",
        role: "Coordinating Partner",
      },
      {
        "@type": "Organization",
        name: "Seed Savers Network Kenya",
        role: "Knowledge Partner",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "University of Nairobi, Department of Plant Science",
        role: "Technical Partner",
      },
    ],
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>
          About EA-ISC 2026 | 1st Eastern Africa Indigenous Seed Conference
        </title>
        <meta
          name="description"
          content="Learn about the 1st Eastern Africa Indigenous Seed Conference 2026 - a historic gathering championing seed sovereignty and strengthening farmer-managed seed systems across Eastern Africa. Discover our history, vision, values, and six comprehensive conference themes."
        />
        <meta
          name="keywords"
          content="about indigenous seed conference, Eastern Africa seed sovereignty, farmer-managed seed systems, seed advocates, agricultural biodiversity, indigenous seeds history, seed sovereignty movement, Eastern Africa agriculture conference, Nairobi seed conference 2026, FMSS, seed policy, climate resilience"
        />
        <meta name="author" content="Eastern Africa Indigenous Seed Council" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="English" />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://eaindigenousseedsconference.org/about"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://eaindigenousseedsconference.org/about"
        />
        <meta
          property="og:title"
          content="About the 1st Eastern Africa Indigenous Seed Conference 2026"
        />
        <meta
          property="og:description"
          content="Discover the story behind Eastern Africa's premier gathering on seed sovereignty. Learn about our mission to protect indigenous seed systems and strengthen farmer-managed agriculture across six comprehensive themes."
        />
        <meta
          property="og:image"
          content="https://eaindigenousseedsconference.org/images/about-og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="About the Eastern Africa Indigenous Seed Conference 2026"
        />
        <meta property="og:site_name" content="EA-ISC 2026" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@EAISC2026" />
        <meta name="twitter:creator" content="@EAISC2026" />
        <meta
          name="twitter:title"
          content="About EA-ISC 2026 | 1st Eastern Africa Indigenous Seed Conference"
        />
        <meta
          name="twitter:description"
          content="Championing seed sovereignty and strengthening farmer-managed seed systems across Eastern Africa. Join the movement in Nairobi, November 17-20, 2026."
        />
        <meta
          name="twitter:image"
          content="https://eaindigenousseedsconference.org/images/about-twitter-card.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="About the Eastern Africa Indigenous Seed Conference"
        />

        {/* Mobile Specific */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1e4a6b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </Helmet>

      {/* JSON-LD Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(aboutStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(partnershipData)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div
        className="about-page"
        itemScope
        itemType="https://schema.org/AboutPage"
      >
        <meta
          itemProp="name"
          content="About the 1st Eastern Africa Indigenous Seed Conference 2026"
        />
        <meta
          itemProp="description"
          content="Learn about the landmark gathering championing seed sovereignty and strengthening farmer-managed seed systems across Eastern Africa."
        />

        {/* 1. Compact Hero Section with Background Image */}
        <section
          className="about-hero"
          aria-label="About Hero Section"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-container">
            <nav
              className="hero-breadcrumb"
              aria-label="Breadcrumb"
              itemScope
              itemType="https://schema.org/BreadcrumbList"
            >
              <span
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <a href="/" itemProp="item" className="breadcrumb-link">
                  <span itemProp="name">Home</span>
                </a>
                <meta itemProp="position" content="1" />
              </span>
              <span aria-hidden="true">/</span>
              <span
                className="current"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <span itemProp="name">About</span>
                <meta itemProp="position" content="2" />
              </span>
            </nav>
            <div className="hero-content">
              <div className="hero-left">
                <h1 itemProp="headline">
                  1st Eastern Africa Indigenous Seed Conference 2026
                </h1>
                <p className="hero-description" itemProp="description">
                  A landmark gathering bringing together farmers, policymakers,
                  researchers, and seed advocates from across Eastern Africa to
                  champion seed sovereignty and strengthen farmer-managed seed
                  systems.
                </p>
                <div className="hero-meta">
                  <span className="hero-date">
                    <time dateTime="2026-11">November 2026</time>
                  </span>
                  <span
                    className="hero-location"
                    itemProp="location"
                    itemScope
                    itemType="https://schema.org/Place"
                  >
                    <span
                      itemProp="address"
                      itemScope
                      itemType="https://schema.org/PostalAddress"
                    >
                      <meta itemProp="addressLocality" content="Nairobi" />
                      <meta itemProp="addressCountry" content="KE" />
                      Nairobi, Kenya
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Conference Overview */}
        <section
          className="content-section pattern-dots"
          aria-labelledby="overview-heading"
        >
          <div className="container narrow">
            <h2 id="overview-heading">About the Conference</h2>
            <p className="lead-text">
              The 1st Eastern Africa Indigenous Seed Conference represents a
              historic convening of diverse stakeholders committed to preserving
              and strengthening indigenous seed systems across the region.
            </p>
            <p>
              Organized by the Eastern Africa Indigenous Seed Council (EA-ISC),
              this conference responds to the urgent need to protect
              farmer-managed seed systems that have sustained communities for
              generations. As climate change, industrial agriculture, and
              restrictive policies threaten agricultural biodiversity,
              indigenous seeds offer resilience, nutrition, and cultural
              continuity.
            </p>
            <p>
              Over four days, participants will engage in dialogue, share
              knowledge, and develop collaborative strategies to advance seed
              sovereignty. The conference aims to amplify farmer voices,
              influence policy, and strengthen networks across Eastern Africa.
            </p>
          </div>
        </section>

        {/* 3. Conference Themes - Comprehensive Section */}
        <section
          className="content-section bg-light"
          aria-labelledby="themes-heading"
        >
          <div className="container">
            <h2 id="themes-heading" className="text-center">
              Conference Themes & Tracks
            </h2>
            <p className="section-subtitle text-center">
              The conference will be organised around six thematic areas,
              guiding paper presentations, plenary discussions, panel sessions,
              posters, and exhibitions.
            </p>

            {/* Theme Tabs */}
            <div className="theme-tabs-container">
              <div
                className="theme-tabs-header"
                role="tablist"
                aria-label="Conference themes"
              >
                {conferenceThemes.map((theme, index) => (
                  <button
                    key={theme.id}
                    role="tab"
                    aria-selected={activeThemeTab === index}
                    aria-controls={`theme-${theme.id}-panel`}
                    id={`theme-${theme.id}-tab`}
                    className={`theme-tab-btn ${activeThemeTab === index ? "active" : ""}`}
                    onClick={() => setActiveThemeTab(index)}
                  >
                    <span className="theme-tab-number">0{theme.id}</span>
                    <span className="theme-tab-title">{theme.title}</span>
                  </button>
                ))}
              </div>

              <div className="theme-tabs-content">
                {conferenceThemes.map((theme, index) => (
                  <div
                    key={theme.id}
                    id={`theme-${theme.id}-panel`}
                    role="tabpanel"
                    aria-labelledby={`theme-${theme.id}-tab`}
                    className={`theme-pane ${activeThemeTab === index ? "active" : ""}`}
                    hidden={activeThemeTab !== index}
                  >
                    <div className="theme-content">
                      <div className="theme-description">
                        <h3>{theme.title}</h3>
                        <p>{theme.description}</p>
                      </div>

                      <div className="theme-details">
                        <div className="theme-key-topics">
                          <h4>Key Topics</h4>
                          <ul>
                            {theme.keyTopics.map((topic, idx) => (
                              <li key={idx}>{topic}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="theme-sub-themes">
                          <h4>Sub-Themes & Focus Areas</h4>
                          <ul>
                            {theme.subThemes.map((subTheme, idx) => (
                              <li key={idx}>{subTheme}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="theme-callout">
                        <p>
                          <strong>Call for Submissions:</strong> We invite
                          abstracts, papers, and poster presentations aligned
                          with this theme. Selected contributions will be
                          featured in the conference proceedings.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. History Tabs */}
        <section className="content-section" aria-labelledby="story-heading">
          <div className="container narrow">
            <h2 id="story-heading">Our Story</h2>
            <div
              className="tabs-container"
              itemScope
              itemType="https://schema.org/ItemList"
            >
              <div
                className="tabs-header"
                role="tablist"
                aria-label="Conference story sections"
              >
                {["history", "vision", "values"].map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    aria-controls={`${tab}-panel`}
                    id={`${tab}-tab`}
                    className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <div className="tabs-content">
                <div
                  id="history-panel"
                  role="tabpanel"
                  aria-labelledby="history-tab"
                  className={`tab-pane ${activeTab === "history" ? "active" : ""}`}
                  hidden={activeTab !== "history"}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/Article"
                >
                  {activeTab === "history" && (
                    <>
                      <h3 itemProp="headline">A Movement Takes Root</h3>
                      <div itemProp="articleBody">
                        <p>
                          The Eastern Africa Indigenous Seed Conference emerged
                          from years of advocacy by farmers, civil society
                          organizations, and researchers concerned about the
                          erosion of agricultural biodiversity. Informal
                          gatherings of seed keepers across Kenya, Uganda,
                          Tanzania, and Ethiopia revealed a shared challenge:
                          indigenous seed systems were increasingly marginalized
                          by policies favoring commercial varieties.
                        </p>
                        <p>
                          In 2024, a coalition of 15 organizations came together
                          to envision a regional platform that would amplify
                          farmer voices, document indigenous knowledge, and
                          advocate for policy change. The result is this
                          inaugural conference, designed to catalyze a movement
                          for seed sovereignty across Eastern Africa.
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <div
                  id="vision-panel"
                  role="tabpanel"
                  aria-labelledby="vision-tab"
                  className={`tab-pane ${activeTab === "vision" ? "active" : ""}`}
                  hidden={activeTab !== "vision"}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/Article"
                >
                  {activeTab === "vision" && (
                    <>
                      <h3 itemProp="headline">Our Vision</h3>
                      <div itemProp="articleBody">
                        <p>
                          We envision an Eastern Africa where indigenous seed
                          systems are recognized, protected, and strengthened as
                          the foundation of food sovereignty, climate
                          resilience, and cultural continuity. Farmers' rights
                          to save, exchange, and sell indigenous seeds are
                          enshrined in policy and practice.
                        </p>
                        <p>
                          By 2030, we aim to establish a robust regional network
                          of farmer-managed seed banks, influence seed policy
                          across at least five countries, and ensure that
                          indigenous varieties comprise a significant portion of
                          the region's cultivated agricultural biodiversity.
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <div
                  id="values-panel"
                  role="tabpanel"
                  aria-labelledby="values-tab"
                  className={`tab-pane ${activeTab === "values" ? "active" : ""}`}
                  hidden={activeTab !== "values"}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/Article"
                >
                  {activeTab === "values" && (
                    <>
                      <h3 itemProp="headline">Guiding Principles</h3>
                      <div itemProp="articleBody">
                        <p>
                          <strong>Farmer-Centered:</strong> Farmers' knowledge
                          and priorities guide all aspects of our work. We
                          recognize farmers as the primary custodians of seed
                          diversity.
                        </p>
                        <p>
                          <strong>Biodiversity:</strong> We celebrate
                          agricultural biodiversity as essential for nutrition,
                          adaptation, and resilience in the face of
                          environmental change.
                        </p>
                        <p>
                          <strong>Sovereignty:</strong> We affirm the right of
                          communities to control their seed systems free from
                          restrictive intellectual property regimes.
                        </p>
                        <p>
                          <strong>Solidarity:</strong> We build bridges across
                          communities, disciplines, and sectors, recognizing
                          that seed sovereignty requires collective action.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Why It Matters */}
        <section
          className="content-section bg-light pattern-lines"
          aria-labelledby="importance-heading"
        >
          <div className="container narrow">
            <h2 id="importance-heading">Why Seed Sovereignty Matters</h2>
            <p className="lead-text">
              Indigenous seeds are not just genetic resources—they embody
              generations of farmer knowledge, cultural identity, and adaptation
              to local conditions.
            </p>
            <div className="points-list">
              {[
                {
                  number: "01",
                  title: "Climate Resilience",
                  desc: "Indigenous varieties have adapted over centuries to local conditions, offering drought tolerance, pest resistance, and reliable yields under stress.",
                },
                {
                  number: "02",
                  title: "Nutritional Diversity",
                  desc: "Indigenous seeds provide diverse, nutrient-dense foods that industrial monocultures cannot match, contributing to food security and public health.",
                },
                {
                  number: "03",
                  title: "Farmer Independence",
                  desc: "Farmer-managed seed systems reduce dependence on commercial seed companies, keeping control in the hands of those who feed communities.",
                },
                {
                  number: "04",
                  title: "Cultural Heritage",
                  desc: "Seeds carry stories, traditions, and knowledge. Protecting indigenous seeds means protecting cultural identity and intergenerational wisdom.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="point-item"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <span className="point-number" aria-hidden="true">
                    {item.number}
                  </span>
                  <div className="point-content">
                    <h4 itemProp="name">{item.title}</h4>
                    <p itemProp="description">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Who Should Attend */}
        <section
          className="content-section paper-texture-light"
          aria-labelledby="attendees-heading"
        >
          <div className="container">
            <h2 id="attendees-heading" className="text-center">
              Who Should Attend
            </h2>
            <div className="attendees-grid">
              {[
                {
                  title: "Farmers & Seed Keepers",
                  desc: "Share knowledge, connect with peers, and strengthen farmer-managed seed systems",
                },
                {
                  title: "Researchers",
                  desc: "Present findings, learn from farmer knowledge, and identify research priorities",
                },
                {
                  title: "Policy Makers",
                  desc: "Engage with evidence and farmer perspectives to inform seed policy development",
                },
                {
                  title: "Civil Society",
                  desc: "Build alliances and develop advocacy strategies for seed sovereignty",
                },
                {
                  title: "Development Partners",
                  desc: "Understand community priorities and align support with farmer-led initiatives",
                },
                {
                  title: "Students & Youth",
                  desc: "Learn from elders, build networks, and contribute to the next generation of seed advocacy",
                },
              ].map((attendee, index) => (
                <div
                  key={index}
                  className="attendee-card"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <div className="attendee-icon" aria-hidden="true">
                    <span className="attendee-dot"></span>
                  </div>
                  <h3 itemProp="name">{attendee.title}</h3>
                  <p itemProp="description">{attendee.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CTA Section */}
        <section className="cta-section" aria-label="Call to Action">
          <div className="cta-pattern-overlay"></div>
          <div className="container">
            <h2>Join the Movement</h2>
            <p className="cta-text">
              Be part of the first gathering dedicated to seed sovereignty in
              Eastern Africa. Together, we can protect indigenous seeds for
              generations to come.
            </p>
            <div className="cta-buttons">
              <a
                href="/registration-abstract"
                className="btn btn-primary"
                aria-label="Register for the conference"
              >
                Register Now
              </a>
              <a
                href="/registration-abstract"
                className="btn btn-secondary"
                aria-label="Submit your abstract"
              >
                Submit Abstract
              </a>
            </div>
            <p className="deadline-note">
              <time dateTime="2026-10-31">
                Early registration ends October 31, 2026
              </time>
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
