// pages/Home.tsx
import { Helmet } from 'react-helmet-async';
import Hero from "../components/Hero";
import About from "../components/About";
import FocusAreas from "../components/FocusAreas";
import Countdown from "../components/Countdown";
import InfoCards from "../components/InfoCards";
import Contact from "../components/Contact";
import ThemeStripe from "../components/ThemeStripe";
import SEO from "../components/SEO";

const Home = () => {
  // Structured Data for Event (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "1st Eastern Africa Indigenous Seed Conference 2026",
    "description": "A landmark gathering bringing together farmers, policymakers, researchers, and seed advocates from across Eastern Africa to champion seed sovereignty and strengthen farmer-managed seed systems.",
    "startDate": "2026-11-17T09:00",
    "endDate": "2026-11-20T18:00",
    "location": {
      "@type": "Place",
      "name": "Kenya International Conference Centre",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nairobi",
        "addressCountry": "KE"
      }
    },
    "image": "https://eaindigenousseedsconference.org/event-image.jpg",
    "organizer": {
      "@type": "Organization",
      "name": "Eastern Africa Indigenous Seed Council",
      "url": "https://eaindigenousseedsconference.org"
    },
    "offers": {
      "@type": "Offer",
      "price": "100",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": ["Farmers", "Researchers", "Policy Makers", "Seed Advocates"]
    },
    "keywords": "indigenous seeds, seed sovereignty, Eastern Africa, agricultural biodiversity, climate resilience, farmer-managed seed systems"
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://eaindigenousseedsconference.org"
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Home"
        description="The 1st Eastern Africa Indigenous Seed Conference 2026 brings together farmers, researchers, and policymakers to champion seed sovereignty and strengthen farmer-managed seed systems across Eastern Africa."
        keywords="indigenous seeds conference, Eastern Africa seed sovereignty, farmer-managed seed systems, agricultural biodiversity, climate resilience, Nairobi conference 2026"
        image="/home-og-image.jpg"
        url="/"
        type="website"
      />

      {/* JSON-LD Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      {/* Your existing components */}
      <Hero />
      <ThemeStripe />
      <About />
      <FocusAreas />
      <Countdown />
      <InfoCards />
      <Contact />
    </>
  );
};

export default Home;