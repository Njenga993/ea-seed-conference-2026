// pages/RegistrationPage.tsx
import { Helmet } from "react-helmet-async";
import Registration from "../components/Registration"; 
import AbstractSubmission from "../components/CallForAbstracts";
import "../styles/registrationAbstract.css";

const RegistrationPage = () => {
  // Generate structured data for registration page
  const registrationStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Registration & Abstract Submission - 1st Eastern Africa Indigenous Seed Conference 2026",
    "description": "Register for the premier conference on seed sovereignty in Eastern Africa. Choose from delegate, farmer, or virtual participation options. Submit your abstract for consideration.",
    "url": "https://eaindigenousseedsconference.org/registration-abstract",
    "mainEntity": {
      "@type": "Event",
      "name": "1st Eastern Africa Indigenous Seed Conference 2026",
      "description": "A landmark gathering championing seed sovereignty and strengthening farmer-managed seed systems across Eastern Africa.",
      "startDate": "2026-11-17",
      "endDate": "2026-11-20",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "Nairobi, Kenya",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nairobi",
          "addressCountry": "KE"
        }
      },
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": "100",
        "highPrice": "400",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-01-01",
        "url": "https://eaindigenousseedsconference.org/registration-abstract",
        "offers": [
          {
            "@type": "Offer",
            "name": "International Delegate Registration",
            "price": "400",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "name": "African Delegate Registration",
            "price": "200",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "name": "Farmer Registration",
            "price": "150",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "name": "Virtual Participant Registration",
            "price": "100",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        ]
      },
      "organizer": {
        "@type": "Organization",
        "name": "Eastern Africa Indigenous Seed Council",
        "url": "https://eaindigenousseedsconference.org"
      }
    }
  };

  // Structured data for Call for Papers
  const callForPapersData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Call for Abstracts - 1st Eastern Africa Indigenous Seed Conference 2026",
    "description": "Submit your research, case studies, and experiences on indigenous seed systems, seed sovereignty, and farmer-managed agriculture for presentation at the conference.",
    "startDate": "2026-01-01",
    "endDate": "2026-08-15",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Online Submission Portal",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KE"
      }
    },
    "offers": {
      "@type": "Offer",
      "name": "Abstract Submission",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01",
      "validThrough": "2026-08-15"
    },
    "organizer": {
      "@type": "Organization",
      "name": "Eastern Africa Indigenous Seed Council",
      "url": "https://eaindigenousseedsconference.org"
    },
    "keywords": "call for papers, abstract submission, indigenous seeds research, seed sovereignty papers, agricultural research, Eastern Africa studies"
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://eaindigenousseedsconference.org"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Registration & Abstract Submission",
        "item": "https://eaindigenousseedsconference.org/registration-abstract"
      }
    ]
  };

  // FAQ structured data for registration and abstract submission
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the registration fees for the Eastern Africa Indigenous Seed Conference?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Registration fees vary by category: International Delegates ($400), African Delegates ($200), Farmers ($150), and Virtual Participants ($100). Early bird discounts are available until October 31, 2026."
        }
      },
      {
        "@type": "Question",
        "name": "What is included in the registration fee?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Registration includes access to all conference sessions, conference materials, lunch and refreshments, certificate of participation, and networking opportunities. Virtual participation includes live streaming access, digital materials, and virtual networking."
        }
      },
      {
        "@type": "Question",
        "name": "When is the abstract submission deadline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The abstract submission deadline is August 15, 2026. All submissions undergo double-blind peer review. Acceptance notifications will be sent by September 15, 2026."
        }
      },
      {
        "@type": "Question",
        "name": "What are the abstract submission guidelines?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Abstracts must be 300 words maximum, include author details and affiliations, specify the conference track, and be submitted in PDF or Word format. Submissions can be made via email to abstracts@eaindigenousseedsconference.org or through the online submission portal."
        }
      },
      {
        "@type": "Question",
        "name": "Can farmers register at a discounted rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, farmers receive a special discounted rate of $150, which includes full conference access, farmer-focused workshops, field visits, and networking opportunities. Limited travel grants are also available for farmers from Eastern Africa."
        }
      },
      {
        "@type": "Question",
        "name": "What is the cancellation policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Full refunds are available until September 30, 2026. 50% refunds are available until October 31, 2026. No refunds after November 1, 2026. All refund requests must be submitted in writing to registration@eaindigenousseedsconference.org."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Registration & Abstract Submission | EA-ISC 2026 | Eastern Africa Indigenous Seed Conference</title>
        <meta name="description" content="Register for the 1st Eastern Africa Indigenous Seed Conference 2026. Choose from delegate, farmer, or virtual participation options. Submit your abstract for consideration. Early bird discounts available until October 31, 2026." />
        <meta name="keywords" content="conference registration, abstract submission, seed conference registration, Eastern Africa conference, farmer registration, delegate fees, call for papers, indigenous seeds research, Nairobi conference 2026, seed sovereignty conference" />
        <meta name="author" content="Eastern Africa Indigenous Seed Council" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="English" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://eaindigenousseedsconference.org/registration-abstract" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eaindigenousseedsconference.org/registration-abstract" />
        <meta property="og:title" content="Registration & Abstract Submission | EA-ISC 2026" />
        <meta property="og:description" content="Secure your place at the premier conference on seed sovereignty in Eastern Africa. Register now or submit your abstract for consideration. Early bird discounts available." />
        <meta property="og:image" content="https://eaindigenousseedsconference.org/images/registration-og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Registration for Eastern Africa Indigenous Seed Conference 2026" />
        <meta property="og:site_name" content="EA-ISC 2026" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@EAISC2026" />
        <meta name="twitter:creator" content="@EAISC2026" />
        <meta name="twitter:title" content="Registration & Abstract Submission | EA-ISC 2026" />
        <meta name="twitter:description" content="Register for the 1st Eastern Africa Indigenous Seed Conference. Choose your participation type and submit your abstract. Early bird ends October 31, 2026." />
        <meta name="twitter:image" content="https://eaindigenousseedsconference.org/images/registration-twitter-card.jpg" />
        <meta name="twitter:image:alt" content="Registration for Eastern Africa Indigenous Seed Conference" />

        {/* Mobile Specific */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1e4a6b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Additional SEO */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="KE" />
        <meta name="geo.placename" content="Nairobi" />
      </Helmet>

      {/* JSON-LD Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(registrationStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(callForPapersData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqData)}
        </script>
      </Helmet>

      <div className="reg-page" itemScope itemType="https://schema.org/WebPage">
        <meta itemProp="name" content="Registration & Abstract Submission - 1st Eastern Africa Indigenous Seed Conference 2026" />
        <meta itemProp="description" content="Register for the premier conference on seed sovereignty in Eastern Africa. Choose your participation type and submit your abstract." />
        
        {/* Hero Section */}
        <section className="reg-page-hero" aria-label="Registration Hero Section">
          <div className="reg-page-hero-container">
            <nav className="reg-page-breadcrumb" aria-label="Breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
              <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="/" itemProp="item" className="breadcrumb-link">
                  <span itemProp="name">Home</span>
                </a>
                <meta itemProp="position" content="1" />
              </span>
              <span aria-hidden="true">/</span>
              <span className="current" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name">Registration & Abstract</span>
                <meta itemProp="position" content="2" />
              </span>
            </nav>
            <div className="reg-page-hero-content">
              <span className="reg-page-hero-tag" aria-label="Registration page">Registration</span>
              <h1 className="reg-page-hero-title" itemProp="headline">
                Join Us at the 1st Eastern Africa Indigenous Seed Conference 2026
              </h1>
              <p className="reg-page-hero-subtitle" itemProp="description">
                Secure your place at the region's premier gathering on seed sovereignty 
                and farmer-managed seed systems.
              </p>
              
              {/* Hidden structured data for dates */}
              <meta itemProp="datePublished" content="2026-01-01" />
              <meta itemProp="dateModified" content={new Date().toISOString().split('T')[0]} />
            </div>
          </div>
        </section>

        {/* Import your existing components with enhanced semantics */}
        <div itemProp="mainContentOfPage">
          <Registration />
          <AbstractSubmission />
        </div>

        {/* Hidden registration summary for SEO */}
        <div style={{ display: 'none' }} itemScope itemType="https://schema.org/ItemList">
          <div itemProp="itemListElement" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="name" content="International Delegate Registration" />
            <meta itemProp="price" content="400" />
            <meta itemProp="priceCurrency" content="USD" />
            <meta itemProp="description" content="Full conference access for international delegates" />
          </div>
          <div itemProp="itemListElement" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="name" content="African Delegate Registration" />
            <meta itemProp="price" content="200" />
            <meta itemProp="priceCurrency" content="USD" />
            <meta itemProp="description" content="Full conference access for African delegates" />
          </div>
          <div itemProp="itemListElement" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="name" content="Farmer Registration" />
            <meta itemProp="price" content="150" />
            <meta itemProp="priceCurrency" content="USD" />
            <meta itemProp="description" content="Full conference access with farmer-focused workshops and field visits" />
          </div>
          <div itemProp="itemListElement" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="name" content="Virtual Participant Registration" />
            <meta itemProp="price" content="100" />
            <meta itemProp="priceCurrency" content="USD" />
            <meta itemProp="description" content="Live streaming access, digital materials, and virtual networking" />
          </div>
        </div>

        {/* Hidden abstract submission summary for SEO */}
        <div style={{ display: 'none' }} itemScope itemType="https://schema.org/ItemList">
          <div itemProp="itemListElement" itemScope itemType="https://schema.org/Thing">
            <meta itemProp="name" content="Abstract Submission Deadline" />
            <meta itemProp="description" content="August 15, 2026 - Submit your research on indigenous seed systems" />
          </div>
          <div itemProp="itemListElement" itemScope itemType="https://schema.org/Thing">
            <meta itemProp="name" content="Notification of Acceptance" />
            <meta itemProp="description" content="September 15, 2026 - Authors notified of acceptance decisions" />
          </div>
          <div itemProp="itemListElement" itemScope itemType="https://schema.org/Thing">
            <meta itemProp="name" content="Word Limit" />
            <meta itemProp="description" content="300 words maximum, excluding references" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;