// components/HomeHero.tsx
import { Helmet } from "react-helmet-async";
import "../styles/hero.css";
import heroImage from "../assets/conference-room.webp";

interface HomeHeroProps {
  // Optional props if you want to make it dynamic
  eventName?: string;
  eventDate?: string;
  eventLocation?: string;
}

const HomeHero = ({ 
  eventName = "1st Eastern Africa Indigenous Seed Conference",
  
}: HomeHeroProps) => {

  // Structured Data for the Event (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "1st Eastern Africa Indigenous Seed Conference 2026",
    "alternateName": "EAISC 2026",
    "description": "Building farmer managed seed system community of practice (COP) for a Resilient East Africa Region. A landmark gathering championing seed sovereignty and strengthening farmer-managed seed systems.",
    "startDate": "2026-11-17T09:00",
    "endDate": "2026-11-20T18:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Kenya International Conference Centre",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Harambee Avenue",
        "addressLocality": "Nairobi",
        "addressRegion": "Nairobi County",
        "addressCountry": "KE"
      }
    },
    "image": [
      "https://eaindigenousseedsconference.org/images/conference-room.webp",
      "https://eaindigenousseedsconference.org/images/hero-banner.jpg"
    ],
    "organizer": {
      "@type": "Organization",
      "name": "Eastern Africa Indigenous Seed Council",
      "url": "https://eaindigenousseedsconference.org",
      "logo": "https://eaindigenousseedsconference.org/logo.png",
      "sameAs": [
        "https://twitter.com/EAISC2026",
        "https://linkedin.com/company/eaisc2026",
        "https://facebook.com/eaisc2026"
      ]
    },
    "offers": {
      "@type": "Offer",
      "name": "Conference Registration",
      "price": "100",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01",
      "url": "https://eaindigenousseedsconference.org/registration-abstract"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": [
        "Farmers",
        "Agricultural Researchers",
        "Policy Makers",
        "Seed Advocates",
        "Environmentalists",
        "Food Sovereignty Activists"
      ]
    },
    "keywords": "indigenous seeds, seed sovereignty, farmer-managed seed systems, Eastern Africa agriculture, climate resilience, agricultural biodiversity, community seed banks",
    "sameAs": [
      "https://twitter.com/EAISC2026",
      "https://linkedin.com/company/eaisc2026"
    ],
    "workPerformed": {
      "@type": "CreativeWork",
      "name": "Conference Proceedings",
      "description": "Presentations and workshops on indigenous seed systems"
    }
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
        "name": "Conference",
        "item": "https://eaindigenousseedsconference.org/#conference"
      }
    ]
  };

  // WebPage structured data
  const webpageData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "1st Eastern Africa Indigenous Seed Conference 2026 - Home",
    "description": "Join the premier conference on indigenous seed systems in Eastern Africa. Connect with farmers, researchers, and policymakers championing seed sovereignty.",
    "url": "https://eaindigenousseedsconference.org",
    "datePublished": "2026-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Eastern Africa Indigenous Seed Conference",
      "url": "https://eaindigenousseedsconference.org"
    }
  };

  // Organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Eastern Africa Indigenous Seed Council",
    "alternateName": "EA-ISC",
    "url": "https://eaindigenousseedsconference.org",
    "logo": "https://eaindigenousseedsconference.org/logo.png",
    "sameAs": [
      "https://twitter.com/EAISC2026",
      "https://linkedin.com/company/eaisc2026",
      "https://facebook.com/eaisc2026"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+254-712-451-777",
      "contactType": "customer service",
      "email": "info@eaindigenousseedsconference.org",
      "availableLanguage": ["English", "Swahili"]
    }
  };

  return (
    <>
      {/* Helmet for page-specific meta tags */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>1st Eastern Africa Indigenous Seed Conference 2026 | EAISC Nairobi</title>
        <meta name="description" content="Join the 1st Eastern Africa Indigenous Seed Conference 2026 in Nairobi. Building farmer-managed seed system communities of practice for a resilient East Africa. Connect with farmers, researchers, and policymakers championing seed sovereignty." />
        <meta name="keywords" content="indigenous seeds, Eastern Africa seed conference, farmer-managed seed systems, seed sovereignty, agricultural biodiversity, climate resilience, community seed banks, Nairobi conference 2026, East Africa agriculture, traditional seeds, food sovereignty" />
        <meta name="author" content="Eastern Africa Indigenous Seed Council" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="English" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://eaindigenousseedsconference.org" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eaindigenousseedsconference.org" />
        <meta property="og:title" content="1st Eastern Africa Indigenous Seed Conference 2026" />
        <meta property="og:description" content="Building farmer-managed seed system communities of practice for a resilient East Africa. Join us in Nairobi, Kenya from November 17-20, 2026." />
        <meta property="og:image" content="https://eaindigenousseedsconference.org/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="1st Eastern Africa Indigenous Seed Conference 2026 banner" />
        <meta property="og:site_name" content="EA-ISC 2026" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@EAISC2026" />
        <meta name="twitter:creator" content="@EAISC2026" />
        <meta name="twitter:title" content="1st Eastern Africa Indigenous Seed Conference 2026" />
        <meta name="twitter:description" content="Building farmer-managed seed system communities of practice for a resilient East Africa. Join us in Nairobi, Kenya from November 17-20, 2026." />
        <meta name="twitter:image" content="https://eaindigenousseedsconference.org/images/twitter-card.jpg" />
        <meta name="twitter:image:alt" content="EA-ISC 2026 Conference Banner" />

        {/* Mobile Specific */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1e4a6b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Alternate Languages */}
        <link rel="alternate" hrefLang="en" href="https://eaindigenousseedsconference.org" />
        <link rel="alternate" hrefLang="sw" href="https://eaindigenousseedsconference.org/sw" />
        <link rel="alternate" hrefLang="x-default" href="https://eaindigenousseedsconference.org" />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

      {/* JSON-LD Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(webpageData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationData)}
        </script>
      </Helmet>

      {/* Hero Section with Semantic HTML */}
      <section 
        className="home-hero" 
        id="home"
        aria-label="Conference Hero Section"
        itemScope 
        itemType="https://schema.org/Event"
      >
        {/* Hidden structured data for microdata */}
        <meta itemProp="name" content={eventName} />
        <meta itemProp="startDate" content="2026-11-17T09:00" />
        <meta itemProp="endDate" content="2026-11-20T18:00" />
        <meta itemProp="eventStatus" content="https://schema.org/EventScheduled" />
        <meta itemProp="eventAttendanceMode" content="https://schema.org/OfflineEventAttendanceMode" />
        
        <div className="home-hero-background" aria-hidden="true">
          <img 
            src={heroImage} 
            alt="Kenya International Conference Centre venue exterior - hosting the 1st Eastern Africa Indigenous Seed Conference 2026" 
            className="home-hero-image"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
            itemProp="image"
          />
          <div className="home-hero-overlay" aria-hidden="true"></div>
        </div>
        
        <div className="home-hero-container">
          <div className="home-hero-content">
            <h1 className="home-hero-title" itemProp="name">
              1st Eastern Africa Indigenous Seed Conference
            </h1>
            <h2 className="home-hero-title-highlight" aria-label="EAISC 2026 - Eastern Africa Indigenous Seed Conference 2026">
              EAISC 2026
            </h2>

            <p className="home-hero-theme" itemProp="description">
              Building farmer managed seed system community of practice (COP) For a Resilient EAST AFRICA Region.
            </p>

            <div className="home-hero-meta" aria-label="Event details">
              <div className="home-meta-item">
                <span className="home-meta-icon" aria-hidden="true">📅</span>
                <span itemProp="startDate" content="2026-11-17">
                  17th – 20th November 2026
                </span>
              </div>
              <div className="home-meta-item" itemProp="location" itemScope itemType="https://schema.org/Place">
                <span className="home-meta-icon" aria-hidden="true">📍</span>
                <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <meta itemProp="addressLocality" content="Nairobi" />
                  <meta itemProp="addressCountry" content="KE" />
                  Nairobi, Kenya
                </span>
              </div>
            </div>

            {/* Hidden organizer info for SEO */}
            <div itemProp="organizer" itemScope itemType="https://schema.org/Organization" style={{ display: 'none' }}>
              <meta itemProp="name" content="Eastern Africa Indigenous Seed Council" />
              <meta itemProp="url" content="https://eaindigenousseedsconference.org" />
            </div>

            {/* Hidden offers for SEO */}
            <div itemProp="offers" itemScope itemType="https://schema.org/Offer" style={{ display: 'none' }}>
              <meta itemProp="name" content="Conference Registration" />
              <meta itemProp="price" content="100" />
              <meta itemProp="priceCurrency" content="USD" />
              <meta itemProp="availability" content="https://schema.org/InStock" />
              <meta itemProp="url" content="https://eaindigenousseedsconference.org/registration-abstract" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeHero;