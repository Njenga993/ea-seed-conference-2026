// pages/FAQPage.tsx
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import "../styles/FAQPage.css";

import heroBackground from "../assets/_MG_0937.webp";

// ── Data ─────────────────────────────────────────────────────────────────────

const categories = [
  "All",
  "Registration & Fees",
  "Farmers' Participation",
  "Abstracts & Papers",
  "Side Events",
  "Virtual Participation",
  "Presentations & Panels",
  "Organisations & Exhibition",
];

const faqs = [
  // ── Registration & Fees ────────────────────────────────────────────────────
  {
    category: "Registration & Fees",
    q: "What are the registration fees for attending the conference?",
    a: "Registration fees depend on your participation category:• Delegates (in-person): USD 200• Farmers (in-person): USD 150• Virtual participants: USD 100 Day-time meals during the conference are included in all in-person registration fees.",
  },
  {
    category: "Registration & Fees",
    q: "What registration categories are available?",
    a: "There are three registration categories: Delegates (researchers, NGO staff, government officials, private sector, and other professionals), Farmers, and Virtual Participation. Each category has its own registration fee.",
  },
  {
    category: "Registration & Fees",
    q: "What is the registration fee for staff from participating organisations?",
    a: "Staff members from participating organisations register as Delegates at the standard rate of USD 200 per person.",
  },
  {
    category: "Registration & Fees",
    q: "Is accommodation included in the registration fee?",
    a: "No. Accommodation is not included in the registration fee and must be arranged and paid for separately. Seed Savers Network, as the convening organisation, is happy to support partners in securing affordable accommodation based on their needs. A list of recommended hotels with negotiated conference rates will be shared in the coming weeks.",
  },
  {
    category: "Registration & Fees",
    q: "Are meals and local transport covered by the registration fee?",
    a: "Day-time meals during the conference are included in the in-person registration fee. Local transport to and from the venue must be arranged and covered separately by each participant.",
  },

  // ── Farmers' Participation ─────────────────────────────────────────────────
  {
    category: "Farmers' Participation",
    q: "Are farmers required to pay a registration fee?",
    a: "Yes. Farmers participate at a discounted registration fee of USD 150, which includes day-time meals during the conference.",
  },
  {
    category: "Farmers' Participation",
    q: "Are there scholarships or sponsorships available for farmers?",
    a: "Farmers benefit from a discounted registration rate of USD 150. Additionally, organisations that host a side event receive 20 free participation slots, which we strongly encourage to be allocated to farmers. Farmers selected under the side event package will also have their accommodation covered by the conveners.",
  },
  {
    category: "Farmers' Participation",
    q: "Can farmers present, speak, or join panels at the conference?",
    a: "Absolutely. The 1st Eastern Africa Indigenous Seed Conference is designed to put farmers at the centre of the conversation. Farmers are welcome and encouraged to present success stories, share indigenous knowledge, and participate as speakers, panellists, and keynote speakers.",
  },
  {
    category: "Farmers' Participation",
    q: "What forms of presentation can farmers submit?",
    a: "Farmers can submit a wide range of presentation formats — not only written abstracts. Accepted formats include videos, photographs, songs, skits, artwork, and other community-rooted forms of storytelling and knowledge sharing.",
  },
  {
    category: "Farmers' Participation",
    q: "Can organisations sponsor a farmer to attend as a presenter or panellist?",
    a: "Yes. Organisations can sponsor farmer participation by covering the USD 150 registration fee on their behalf. There is no separate application process — organisations simply register and pay for the farmers they are supporting.",
  },

  // ── Abstracts & Papers ────────────────────────────────────────────────────
  {
    category: "Abstracts & Papers",
    q: "Is there a call for abstracts and research papers?",
    a: "Yes. The conference has an open call for abstracts and full research papers. Submissions are welcome from researchers, practitioners, farmers, and community organisations working on topics related to indigenous seeds, food sovereignty, biodiversity, agroecology, and related fields.",
  },
  {
    category: "Abstracts & Papers",
    q: "What are the guidelines for submitting an abstract?",
    a: "Full submission guidelines are available on the conference website at eaindigenousseedconference.org/how-to-submit-abstract. Please review the guidelines carefully before submitting.",
  },
  {
    category: "Abstracts & Papers",
    q: "What is the deadline for abstract submissions?",
    a: "The deadline for submitting abstracts is 31st July 2026.",
  },
  {
    category: "Abstracts & Papers",
    q: "What is the deadline for full paper submissions?",
    a: "Full papers are due by 15th September 2026.",
  },
  {
    category: "Abstracts & Papers",
    q: "Will accepted abstracts be published in the conference proceedings?",
    a: "Yes. All accepted abstracts will be published in the official EA-ISC 2026 conference proceedings.",
  },
  {
    category: "Abstracts & Papers",
    q: "Is there a template for abstract or paper submissions?",
    a: "No formal template is provided at this time. Please refer to the submission guidelines on the website for formatting requirements and structure.",
  },
  {
    category: "Abstracts & Papers",
    q: "Can farmers and community practitioners submit abstracts or case studies?",
    a: "Yes. Submissions from farmers and community practitioners are warmly welcomed and encouraged. Non-traditional formats, including case studies, community knowledge documentation, and practitioner reflections, are eligible for submission.",
  },

  // ── Side Events ───────────────────────────────────────────────────────────
  {
    category: "Side Events",
    q: "Can organisations host side events during the conference?",
    a: "Yes. Organisations are invited to host side events that run alongside the main conference programme. Side events provide a dedicated space to run workshops, roundtables, launches, screenings, or network meetings.",
  },
  {
    category: "Side Events",
    q: "What is the cost of hosting a side event?",
    a: "The side event fee is USD 10,000. This covers exclusive use of a 100-seat room with full AV, live streaming, professional recording, 2 full conference passes, and a complimentary exhibition booth for all 4 conference days.",
  },
  {
    category: "Side Events",
    q: "What is included in the side event package?",
    a: "The side event package includes:• 100-seat dedicated venue• Full AV and projection equipment• Live streaming capability• Professional recording of the session• 2 full conference passes• 20 free participation slots (for farmers or partners)• Complimentary exhibition booth — all 4 conference days• Listing in the official programme and website• Promotion to all registered attendees Farmers selected to participate through the side event package will also have their accommodation covered by the conveners.",
  },
  {
    category: "Side Events",
    q: "Can two or more organisations jointly host a side event?",
    a: "Yes. Organisations are encouraged to collaborate and co-organise side events. The consortium of organising organisations decides internally how to share and contribute to the USD 10,000 fee.",
  },
  {
    category: "Side Events",
    q: "How do we apply to host a side event, and what is the deadline?",
    a: "Fill in the side event registration form at the link below. Applications are reviewed on a rolling basis — we recommend applying before 30th September 2026 to secure your preferred slot and guarantee inclusion in the printed programme.",
    link: {
      label: "Apply to Host a Side Event",
      url: "https://docs.google.com/forms/d/e/1FAIpQLSdUDLfN291bFxb4ybfMqzb1Lqvz0ywEpvO43rPr8ZbVGdHqiA/viewform",
    },
  },

  // ── Virtual Participation ─────────────────────────────────────────────────
  {
    category: "Virtual Participation",
    q: "Is virtual participation available?",
    a: "Yes. Virtual participation is available for those who cannot attend in person. Virtual attendees will have access to all conference sessions.",
  },
  {
    category: "Virtual Participation",
    q: "What is the registration fee for virtual participants?",
    a: "Virtual participation is available at USD 100.",
  },
  {
    category: "Virtual Participation",
    q: "Will virtual participants have access to all sessions?",
    a: "Yes. All plenary and thematic sessions will be accessible to virtual participants through the online platform.",
  },
  {
    category: "Virtual Participation",
    q: "Will session recordings be available after the conference?",
    a: "Yes. Recordings of all sessions will be made available after the conference concludes.",
  },

  // ── Presentations & Panels ────────────────────────────────────────────────
  {
    category: "Presentations & Panels",
    q: "What are the criteria for selecting presenters and panellists?",
    a: "Selection criteria will be published on the conference website shortly. Please check eaindigenousseedconference.org for updates.",
  },
  {
    category: "Presentations & Panels",
    q: "Can farmers present practical experiences and indigenous knowledge alongside researchers?",
    a: "Yes. The conference is deliberately designed to place farmer knowledge and lived experience alongside academic and scientific research. Farmer presenters are a central part of the programme.",
  },
  {
    category: "Presentations & Panels",
    q: "Are there farmer-led panels or discussions?",
    a: "Yes. There will be dedicated opportunities for farmer-led panels and discussions, reflecting the conference's commitment to centring farmer voices in the regional seed conversation.",
  },
  {
    category: "Presentations & Panels",
    q: "Is travel support available for selected presenters or panellists?",
    a: "No. Travel support is not available from the conference organisers. Presenters and panellists are responsible for their own travel arrangements and costs.",
  },

  // ── Organisations & Exhibition ────────────────────────────────────────────
  {
    category: "Organisations & Exhibition",
    q: "Are exhibition booths available for organisations?",
    a: "Yes. Organisations can book an exhibition booth and showcase their products, services, research, or programmes to the full conference audience across all 4 days.",
  },
  {
    category: "Organisations & Exhibition",
    q: "How much does an exhibition booth cost?",
    a: "The exhibition fee is USD 500 per booth. This covers a dedicated booth space for all 4 conference days, including a table, chairs, and access to power, plus 2 exhibitor passes with full conference access.",
  },
  {
    category: "Organisations & Exhibition",
    q: "Are there sponsorship packages available?",
    a: "Formal sponsorship packages are not available at this time. Organisations interested in deeper engagement are encouraged to consider co-organising a side event or reaching out to the team directly to discuss how to best support the conference.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  // External Google Form URL
  const GOOGLE_FORM_URL = "https://api.eaindigenousseedconference.org/";

  const filtered = faqs.filter((f) => {
    const matchesCategory =
      activeCategory === "All" || f.category === activeCategory;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      f.q.toLowerCase().includes(q) ||
      f.a.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // Group by category for display
  const grouped: Record<string, typeof faqs> = {};
  filtered.forEach((f) => {
    if (!grouped[f.category]) grouped[f.category] = [];
    grouped[f.category].push(f);
  });

  const toggle = (globalIndex: number) => {
    setOpenIndex((prev) => (prev === globalIndex ? null : globalIndex));
  };

  // Global index across all faqs for stable open/close
  const getGlobalIndex = (faq: (typeof faqs)[0]) => faqs.indexOf(faq);

  // UPDATED: Handle register click to open Google Form in new tab
  const handleRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(GOOGLE_FORM_URL, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | EA-ISC 2026</title>
        <meta
          name="description"
          content="Answers to common questions about the 1st Eastern Africa Indigenous Seed Conference 2026 — registration fees, farmer participation, abstract submission, side events, virtual access, and more."
        />
        <link
          rel="canonical"
          href="https://eaindigenousseedconference.org/faq"
        />
        <meta property="og:title" content="FAQ | EA-ISC 2026" />
        <meta
          property="og:description"
          content="Everything you need to know about attending, presenting, or exhibiting at EA-ISC 2026 in Nairobi, Kenya."
        />
        <meta
          property="og:url"
          content="https://eaindigenousseedconference.org/faq"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="faq-page">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          className="faq-hero"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="hero-overlay" />
          <div className="hero-container">
            <nav className="hero-breadcrumb" aria-label="Breadcrumb">
              <a href="/" className="breadcrumb-link">Home</a>
              <span aria-hidden="true">/</span>
              <span className="current">FAQs</span>
            </nav>

            <div className="hero-content">
              <div className="hero-eyebrow">
                EA-ISC 2026 · Catholic University of Eastern Africa, Nairobi, Kenya
              </div>
              <h1>Frequently Asked Questions</h1>
              <p className="hero-description">
                Everything you need to know about attending, presenting, exhibiting,
                or hosting a side event at the 1st Eastern Africa Indigenous Seed
                Conference — 17th to 20th November 2026, Nairobi, Kenya.
              </p>

              {/* Search bar in hero */}
              <div className="hero-search-wrap">
                <label htmlFor="faq-search" className="visually-hidden">
                  Search questions
                </label>
                <div className="hero-search-inner">
                  <span className="search-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.7" />
                      <path d="M12 12l3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                  </span>
                  <input
                    id="faq-search"
                    type="text"
                    className="hero-search-input"
                    placeholder="Search questions…"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setOpenIndex(null);
                      if (e.target.value) setActiveCategory("All");
                    }}
                    autoComplete="off"
                  />
                  {search && (
                    <button
                      className="search-clear"
                      onClick={() => setSearch("")}
                      aria-label="Clear search"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>

              <div className="hero-meta-badges">
                <span className="meta-badge">Nov 17–20, 2026</span>
                <span className="meta-badge">Nairobi, Kenya</span>
                <span className="meta-badge">{faqs.length} Questions Answered</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Main content ──────────────────────────────────────────────── */}
        <section className="faq-main">
          <div className="faq-container">

            {/* Category filter tabs */}
            <div className="category-tabs" role="tablist" aria-label="FAQ categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`cat-tab ${activeCategory === cat ? "cat-tab-active" : ""}`}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenIndex(null);
                    setSearch("");
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results summary */}
            {search && (
              <p className="search-summary">
                {filtered.length === 0
                  ? `No results for "${search}"`
                  : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${search}"`}
              </p>
            )}

            {/* FAQ accordion — grouped by category */}
            {filtered.length === 0 ? (
              <div className="no-results">
                <p>No questions match your search. Try different keywords or browse a category above.</p>
                <button
                  className="btn-reset"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="faq-groups">
                {Object.entries(grouped).map(([category, items]) => (
                  <div className="faq-group" key={category}>
                    {/* Group heading — only show when "All" or search is active */}
                    {(activeCategory === "All" || search) && (
                      <h2 className="group-heading">{category}</h2>
                    )}

                    <div className="accordion">
                      {items.map((faq) => {
                        const idx = getGlobalIndex(faq);
                        const isOpen = openIndex === idx;
                        return (
                          <div
                            key={idx}
                            className={`accordion-item ${isOpen ? "accordion-item-open" : ""}`}
                          >
                            <button
                              className="accordion-trigger"
                              onClick={() => toggle(idx)}
                              aria-expanded={isOpen}
                            >
                              <span className="accordion-q">{faq.q}</span>
                              <span
                                className="accordion-icon"
                                aria-hidden="true"
                              >
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  style={{
                                    transform: isOpen
                                      ? "rotate(180deg)"
                                      : "rotate(0deg)",
                                    transition: "transform 0.25s ease",
                                  }}
                                >
                                  <path
                                    d="M4 6.5l5 5 5-5"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </button>

                            {isOpen && (
                              <div className="accordion-body">
                                {faq.a.split("\n").map((line, i) =>
                                  line.trim() === "" ? null : line.startsWith("•") ? (
                                    <ul key={i} className="faq-bullet-list">
                                      {faq.a
                                        .split("\n")
                                        .filter((l) => l.startsWith("•"))
                                        .map((l, j) => (
                                          <li key={j}>{l.replace("•", "").trim()}</li>
                                        ))}
                                    </ul>
                                  ) : !line.startsWith("•") &&
                                    !faq.a
                                      .split("\n")
                                      .filter((l) => l.startsWith("•"))
                                      .includes(line) ? (
                                    <p key={i}>{line}</p>
                                  ) : null
                                )}
                                {faq.link && (
                                  <a
                                    href={faq.link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="faq-link-btn"
                                  >
                                    {faq.link.label}
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 6 }}>
                                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </a>
                                )}
                                <div className="accordion-category-tag">
                                  {faq.category}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Still have questions */}
            <div className="still-questions">
              <h3>Still have a question?</h3>
              <p>
                Can't find what you're looking for? Reach out to the conference
                team directly and we'll get back to you.
              </p>
              <a
                href="mailto:info@eaindigenousseedconference.org"
                className="btn-contact"
              >
                Email the Conference Team
              </a>
            </div>

          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="cta-section">
          <div className="cta-pattern-overlay" />
          <div className="cta-inner">
            <h2>Ready to Join EA-ISC 2026?</h2>
            <p className="cta-text">
              Register now to secure your place at the 1st Eastern Africa
              Indigenous Seed Conference — and be part of a landmark gathering
              for seed sovereignty across the region.
            </p>
            <div className="cta-buttons">
              <button 
                className="btn btn-primary btn-cta-large"
                onClick={handleRegister}
                aria-label="Register for the conference"
              >
                Register Now
              </button>
              <a href="/call-for-exhibitors" className="btn btn-secondary">
                Book an Exhibition Booth
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default FAQPage;