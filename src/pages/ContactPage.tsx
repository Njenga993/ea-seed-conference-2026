// pages/ContactPage.tsx
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import Venue from "../components/Venue";
import "../styles/contactPage.css";

// Import background image
import heroBackground from "../assets/contact.webp";

// Declare global gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const ContactPage = () => {
  // Generate FAQ structured data for contact page
  const contactFaqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can I contact the Eastern Africa Indigenous Seed Conference organizers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact the EA-ISC 2026 team via email at info@eaindigenousseedsconference.org, phone at +254 712 451 777. Our office is located in Nairobi, Kenya, and we respond to inquiries within 2-4 hours during business hours.",
        },
      },
      {
        "@type": "Question",
        name: "What are the office hours for the conference secretariat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our office is open weekdays from 9:00 AM to 6:00 PM EAT. Emergency contact is available 24/7 at +254 712 451 777.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly can I expect a response to my inquiry?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We aim to respond to all inquiries within 2-4 hours during office hours. For urgent matters, please call our emergency contact number available 24/7.",
        },
      },
      {
        "@type": "Question",
        name: "Where is the conference venue located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The 1st Eastern Africa Indigenous Seed Conference 2026 will be held in Nairobi, Kenya. The exact venue address will be announced soon and shared with registered participants.",
        },
      },
    ],
  };

  // ContactPage structured data
  const contactPageData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact EA-ISC 2026 | Eastern Africa Indigenous Seed Conference",
    description:
      "Get in touch with the organizers of the 1st Eastern Africa Indigenous Seed Conference. Contact us for registration inquiries, abstract submission questions, sponsorship opportunities, or general information.",
    url: "https://eaindigenousseedsconference.org/contact",
    mainEntity: {
      "@type": "Organization",
      name: "Eastern Africa Indigenous Seed Council",
      url: "https://eaindigenousseedsconference.org",
      logo: "https://eaindigenousseedsconference.org/logo.png",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+254-712-451-777",
          contactType: "customer service",
          email: "info@eaindigenousseedsconference.org",
          availableLanguage: ["English", "Swahili"],
          hoursAvailable: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ],
              opens: "09:00",
              closes: "18:00",
            },
          ],
        },
        {
          "@type": "ContactPoint",
          telephone: "+254-712-451-777",
          contactType: "emergency",
          availableLanguage: "English",
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seed Savers Network, Nairobi",
        addressCountry: "KE",
      },
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
        name: "Contact",
        item: "https://eaindigenousseedsconference.org/contact",
      },
    ],
  };

  const isOfficeHours = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();

    if (day === 0 || day === 6) {
      return hour >= 10 && hour < 14;
    }

    return hour >= 9 && hour < 18;
  };

  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "Contact Page",
        page_location: window.location.href,
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>
          Contact Us | EA-ISC 2026 | Eastern Africa Indigenous Seed Conference
        </title>
        <meta
          name="description"
          content="Contact the organizers of the 1st Eastern Africa Indigenous Seed Conference 2026. Get answers to your questions about registration, abstract submission, sponsorship, and venue information. Our team responds within 2-4 hours."
        />
        <meta
          name="keywords"
          content="contact EA-ISC 2026, conference organizers contact, seed conference email, Eastern Africa conference contact, Nairobi conference contact, registration support, abstract submission help, sponsorship inquiries"
        />
        <meta name="author" content="Eastern Africa Indigenous Seed Council" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://eaindigenousseedsconference.org/contact"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://eaindigenousseedsconference.org/contact"
        />
        <meta
          property="og:title"
          content="Contact EA-ISC 2026 | Eastern Africa Indigenous Seed Conference"
        />
        <meta
          property="og:description"
          content="Get in touch with the conference organizers. We're here to help with registration, abstract submission, sponsorship, and general inquiries. Response within 2-4 hours."
        />
        <meta
          property="og:image"
          content="https://eaindigenousseedsconference.org/images/contact-og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Contact Eastern Africa Indigenous Seed Conference 2026"
        />
        <meta property="og:site_name" content="EA-ISC 2026" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@EAISC2026" />
        <meta name="twitter:creator" content="@EAISC2026" />
        <meta
          name="twitter:title"
          content="Contact EA-ISC 2026 | Eastern Africa Indigenous Seed Conference"
        />
        <meta
          name="twitter:description"
          content="Questions about registration, abstracts, or sponsorship? Contact our team for quick assistance. Response within 2-4 hours."
        />
        <meta
          name="twitter:image"
          content="https://eaindigenousseedsconference.org/images/contact-twitter-card.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="Contact Eastern Africa Indigenous Seed Conference"
        />

        {/* Mobile Specific */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#c59849" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="geo.region" content="KE" />
        <meta name="geo.placename" content="Nairobi" />

        {/* Additional SEO */}
        <meta name="contact" content="info@eaindigenousseedsconference.org" />
        <link rel="help" href="https://eaindigenousseedsconference.org/faq" />
      </Helmet>

      {/* JSON-LD Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(contactPageData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(contactFaqData)}
        </script>
      </Helmet>

      <div
        className="contact-page"
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        <meta
          itemProp="name"
          content="Contact EA-ISC 2026 - Eastern Africa Indigenous Seed Conference"
        />
        <meta
          itemProp="description"
          content="Contact the organizers of the 1st Eastern Africa Indigenous Seed Conference for inquiries about registration, abstract submission, sponsorship, and venue information."
        />

        {/* Hero Section with Background Image */}
        <section
          className="contact-hero"
          aria-label="Contact Hero Section"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-pattern" aria-hidden="true"></div>
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
                <span itemProp="name">Contact Us</span>
                <meta itemProp="position" content="2" />
              </span>
            </nav>
            <div className="hero-content">
              <div className="hero-left">
                <h1 itemProp="headline">Get in Touch</h1>
                <p className="hero-description" itemProp="description">
                  Have questions about registration, abstract submission, or
                  sponsorship? Our team is here to help you.
                </p>
                <div className="hero-stats">
                  <div className="stat">
                    <span className="stat-value">24/7</span>
                    <span className="stat-label">Support</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">2-4h</span>
                    <span className="stat-label">Response</span>
                  </div>
                </div>
              </div>
              <div
                className="hero-right"
                itemProp="contactPoint"
                itemScope
                itemType="https://schema.org/ContactPoint"
              >
                <div className="contact-badge">
                  <Mail size={18} aria-hidden="true" />
                  <span itemProp="email">
                    info@eaindigenousseedsconference.org
                  </span>
                </div>
                <div
                  className={`contact-badge ${isOfficeHours() ? "online" : "offline"}`}
                >
                  <div
                    className={`status-dot ${isOfficeHours() ? "online" : "offline"}`}
                    aria-hidden="true"
                  ></div>
                  <span>
                    {isOfficeHours() ? "Office Open" : "Office Closed"}
                  </span>
                </div>
                <meta itemProp="telephone" content="+254712451777" />
                <meta itemProp="contactType" content="customer service" />
                <meta itemProp="availableLanguage" content="English" />
                <meta itemProp="availableLanguage" content="Swahili" />
              </div>
            </div>
          </div>
        </section>

        {/* Venue Component */}
        <div className="venue-wrapper paper-texture">
          <Venue />
        </div>

        {/* Quick Contact Cards */}
        <section
          className="quick-contact pattern-dots"
          aria-label="Quick Contact Options"
        >
          <div className="container">
            <div className="quick-contact-grid">
              <div
                className="quick-card"
                itemProp="contactPoint"
                itemScope
                itemType="https://schema.org/ContactPoint"
              >
                <div className="card-icon" aria-hidden="true">
                  <Mail size={20} />
                </div>
                <div className="card-content">
                  <h3>Email Us</h3>
                  <p itemProp="email">info@eaindigenousseedsconference.org</p>
                  <span className="card-meta">2-4 hour response</span>
                  <meta itemProp="contactType" content="email support" />
                </div>
              </div>

              <div
                className="quick-card"
                itemProp="contactPoint"
                itemScope
                itemType="https://schema.org/ContactPoint"
              >
                <div className="card-icon" aria-hidden="true">
                  <Phone size={20} />
                </div>
                <div className="card-content">
                  <h3>Call Us</h3>
                  <p itemProp="telephone">+254 712 451 777</p>
                  <span className="card-meta">Mon-Fri, 9AM-6PM</span>
                  <meta itemProp="contactType" content="customer service" />
                </div>
              </div>

              <div className="quick-card">
                <div className="card-icon" aria-hidden="true">
                  <MapPin size={20} />
                </div>
                <div className="card-content">
                  <h3>Visit Us</h3>
                  <p>Seed Savers Network, Kenya</p>
                  <span className="card-meta">Nairobi, Kenya</span>
                </div>
              </div>

              <div className="quick-card">
                <div className="card-icon" aria-hidden="true">
                  <MessageSquare size={20} />
                </div>
                <div className="card-content">
                  <h3>Emergency Contact</h3>
                  <p>+254 712 451 777</p>
                  <span className="card-meta">Available 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Contact Area with Map */}
        <section
          className="contact-main pattern-lines"
          aria-labelledby="contact-info-heading"
        >
          <div className="container">
            <div className="contact-grid">
              {/* Contact Information Side */}
              <div className="contact-info-container">
                <div
                  className="info-card location-card"
                  itemScope
                  itemType="https://schema.org/Place"
                >
                  <h3 id="contact-info-heading">
                    <span itemProp="name">Conference Secretariat</span>
                  </h3>
                  <div className="location-details">
                    <div className="detail-item">
                      <MapPin size={20} aria-hidden="true" />
                      <div>
                        <h4>Address</h4>
                        <p itemProp="address">Seed Savers Network, Kenya</p>
                      </div>
                    </div>
                    <div
                      className="detail-item"
                      itemProp="openingHoursSpecification"
                      itemScope
                      itemType="https://schema.org/OpeningHoursSpecification"
                    >
                      <Clock size={20} aria-hidden="true" />
                      <div>
                        <h4>Office Hours</h4>
                        <p>
                          Weekdays:{" "}
                          <time itemProp="opens" content="09:00">
                            9:00 AM
                          </time>{" "}
                          -{" "}
                          <time itemProp="closes" content="18:00">
                            6:00 PM
                          </time>{" "}
                          EAT
                        </p>
                        <p>Saturday - Sunday: 10:00 AM - 2:00 PM EAT</p>
                        <meta
                          itemProp="dayOfWeek"
                          content="https://schema.org/Monday"
                        />
                        <meta
                          itemProp="dayOfWeek"
                          content="https://schema.org/Tuesday"
                        />
                        <meta
                          itemProp="dayOfWeek"
                          content="https://schema.org/Wednesday"
                        />
                        <meta
                          itemProp="dayOfWeek"
                          content="https://schema.org/Thursday"
                        />
                        <meta
                          itemProp="dayOfWeek"
                          content="https://schema.org/Friday"
                        />
                      </div>
                    </div>
                    <div className="detail-item">
                      <Phone size={20} aria-hidden="true" />
                      <div>
                        <h4>Emergency Contact</h4>
                        <p itemProp="telephone">+254 712 451 777 (24/7)</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <Mail size={20} aria-hidden="true" />
                      <div>
                        <h4>Email Support</h4>
                        <p>info@eaindigenousseedsconference.org</p>
                        <p>registaration@eaindigenousseedsconference.org</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Side - Large Interactive Map */}
              <div className="contact-map-wrapper">
                <div className="map-card">
                  <div className="map-container">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6953909604836!2d36.26753727409346!3d-0.44976953528212466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1829a149b3e5b3e5%3A0xcde1f0a37810fe6e!2sSeed%20Savers%20Network%20Training%20and%20Stay!5e0!3m2!1sen!2ske!4v1776746605095!5m2!1sen!2ske"
                      className="responsive-iframe"
                      title="Conference Location Map - Seed Savers Network, Nairobi, Kenya"
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="map-caption">
                    <MapPin size={18} className="map-marker-icon" />
                    <span>Seed Savers Network, Nairobi, Kenya</span>
                    <button
                      className="map-expand-btn"
                      onClick={() =>
                        window.open(
                          "https://maps.google.com/?q=Seed+Savers+Network+Nairobi+Kenya",
                          "_blank",
                        )
                      }
                      aria-label="Open in Google Maps"
                    >
                      View Larger Map
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
