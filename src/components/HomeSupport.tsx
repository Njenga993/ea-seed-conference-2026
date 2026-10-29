// components/HomeSupport.tsx
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/support.css";
import heroImage from "../assets/fair.webp";
import heroImage1 from "../assets/maize.webp";
import heroImage2 from "../assets/seeds.webp";
import campaignImage from "../assets/campaign.jpg";

const HomeSupport = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraph1Ref = useRef<HTMLParagraphElement>(null);
  const paragraph2Ref = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const photo3Ref = useRef<HTMLDivElement>(null);

  // Support section refs
  const supportSectionRef = useRef<HTMLElement>(null);
  const supportTagRef = useRef<HTMLSpanElement>(null);
  const supportTitleRef = useRef<HTMLHeadingElement>(null);
  const supportSubtitleRef = useRef<HTMLHeadingElement>(null);
  const supportParagraph1Ref = useRef<HTMLParagraphElement>(null);
  const supportParagraph2Ref = useRef<HTMLParagraphElement>(null);
  const supportCtaRef = useRef<HTMLDivElement>(null);
  const supportMchangaRef = useRef<HTMLDivElement>(null);
  const supportOrganizerRef = useRef<HTMLDivElement>(null);
  const supportImageRef = useRef<HTMLDivElement>(null);
  const supportStat1Ref = useRef<HTMLDivElement>(null);
  const supportStat2Ref = useRef<HTMLDivElement>(null);
  const supportStat3Ref = useRef<HTMLDivElement>(null);

  // Structured data for About page
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About the 1st Eastern Africa Indigenous Seed Conference 2026",
    description:
      "Learn about the landmark gathering bringing together farmers, policymakers, researchers, and seed advocates from across Eastern Africa to champion seed sovereignty and strengthen farmer-managed seed systems.",
    url: "https://eaindigenousseedsconference.org/about",
    mainEntity: {
      "@type": "Event",
      name: "1st Eastern Africa Indigenous Seed Conference 2026",
      description:
        "A four-day conference focused on seed sovereignty, farmer-managed seed systems, and policy advocacy for indigenous seed protection in Eastern Africa.",
      startDate: "2026-11-17",
      endDate: "2026-11-20",
      location: {
        "@type": "Place",
        name: "Catholic university of Eastern Africa, Nairobi, Kenya",
        address: {
          "@type": "PostalAddress",
          addressLocality:
            "Catholic university of Eastern Africa, Nairobi, Kenya",
          addressCountry: "KE",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Eastern Africa Indigenous Seed Council",
        url: "https://eaindigenousseedsconference.org",
      },
      audience: {
        "@type": "Audience",
        audienceType: [
          "Farmers",
          "Policymakers",
          "Researchers",
          "Seed Advocates",
        ],
      },
      keywords:
        "indigenous seeds, seed sovereignty, farmer-managed seed systems, Eastern Africa agriculture, food security, climate resilience, agricultural biodiversity",
    },
  };

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

  const donateActionData = {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    name: "A Shilling for Seeds - Support EA-ISC 2026",
    description:
      "Support the 1st Eastern Africa Indigenous Seed Conference through our 'A Shilling for Seeds' campaign. Every seed has a story, every shilling makes a difference.",
    recipient: {
      "@type": "Organization",
      name: "SeedSavers Network Kenya",
      url: "https://seedsaverskenya.org",
    },
    purpose: {
      "@type": "Thing",
      name: "1st Eastern Africa Indigenous Seed Conference 2026",
      description:
        "Funding for conference logistics, farmer travel support, seed exhibition, and policy advocacy activities",
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("home-visible");
            const delay = entry.target.getAttribute("data-delay");
            if (delay) {
              entry.target.classList.add(`home-delay-${delay}`);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const allElements = [
      tagRef.current,
      titleRef.current,
      paragraph1Ref.current,
      paragraph2Ref.current,
      ctaRef.current,
      photo1Ref.current,
      photo2Ref.current,
      photo3Ref.current,
      supportTagRef.current,
      supportTitleRef.current,
      supportSubtitleRef.current,
      supportParagraph1Ref.current,
      supportParagraph2Ref.current,
      supportCtaRef.current,
      supportMchangaRef.current,
      supportOrganizerRef.current,
      supportImageRef.current,
      supportStat1Ref.current,
      supportStat2Ref.current,
      supportStat3Ref.current,
    ];

    allElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          1st Eastern Africa Indigenous Seed Conference 2026 | EAISC Nairobi
        </title>
        <meta
          name="description"
          content="Learn about the 1st Eastern Africa Indigenous Seed Conference 2026 - a landmark gathering bringing together farmers, policymakers, researchers, and seed advocates to champion seed sovereignty and strengthen farmer-managed seed systems across Eastern Africa."
        />
        <meta
          name="keywords"
          content="about indigenous seed conference, Eastern Africa seed sovereignty, farmer-managed seed systems, seed advocates Eastern Africa, agricultural biodiversity conservation, indigenous seed protection, food security Eastern Africa, climate resilience agriculture, a shilling for seeds, support indigenous seeds"
        />
        <meta name="author" content="Eastern Africa Indigenous Seed Council" />
        <link
          rel="canonical"
          href="https://eaindigenousseedsconference.org/about"
        />
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
          content="Join us in Catholic university of Eastern Africa, Nairobi, for four days of knowledge exchange, regional collaboration, and advancing policies that protect indigenous seed systems as the foundation of food security and climate resilience."
        />
        <meta
          property="og:image"
          content="https://eaindigenousseedsconference.org/images/about-og-image.jpg"
        />
        <meta
          property="og:image:alt"
          content="About the Eastern Africa Indigenous Seed Conference"
        />
        <meta property="og:site_name" content="EA-ISC 2026" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About EA-ISC 2026 | Eastern Africa Indigenous Seed Conference"
        />
        <meta
          name="twitter:description"
          content="A landmark gathering championing seed sovereignty and strengthening farmer-managed seed systems across Eastern Africa. Join us in Nairobi, November 17-20, 2026."
        />
        <meta
          name="twitter:image"
          content="https://eaindigenousseedsconference.org/images/about-twitter-card.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="About the Eastern Africa Indigenous Seed Conference"
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="English" />
      </Helmet>

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(aboutStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(donateActionData)}
        </script>
      </Helmet>

      {/* ==================== ABOUT SECTION ==================== */}
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
                  A landmark gathering bringing together farmers, policymakers,
                  researchers, and seed advocates from across Eastern Africa to
                  champion seed sovereignty and strengthen farmer-managed seed
                  systems.
                </p>

                <p
                  ref={paragraph2Ref}
                  className="home-about-paragraph home-fade-up"
                  data-delay="4"
                >
                  Join us in Catholic university of Eastern Africa, Nairobi, for
                  four days of knowledge exchange, regional collaboration, and
                  advancing policies that protect indigenous seed systems as the
                  foundation of food security and climate resilience.
                </p>
              </div>

              {/* Hidden structured data */}
              <div
                itemProp="mainEntity"
                itemScope
                itemType="https://schema.org/Event"
                style={{ display: "none" }}
              >
                <meta
                  itemProp="name"
                  content="1st Eastern Africa Indigenous Seed Conference 2026"
                />
                <meta itemProp="startDate" content="2026-11-17" />
                <meta itemProp="endDate" content="2026-11-20" />
                <meta
                  itemProp="eventStatus"
                  content="https://schema.org/EventScheduled"
                />
                <meta
                  itemProp="eventAttendanceMode"
                  content="https://schema.org/OfflineEventAttendanceMode"
                />
                <div
                  itemProp="location"
                  itemScope
                  itemType="https://schema.org/Place"
                >
                  <meta itemProp="name" content="Nairobi, Kenya" />
                  <meta itemProp="address" content="Nairobi, Kenya" />
                </div>
                <div
                  itemProp="organizer"
                  itemScope
                  itemType="https://schema.org/Organization"
                >
                  <meta
                    itemProp="name"
                    content="Eastern Africa Indigenous Seed Council"
                  />
                  <meta
                    itemProp="url"
                    content="https://eaindigenousseedsconference.org"
                  />
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
                  <span className="home-cta-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>

            <div className="home-about-visual">
              <div
                className="home-photo-collage"
                aria-label="Conference photo gallery"
              >
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
                  <meta
                    itemProp="description"
                    content="Conference participants at the Eastern Africa Indigenous Seed Conference"
                  />
                  <figcaption style={{ display: "none" }}>
                    Conference participants at EA-ISC 2026
                  </figcaption>
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
                  <meta
                    itemProp="description"
                    content="Indigenous maize seed varieties display"
                  />
                  <figcaption style={{ display: "none" }}>
                    Indigenous maize seed display at EA-ISC 2026
                  </figcaption>
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
                  <meta
                    itemProp="description"
                    content="Farmers with indigenous seeds"
                  />
                  <figcaption style={{ display: "none" }}>
                    Farmers showcasing indigenous seeds at EA-ISC 2026
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SUPPORT SECTION ==================== */}
      <section
        className="home-support"
        ref={supportSectionRef}
        aria-labelledby="support-title"
      >
        <div className="home-support-container">
          <div className="home-support-grid">
            {/* Image Side - Left */}
            <div
              ref={supportImageRef}
              className="home-support-image-wrapper home-fade-up"
              data-delay="1"
            >
              <figure
                className="home-support-image-figure"
                itemScope
                itemType="https://schema.org/ImageObject"
              >
                <img
                  src={campaignImage}
                  alt="A Shilling for Seeds campaign poster - Hands holding diverse indigenous seeds including beans, nuts, and grains, representing the collective effort to preserve indigenous seed heritage in Eastern Africa"
                  loading="lazy"
                  width="600"
                  height="800"
                  itemProp="contentUrl"
                />
                <meta
                  itemProp="description"
                  content="A Shilling for Seeds campaign poster showing hands holding diverse indigenous seeds"
                />
                <meta
                  itemProp="name"
                  content="A Shilling for Seeds - EAISC 2026 Campaign"
                />
                <figcaption style={{ display: "none" }}>
                  A Shilling for Seeds campaign poster for the 1st Eastern
                  Africa Indigenous Seed Conference 2026
                </figcaption>
              </figure>
            </div>

            {/* Content Side - Right */}
            <div className="home-support-content">
              <span
                ref={supportTagRef}
                className="home-support-campaign-tag home-fade-up"
                data-delay="2"
              >
                A Shilling for Seeds
              </span>

              <h2
                ref={supportTitleRef}
                className="home-support-title home-fade-up"
                data-delay="3"
                id="support-title"
              >
                Every Seed Has A Story
              </h2>

              <p
                ref={supportSubtitleRef}
                className="home-support-subtitle home-fade-up"
                data-delay="4"
              >
                Every Shilling Makes A Difference
              </p>

              <div className="home-support-text">
                <p
                  ref={supportParagraph1Ref}
                  className="home-support-paragraph home-fade-up"
                  data-delay="5"
                >
                  Support the 1st Eastern Africa Indigenous Seed Conference and
                  help us bring together farmers, seed keepers, and advocates
                  from across the region. Your contribution  no matter how
                  small  directly supports farmer participation, seed
                  exhibitions, and policy advocacy for indigenous seed
                  protection.
                </p>

                <p
                  ref={supportParagraph2Ref}
                  className="home-support-paragraph home-fade-up"
                  data-delay="6"
                >
                  Join our{" "}
                  <strong>&ldquo;A Shilling for Seeds&rdquo;</strong> campaign
                  and become part of the movement to preserve agricultural
                  biodiversity, strengthen farmer-managed seed systems, and
                  ensure food security for future generations across Eastern
                  Africa.
                </p>
              </div>

              {/* Impact Stats */}
              <div className="home-support-stats home-fade-up" data-delay="7">
                <div
                  ref={supportStat1Ref}
                  className="home-support-stat-item"
                >
                  <span className="home-support-stat-number">500+</span>
                  <span className="home-support-stat-label">
                    Farmers to Support
                  </span>
                </div>
                <div
                  ref={supportStat2Ref}
                  className="home-support-stat-item"
                >
                  <span className="home-support-stat-number">8</span>
                  <span className="home-support-stat-label">
                    Eastern Africa Countries
                  </span>
                </div>
                <div
                  ref={supportStat3Ref}
                  className="home-support-stat-item"
                >
                  <span className="home-support-stat-number">1,000+</span>
                  <span className="home-support-stat-label">
                    Seed Varieties to Showcase
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div
                ref={supportCtaRef}
                className="home-support-cta home-fade-up"
                data-delay="8"
              >
                <a
                  href="https://www.mchanga.africa/fundraiser/144898?_gl=1*vp8t5e*_gcl_au*MTM4MzUxOTQwMS4xNzgyOTc2MzAwLjc0NTQ0MjIxLjE3ODQ2MzEwNzQuMTc4NDYzMjQ5MS42ODU5NTM4NDguMTc4NDYyODI2MC4xNzg0NjMyNDkx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-support-primary-btn"
                  aria-label="Give a shilling to support the indigenous seed conference"
                >
                  Give a Shilling
                  <span className="home-support-btn-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </a>
              </div>

              {/* Mchanga Section */}
              <div
                ref={supportMchangaRef}
                className="home-support-mchanga home-fade-up"
                data-delay="9"
              >
                <div className="home-support-mchanga-inner">
                  <div className="home-support-mchanga-text">
                    
                    <p>
                      Support through{" "}
                      <strong>Mchanga</strong> — Kenya&apos;s trusted mobile
                      fundraising platform
                    </p>
                  </div>
                  <a
                    href="https://www.mchanga.africa/fundraiser/144898?_gl=1*vp8t5e*_gcl_au*MTM4MzUxOTQwMS4xNzgyOTc2MzAwLjc0NTQ0MjIxLjE3ODQ2MzEwNzQuMTc4NDYzMjQ5MS42ODU5NTM4NDguMTc4NDYyODI2MC4xNzg0NjMyNDkx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-support-mchanga-btn"
                    aria-label="Support through Mchanga fundraising platform"
                  >
                    Support via Mchanga
                  </a>
                </div>
                <p className="home-support-mchanga-note">
                  Scan the QR code on the poster or visit Mchanga to contribute.
                </p>
              </div>

              {/* Organizer 
              <div
                ref={supportOrganizerRef}
                className="home-support-organizer home-fade-up"
                data-delay="10"
              >
                <span className="home-support-organizer-label">
                  Campaign by{" "}
                </span>
                <a
                  href="https://seedsaverskenya.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-support-organizer-link"
                >
                  SeedSavers Network Kenya
                </a>
              </div>*/}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSupport;