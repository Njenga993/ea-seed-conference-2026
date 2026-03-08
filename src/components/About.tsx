// components/HomeAbout.tsx
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/about.css";
import heroImage from "../assets/fair.webp";
import heroImage1 from "../assets/maize.webp";
import heroImage2 from "../assets/seeds.webp";


const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraph1Ref = useRef<HTMLParagraphElement>(null);
  const paragraph2Ref = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const photo3Ref = useRef<HTMLDivElement>(null);

  // Structured data for About page
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About the 1st Eastern Africa Indigenous Seed Conference 2026",
    "description": "Learn about the landmark gathering bringing together farmers, policymakers, researchers, and seed advocates from across Eastern Africa to champion seed sovereignty and strengthen farmer-managed seed systems.",
    "url": "https://eaindigenousseedsconference.org/about",
    "mainEntity": {
      "@type": "Event",
      "name": "1st Eastern Africa Indigenous Seed Conference 2026",
      "description": "A four-day conference focused on seed sovereignty, farmer-managed seed systems, and policy advocacy for indigenous seed protection in Eastern Africa.",
      "startDate": "2026-11-17",
      "endDate": "2026-11-20",
      "location": {
        "@type": "Place",
        "name": "Nairobi, Kenya",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nairobi",
          "addressCountry": "KE"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "Eastern Africa Indigenous Seed Council",
        "url": "https://eaindigenousseedsconference.org"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": ["Farmers", "Policymakers", "Researchers", "Seed Advocates"]
      },
      "keywords": "indigenous seeds, seed sovereignty, farmer-managed seed systems, Eastern Africa agriculture, food security, climate resilience, agricultural biodiversity"
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
        "name": "About",
        "item": "https://eaindigenousseedsconference.org/about"
      }
    ]
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("home-visible");
            
            // Add delay classes based on data-delay attribute
            const delay = entry.target.getAttribute("data-delay");
            if (delay) {
              entry.target.classList.add(`home-delay-${delay}`);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all elements with animation classes
    const elements = [
      tagRef.current,
      titleRef.current,
      paragraph1Ref.current,
      paragraph2Ref.current,
      ctaRef.current,
      photo1Ref.current,
      photo2Ref.current,
      photo3Ref.current,
    ];

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Helmet for About section meta tags */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>1st Eastern Africa Indigenous Seed Conference 2026 | EAISC Nairobi</title>
        <meta name="description" content="Learn about the 1st Eastern Africa Indigenous Seed Conference 2026 - a landmark gathering bringing together farmers, policymakers, researchers, and seed advocates to champion seed sovereignty and strengthen farmer-managed seed systems across Eastern Africa." />
        <meta name="keywords" content="about indigenous seed conference, Eastern Africa seed sovereignty, farmer-managed seed systems, seed advocates Eastern Africa, agricultural biodiversity conservation, indigenous seed protection, food security Eastern Africa, climate resilience agriculture" />
        <meta name="author" content="Eastern Africa Indigenous Seed Council" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://eaindigenousseedsconference.org/about" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eaindigenousseedsconference.org/about" />
        <meta property="og:title" content="About the 1st Eastern Africa Indigenous Seed Conference 2026" />
        <meta property="og:description" content="Join us in Nairobi for four days of knowledge exchange, regional collaboration, and advancing policies that protect indigenous seed systems as the foundation of food security and climate resilience." />
        <meta property="og:image" content="https://eaindigenousseedsconference.org/images/about-og-image.jpg" />
        <meta property="og:image:alt" content="About the Eastern Africa Indigenous Seed Conference" />
        <meta property="og:site_name" content="EA-ISC 2026" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About EA-ISC 2026 | Eastern Africa Indigenous Seed Conference" />
        <meta name="twitter:description" content="A landmark gathering championing seed sovereignty and strengthening farmer-managed seed systems across Eastern Africa. Join us in Nairobi, November 17-20, 2026." />
        <meta name="twitter:image" content="https://eaindigenousseedsconference.org/images/about-twitter-card.jpg" />
        <meta name="twitter:image:alt" content="About the Eastern Africa Indigenous Seed Conference" />

        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="English" />
      </Helmet>

      {/* JSON-LD Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(aboutStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      {/* About Section with Semantic HTML and Microdata */}
      <section 
        className="home-about" 
        ref={sectionRef}
        aria-labelledby="about-title"
        itemScope 
        itemType="https://schema.org/AboutPage"
      >
        <div className="home-about-container">
          <div className="home-about-grid">
            <div className="home-about-content">
              <div className="home-about-header">
                <span 
                  ref={tagRef} 
                  className="home-about-tag home-fade-up"
                  data-delay="1"
                  role="heading"
                  aria-level={2}
                >
                  About the Conference
                </span>
                <h2 
                  ref={titleRef} 
                  className="home-about-title home-fade-up"
                  data-delay="2"
                  id="about-title"
                  itemProp="name"
                >
                  1st Eastern Africa Indigenous Seed Conference 2026
                </h2>
              </div>

              <div className="home-about-text" itemProp="description">
                <p 
                  ref={paragraph1Ref} 
                  className="home-about-paragraph home-fade-up"
                  data-delay="3"
                >
                  A landmark gathering bringing together farmers, policymakers, researchers, 
                  and seed advocates from across Eastern Africa to champion seed sovereignty 
                  and strengthen farmer-managed seed systems.
                </p>

                <p 
                  ref={paragraph2Ref} 
                  className="home-about-paragraph home-fade-up"
                  data-delay="4"
                >
                  Join us in Nairobi for four days of knowledge exchange, regional collaboration, 
                  and advancing policies that protect indigenous seed systems as the foundation 
                  of food security and climate resilience.
                </p>
              </div>

              {/* Hidden structured data for event details */}
              <div itemProp="mainEntity" itemScope itemType="https://schema.org/Event" style={{ display: 'none' }}>
                <meta itemProp="name" content="1st Eastern Africa Indigenous Seed Conference 2026" />
                <meta itemProp="startDate" content="2026-11-17" />
                <meta itemProp="endDate" content="2026-11-20" />
                <meta itemProp="eventStatus" content="https://schema.org/EventScheduled" />
                <meta itemProp="eventAttendanceMode" content="https://schema.org/OfflineEventAttendanceMode" />
                <div itemProp="location" itemScope itemType="https://schema.org/Place">
                  <meta itemProp="name" content="Nairobi, Kenya" />
                  <meta itemProp="address" content="Nairobi, Kenya" />
                </div>
                <div itemProp="organizer" itemScope itemType="https://schema.org/Organization">
                  <meta itemProp="name" content="Eastern Africa Indigenous Seed Council" />
                  <meta itemProp="url" content="https://eaindigenousseedsconference.org" />
                </div>
              </div>

              <div 
                ref={ctaRef} 
                className="home-about-cta home-fade-up"
                data-delay="5"
              >
                <a 
                  href="/about" 
                  className="home-learn-more"
                  aria-label="Learn more about the Eastern Africa Indigenous Seed Conference"
                >
                  Learn More About Us
                  <span className="home-cta-arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="home-about-visual">
              <div className="home-photo-collage" aria-label="Conference photo gallery">
                <figure 
                  ref={photo1Ref} 
                  className="home-photo home-photo-1 home-scale-in"
                  data-delay="2"
                  itemScope 
                  itemType="https://schema.org/ImageObject"
                >
                  <img 
                    src={heroImage} 
                    alt="Conference participants networking and engaging in discussions at the Eastern Africa Indigenous Seed Conference" 
                    loading="lazy"
                    width="800"
                    height="600"
                    itemProp="contentUrl"
                  />
                  <meta itemProp="description" content="Conference participants at the Eastern Africa Indigenous Seed Conference" />
                  <meta itemProp="keywords" content="conference participants, seed conference, networking, Eastern Africa" />
                  <div className="home-photo-overlay" aria-hidden="true"></div>
                  <figcaption style={{ display: 'none' }}>Conference participants at EA-ISC 2026</figcaption>
                </figure>

                <figure 
                  ref={photo2Ref} 
                  className="home-photo home-photo-2 home-scale-in"
                  data-delay="4"
                  itemScope 
                  itemType="https://schema.org/ImageObject"
                >
                  <img 
                    src={heroImage1} 
                    alt="Display of indigenous maize seeds showcasing agricultural biodiversity at the Eastern Africa Indigenous Seed Conference" 
                    loading="lazy"
                    width="600"
                    height="400"
                    itemProp="contentUrl"
                  />
                  <meta itemProp="description" content="Indigenous maize seed varieties display" />
                  <meta itemProp="keywords" content="indigenous seeds, maize, agricultural biodiversity, seed display" />
                  <div className="home-photo-overlay" aria-hidden="true"></div>
                  <figcaption style={{ display: 'none' }}>Indigenous maize seed display at EA-ISC 2026</figcaption>
                </figure>

                <figure 
                  ref={photo3Ref} 
                  className="home-photo home-photo-3 home-scale-in"
                  data-delay="6"
                  itemScope 
                  itemType="https://schema.org/ImageObject"
                >
                  <img 
                    src={heroImage2} 
                    alt="Farmers from Eastern Africa showcasing and discussing indigenous seed varieties at the conference" 
                    loading="lazy"
                    width="600"
                    height="400"
                    itemProp="contentUrl"
                  />
                  <meta itemProp="description" content="Farmers with indigenous seeds" />
                  <meta itemProp="keywords" content="farmers, indigenous seeds, seed keepers, Eastern Africa farmers" />
                  <div className="home-photo-overlay" aria-hidden="true"></div>
                  <figcaption style={{ display: 'none' }}>Farmers showcasing indigenous seeds at EA-ISC 2026</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;