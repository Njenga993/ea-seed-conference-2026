import { Helmet } from "react-helmet-async";
import "../styles/Sponsorship.css";

// Import background image
import heroBackground from "../assets/_MG_0937.webp";

const Sponsorship = () => {
  // Sponsorship packages
  const packages = [
    {
      tier: "Platinum",
      price: "$25,000 USD",
      badge: "Limited to 3",
      color: "#1a472a",
      benefits: [
        "Premium logo placement on all conference materials (website, program, banners)",
        "15-minute keynote speaking slot in main plenary",
        "Full-page advertisement in conference program",
        "Exclusive branded lounge with signage",
        "20 complimentary registrations",
        "VIP networking dinner with 4 seats",
        "Logo on attendee lanyards and conference bags",
        "Dedicated social media promotion (5 posts)",
        "Post-conference attendee list (opt-in)",
        "Recognition in opening and closing ceremonies",
        "Priority exhibition booth placement (prime location)",
        "Video testimonial featured on conference website",
      ],
    },
    {
      tier: "Gold",
      price: "$15,000 USD",
      badge: "Limited to 5",
      color: "#c17b3c",
      benefits: [
        "Prominent logo placement on conference materials",
        "10-minute speaking slot in breakout session",
        "Half-page advertisement in conference program",
        "12 complimentary registrations",
        "VIP networking dinner with 2 seats",
        "Logo on conference bags",
        "Dedicated social media promotion (3 posts)",
        "Post-conference attendee list (opt-in)",
        "Recognition in opening ceremony",
        "Standard exhibition booth",
      ],
    },
    {
      tier: "Silver",
      price: "$10,000 USD",
      badge: "Limited to 8",
      color: "#7f8c8d",
      benefits: [
        "Logo placement on conference website and program",
        "Quarter-page advertisement in conference program",
        "8 complimentary registrations",
        "Networking dinner with 1 seat",
        "Social media promotion (2 posts)",
        "Post-conference attendee list (opt-in)",
        "Standard exhibition booth",
        "Name recognition in conference materials",
      ],
    },
    {
      tier: "Bronze",
      price: "$5,000 USD",
      badge: "Open",
      color: "#cd7f32",
      benefits: [
        "Logo placement on conference website",
        "6 complimentary registrations",
        "Social media promotion (1 post)",
        "Name recognition in conference program",
        "Standard exhibition booth",
      ],
    },
  ];

  // Additional sponsorship opportunities
  const additionalOpportunities = [
    {
      title: "Gala Dinner Sponsor",
      price: "$8,000 USD",
      description:
        "Sponsor the official conference gala dinner, including branding at the venue, speaking remarks, and recognition during the event.",
      benefits: [
        "Exclusive naming rights for the gala dinner",
        "5-minute speaking remarks",
        "Logo on all gala dinner materials",
        "Dedicated social media promotion",
        "8 complimentary tickets to the gala",
      ],
    },
    {
      title: "Coffee Break Sponsor",
      price: "$3,500 USD",
      description:
        "Sponsor daily coffee breaks with branded napkins and signage at refreshment stations.",
      benefits: [
        "Signage at all coffee break stations",
        "Logo on refreshment napkins",
        "Recognition in conference program",
        "Social media acknowledgment",
        "2 complimentary registrations",
      ],
    },
    {
      title: "Conference Bag Sponsor",
      price: "$5,000 USD",
      description:
        "Provide branded conference bags distributed to all attendees.",
      benefits: [
        "Logo on all conference bags",
        "Insert material (flyer/brochure) in each bag",
        "Recognition in conference program",
        "Social media promotion",
        "4 complimentary registrations",
      ],
    },
    {
      title: "Lanyard & Badge Sponsor",
      price: "$4,000 USD",
      description:
        "Sponsor attendee lanyards and badges with prominent branding.",
      benefits: [
        "Logo on all attendee lanyards",
        "Logo on all name badges",
        "Recognition in conference program",
        "Social media acknowledgment",
        "4 complimentary registrations",
      ],
    },
    {
      title: "Wi-Fi Sponsor",
      price: "$3,000 USD",
      description: "Sponsor conference Wi-Fi with branded login portal page.",
      benefits: [
        "Branded Wi-Fi login page",
        "Logo on all conference materials",
        "Social media acknowledgment",
        "2 complimentary registrations",
      ],
    },
    {
      title: "In-Kind Sponsor",
      price: "Custom",
      description:
        "Contribute goods or services (catering, printing, AV equipment, etc.) in exchange for sponsorship benefits.",
      benefits: [
        "Custom sponsorship package based on contribution value",
        "Logo placement on conference materials",
        "Recognition in program",
        "Complimentary registrations based on value",
      ],
    },
  ];

  // Why sponsor section
  const whySponsor = [
    {
      icon: "",
      title: "Network with Decision Makers",
      description:
        "Connect with over 500+ attendees including policymakers, researchers, farmers' organizations, and development partners from across Eastern Africa.",
    },
    {
      icon: "",
      title: "Global Visibility",
      description:
        "Showcase your brand to an international audience committed to seed sovereignty, agrobiodiversity, and sustainable agriculture.",
    },
    {
      icon: "",
      title: "Thought Leadership",
      description:
        "Position your organization as a leader in indigenous seed systems and agricultural development.",
    },
    {
      icon: "",
      title: "Partnership Opportunities",
      description:
        "Forge new partnerships with like-minded organizations and stakeholders in the seed sector.",
    },
    {
      icon: "",
      title: "Market Exposure",
      description:
        "Reach key market players and potential clients in the agricultural development space.",
    },
    {
      icon: "",
      title: "CSR Impact",
      description:
        "Demonstrate commitment to sustainable development and indigenous knowledge preservation.",
    },
  ];

  // Sponsorship benefits matrix
  const benefitMatrix = [
    {
      benefit: "Logo on Conference Website",
      platinum: true,
      gold: true,
      silver: true,
      bronze: true,
    },
    {
      benefit: "Logo in Conference Program",
      platinum: true,
      gold: true,
      silver: true,
      bronze: false,
    },
    {
      benefit: "Logo on Conference Banners",
      platinum: true,
      gold: true,
      silver: false,
      bronze: false,
    },
    {
      benefit: "Speaking Opportunity",
      platinum: "Keynote (15 min)",
      gold: "Breakout (10 min)",
      silver: false,
      bronze: false,
    },
    {
      benefit: "Advertisement in Program",
      platinum: "Full Page",
      gold: "Half Page",
      silver: "Quarter Page",
      bronze: false,
    },
    {
      benefit: "Complimentary Registrations",
      platinum: "20",
      gold: "12",
      silver: "8",
      bronze: "6",
    },
    {
      benefit: "Exhibition Booth",
      platinum: "Premium",
      gold: "Standard",
      silver: "Standard",
      bronze: "Standard",
    },
    {
      benefit: "Social Media Promotion",
      platinum: "5 posts",
      gold: "3 posts",
      silver: "2 posts",
      bronze: "1 post",
    },
    {
      benefit: "VIP Networking Dinner",
      platinum: "4 seats",
      gold: "2 seats",
      silver: "1 seat",
      bronze: false,
    },
    {
      benefit: "Post-Conference Attendee List",
      platinum: true,
      gold: true,
      silver: true,
      bronze: false,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Sponsorship Opportunities | EA-ISC 2026</title>
        <meta
          name="description"
          content="Become a sponsor of the 1st Eastern Africa Indigenous Seed Conference 2026. Choose from Platinum, Gold, Silver, or Bronze packages and gain visibility among key stakeholders in seed sovereignty."
        />
        <meta
          name="keywords"
          content="sponsorship, conference sponsor, seed conference sponsor, EA-ISC sponsorship, platinum sponsor, gold sponsor"
        />
        <link
          rel="canonical"
          href="https://eaindigenousseedsconference.org/sponsorship"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Sponsorship Opportunities | EA-ISC 2026"
        />
        <meta
          property="og:description"
          content="Support the 1st Eastern Africa Indigenous Seed Conference and gain visibility among key stakeholders in seed sovereignty and agricultural development."
        />
        <meta
          property="og:url"
          content="https://eaindigenousseedsconference.org/sponsorship"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Sponsorship Opportunities | EA-ISC 2026"
        />
        <meta
          name="twitter:description"
          content="Support the 1st Eastern Africa Indigenous Seed Conference 2026 through sponsorship."
        />
      </Helmet>

      <div className="sponsorship-page">
        {/* Hero Section */}
        <section
          className="sponsorship-hero"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="sponsorship-hero-overlay"></div>
          <div className="sponsorship-hero-container">
            <nav
              className="sponsorship-hero-breadcrumb"
              aria-label="Breadcrumb"
            >
              <a href="/" className="sponsorship-breadcrumb-link">
                Home
              </a>
              <span aria-hidden="true">/</span>
              <span className="sponsorship-current">Sponsorship</span>
            </nav>
            <div className="sponsorship-hero-content">
              <h1>Sponsorship Opportunities</h1>
              <p className="sponsorship-hero-description">
                Partner with us to advance seed sovereignty and indigenous
                knowledge across Eastern Africa. Choose from flexible
                sponsorship packages tailored to your organization's goals.
              </p>
              <div className="sponsorship-hero-meta">
                <span className="sponsorship-deadline-badge">
                  Sponsorship Deadline: <strong>October 15, 2026</strong>
                </span>
                <a href="#sponsorship-contact" className="sponsorship-btn-hero">
                  Become a Sponsor
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why Sponsor Section */}
        <section className="sponsorship-content-section">
          <div className="sponsorship-container">
            <h2 className="sponsorship-text-center">
              Why Sponsor EA-ISC 2026?
            </h2>
            <p className="sponsorship-section-subtitle sponsorship-text-center">
              Join the premier gathering of seed sector stakeholders in Eastern
              Africa and position your organization at the forefront of seed
              sovereignty discussions.
            </p>
            <div className="sponsorship-why-sponsor-grid">
              {whySponsor.map((item, index) => (
                <div key={index} className="sponsorship-why-sponsor-card">
                  <div className="sponsorship-why-sponsor-icon">
                    {item.icon}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsorship Packages */}
        <section className="sponsorship-content-section sponsorship-bg-light">
          <div className="sponsorship-container">
            <h2 className="sponsorship-text-center">Sponsorship Packages</h2>
            <p className="sponsorship-section-subtitle sponsorship-text-center">
              Choose the package that best aligns with your organization's goals
              and budget.
            </p>
            <div className="sponsorship-packages-grid">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`sponsorship-package-card sponsorship-package-${pkg.tier.toLowerCase()}`}
                >
                  <div className="sponsorship-package-header">
                    <h3>{pkg.tier}</h3>
                    <div className="sponsorship-package-price">{pkg.price}</div>
                    <span className="sponsorship-package-badge">
                      {pkg.badge}
                    </span>
                  </div>
                  <div className="sponsorship-package-body">
                    <ul className="sponsorship-package-benefits">
                      {pkg.benefits.map((benefit, idx) => (
                        <li key={idx}>
                          <span className="sponsorship-check">✓</span> {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="sponsorship-package-footer">
                    <a
                      href="#sponsorship-contact"
                      className="sponsorship-btn-package"
                    >
                      Inquire Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Comparison Matrix */}
        <section className="sponsorship-content-section">
          <div className="sponsorship-container">
            <h2 className="sponsorship-text-center">Benefits at a Glance</h2>
            <p className="sponsorship-section-subtitle sponsorship-text-center">
              Compare sponsorship benefits across all tiers
            </p>
            <div className="sponsorship-matrix-wrapper">
              <table className="sponsorship-benefits-matrix">
                <thead>
                  <tr>
                    <th>Benefit</th>
                    <th>Platinum</th>
                    <th>Gold</th>
                    <th>Silver</th>
                    <th>Bronze</th>
                  </tr>
                </thead>
                <tbody>
                  {benefitMatrix.map((row, index) => (
                    <tr key={index}>
                      <td className="sponsorship-benefit-name">
                        {row.benefit}
                      </td>
                      <td className="sponsorship-benefit-value sponsorship-platinum">
                        {row.platinum === true
                          ? "✓"
                          : row.platinum === false
                            ? "—"
                            : row.platinum}
                      </td>
                      <td className="sponsorship-benefit-value sponsorship-gold">
                        {row.gold === true
                          ? "✓"
                          : row.gold === false
                            ? "—"
                            : row.gold}
                      </td>
                      <td className="sponsorship-benefit-value sponsorship-silver">
                        {row.silver === true
                          ? "✓"
                          : row.silver === false
                            ? "—"
                            : row.silver}
                      </td>
                      <td className="sponsorship-benefit-value sponsorship-bronze">
                        {row.bronze === true
                          ? "✓"
                          : row.bronze === false
                            ? "—"
                            : row.bronze}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Additional Opportunities */}
        <section className="sponsorship-content-section sponsorship-bg-light">
          <div className="sponsorship-container">
            <h2 className="sponsorship-text-center">
              Additional Sponsorship Opportunities
            </h2>
            <p className="sponsorship-section-subtitle sponsorship-text-center">
              Customize your sponsorship with these add-on opportunities
            </p>
            <div className="sponsorship-opportunities-grid">
              {additionalOpportunities.map((opp, index) => (
                <div key={index} className="sponsorship-opportunity-card">
                  <h3>{opp.title}</h3>
                  <div className="sponsorship-opportunity-price">
                    {opp.price}
                  </div>
                  <p className="sponsorship-opportunity-description">
                    {opp.description}
                  </p>
                  <ul className="sponsorship-opportunity-benefits">
                    {opp.benefits.map((benefit, idx) => (
                      <li key={idx}>
                        <span className="sponsorship-check">✓</span> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="sponsorship-content-section">
          <div className="sponsorship-container">
            <h2 className="sponsorship-text-center">What Our Sponsors Say</h2>
            <div className="sponsorship-testimonials-grid">
              <div className="sponsorship-testimonial-card">
                <div className="sponsorship-testimonial-quote">"</div>
                <p className="sponsorship-testimonial-text">
                  Sponsoring this conference gave us unprecedented access to key
                  stakeholders in the seed sector. The visibility and networking
                  opportunities exceeded our expectations.
                </p>
                <div className="sponsorship-testimonial-author">
                  <strong>Mwangi</strong>
                  <span>Director</span>
                </div>
              </div>
              <div className="sponsorship-testimonial-card">
                <div className="sponsorship-testimonial-quote">"</div>
                <p className="sponsorship-testimonial-text">
                  The conference provided an excellent platform to showcase our
                  commitment to sustainable agriculture. Highly recommended for
                  organizations serious about seed sovereignty.
                </p>
                <div className="sponsorship-testimonial-author">
                  <strong>Omondi</strong>
                  <span>Director</span>
                </div>
              </div>
              <div className="sponsorship-testimonial-card">
                <div className="sponsorship-testimonial-quote">"</div>
                <p className="sponsorship-testimonial-text">
                  As a first-time sponsor, we were impressed by the
                  professionalism and reach of this event. The ROI has been
                  tremendous for our organization.
                </p>
                <div className="sponsorship-testimonial-author">
                  <strong>Sarah</strong>
                  <span>Partnerships Lead</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="sponsorship-contact"
          className="sponsorship-contact-section"
        >
          <div className="sponsorship-container">
            <div className="sponsorship-contact-box">
              <h2 className="sponsorship-text-center">
                Ready to Become a Sponsor?
              </h2>
              <p className="sponsorship-contact-text">
                Contact our sponsorship team to discuss customized packages,
                invoice requests, or any questions about sponsorship
                opportunities.
              </p>
              <div className="sponsorship-contact-details">
                <div className="sponsorship-contact-item">
                  <span className="sponsorship-contact-label">Email:</span>
                  <a
                    href="mailto:sponsorship@eaindigenousseedsconference.org"
                    className="sponsorship-contact-value"
                  >
                    sponsorship@eaindigenousseedsconference.org
                  </a>
                </div>
                <div className="sponsorship-contact-item">
                  <span className="sponsorship-contact-label">Phone:</span>
                  <a
                    href="tel:+254123456789"
                    className="sponsorship-contact-value"
                  >
                    +254 12 451 777
                  </a>
                </div>
                <div className="sponsorship-contact-item">
                  <span className="sponsorship-contact-label">
                    Response Time:
                  </span>
                  <span className="sponsorship-contact-value">
                    Within 24 hours
                  </span>
                </div>
              </div>
              <div className="sponsorship-contact-buttons">
                <a
                  href="mailto:sponsorship@eaindigenousseedsconference.org?subject=Sponsorship%20Inquiry%20-%20EA-ISC%202026"
                  className="sponsorship-btn-primary-large"
                >
                  Send Inquiry
                </a>
                <a href="/contact" className="sponsorship-btn-secondary-large">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Sponsorship;
