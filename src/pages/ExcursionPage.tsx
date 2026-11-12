// pages/ExcursionPage.tsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Camera,
  Clock,
  ExternalLink,
  X,
} from "lucide-react";

import "../styles/excursionPage.css";

// Hero background — swap for an excursion photo if you like.
import heroBackground from "../assets/contact.webp";

// ── Photos ───────────────────────────────────────────────────────────────────
// Put 5 photos per site in src/assets/excursion/ using these names
// (or change the paths / extensions below to match your files).
import la1 from "../assets/sites/alliance1.png";
import la2 from "../assets/sites/alliance4.png";
import la3 from "../assets/sites/alliance5.png";
import la4 from "../assets/sites/alliance4.png";
import la5 from "../assets/sites/alliance5.png";

import ssn1 from "../assets/sites/ssn1.png";
import ssn2 from "../assets/sites/ssn2.png";
import ssn3 from "../assets/sites/ssn3.png";
import ssn4 from "../assets/sites/ssn4.png";
import ssn5 from "../assets/sites/ssn1.png";


import cw1 from "../assets/sites/worms1.png";
import cw2 from "../assets/sites/worms2.png";
import cw3 from "../assets/sites/worms3.png";
import cw4 from "../assets/sites/worms4.png";
import cw5 from "../assets/sites/worms1.png";

import kl1 from "../assets/sites/kalro1.png";
import kl2 from "../assets/sites/kalro2.png";
import kl3 from "../assets/sites/kalro1.png";
import kl4 from "../assets/sites/kalro2.png";
import kl5 from "../assets/sites/kalro1.png";

import cf1 from "../assets/sites/tea1.png";
import cf2 from "../assets/sites/tea2.png";
import cf3 from "../assets/sites/tea3.png";
import cf4 from "../assets/sites/tea4.png";
import cf5 from "../assets/sites/tea5.png";

const SITE_URL = "https://eaindigenousseedconference.org";

// Google Form where delegates pick their preferred excursion site.
const EXCURSION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeBxVqkNIfnxttGbIt02zJI23qeRg3bfw2osxLy_exrOzMerw/viewform?usp=publish-editor";

// All travel times are measured from the conference venue (CUEA).

// ── Data ─────────────────────────────────────────────────────────────────────
interface ExcursionSite {
  id: string;
  number: string;
  name: string;
  subtitle?: string;
  focus: string;
  travelTime: string; // approximate one-way drive from CUEA
  description: string[];
  learningsTitle: string;
  learnings: string[];
  photos: string[];
}

const sites: ExcursionSite[] = [
  {
    id: "site-1",
    number: "01",
    name: "Landscape Alliance",
    subtitle: "Field visit: ICRAF Campus and Karura Forest",
    focus: "Trees & agroforestry",
    travelTime: "About 1 hr",
    description: [
      "Discover how trees and scientific innovation are helping address some of the world's most pressing challenges, from climate change and biodiversity loss to food security and land degradation.",
      "Laboratory tours: the visit begins at the Landscape Alliance (ICRAF) Campus with guided tours of three specialised laboratories, showcasing how science, technology and innovation are generating practical solutions for tree conservation, soil health, sustainable land management and landscape restoration.",
      "Tree Seed Laboratory and Genebank: explore how agroforestry tree genetic resources are conserved and sustainably used. The gene bank holds 248 agroforestry tree species and supports access to high-quality tree seeds, helping farmers and communities plant the right trees, in the right places and for the right purposes.",
      "Soil and Land Health Laboratory: discover the advanced dry spectral techniques used to analyse soils, plants and agricultural inputs. With more than 20,000 samples analysed annually, the laboratory supports soil health assessments at scale and serves as a reference facility for more than 20 regional spectroscopy laboratories worldwide.",
      "Spatial Data Science and Applied Learning Laboratory (SPACIAL): learn how satellite imagery and geospatial technologies are used to monitor forest cover, track deforestation, assess restoration progress and identify areas suitable for landscape restoration.",
      "Visit to Karura Forest: participants then proceed to nearby Karura Forest, managed by Friends of Karura Forest (FKF), a Community Forest Association established in 2009. FKF transformed Karura from a dangerous no-go zone into one of Kenya's most popular recreational and conservation areas, attracting more than 75,000 visits each month. Located on the outskirts of Nairobi, it plays a unique role as an urban conservation and recreational forest, and has gained international recognition as one of Africa's most successful urban forests.",
      "Landscape Alliance and FKF are partnering through the Right Tree in the Right Place for the Right Purpose (RTRP) project, which aims to strengthen the supply of high-quality planting material of native tree species for landscape restoration across sub-Saharan Africa. Kenya is one of five participating countries, alongside Burkina Faso, Ethiopia, Rwanda and Uganda.",
      "Through this partnership, FKF is receiving support to establish a Multi-Species Breeding Seed Orchard (MBSO) as a future source of high-quality native tree seeds, expand and modernise its indigenous tree nursery, and strengthen technical capacity in seed collection, processing and pre-treatment.",
    ],
    learningsTitle: "Visit highlights",
    learnings: [
      "Tree Seed Laboratory and Genebank: 248 agroforestry tree species conserved",
      "Soil and Land Health Laboratory: 20,000+ samples analysed each year",
      "Spatial Data Science and Applied Learning Laboratory (SPACIAL): satellite monitoring of forests and restoration",
      "Guided walk through Karura Forest, one of Africa's most successful urban forests",
      "Visit to the Multi-Species Breeding Seed Orchard (MBSO) site and the RTRP project overview",
      "Tour of the Karura indigenous tree nursery and its seed collection, processing and pre-treatment work",
    ],
    photos: [la1, la2, la3, la4, la5],
  },
  {
    id: "site-2",
    number: "02",
    name: "Seed Savers Network",
    focus: "Seeds & food systems",
    travelTime: "About 3 hrs",
    description: [
      "Seed Savers Network is a civil society organisation dedicated to preserving agricultural biodiversity and empowering farming communities across Kenya. Founded on the principle that seed sovereignty is fundamental to food sovereignty, it works directly with smallholder farmers to conserve, regenerate and exchange indigenous seed varieties that are resilient to climate change and vital for sustainable food systems.",
      "Its journey began with a simple but powerful realisation: the loss of traditional seed varieties is not only a loss of genetic diversity, but a loss of cultural heritage, traditional knowledge and community resilience. For over a decade, the network has been at the forefront of the seed conservation movement in Africa, establishing community seed banks, training seed ambassadors and advocating for policies that protect farmers' rights to save, exchange and sell their seeds.",
    ],
    learningsTitle: "Learning points",
    learnings: [
      "seed saving and seed banking",
      "various agroecology demonstrations",
      "Food forest",
      "learn on  diffrent agroecology enterprises eg value addition through dehydration of vegetables",
      "communal cold room utilization",
    ],
    photos: [ssn1, ssn2, ssn3, ssn4, ssn5],
  },
  {
    id: "site-3",
    number: "03",
    name: "Comfort Worms and Insects",
    focus: "agroecology enterprise- worm farming",
    travelTime: "About 1 hr 15 min",
    description: [
      "Comfort Worms and Insects started with a focus on breeding worms to feed chickens. Its founder, George Muturi, raised local chickens and struggled with the high cost of feed, which pushed him to look for alternative ways of feeding his birds.",
      "After three years of experimenting with red worms, George discovered that black soldier flies and azolla could effectively feed poultry and other livestock.",
      "Today the enterprise offers sustainable solutions to smallholder farmers, training them to be independent using readily available materials. It also integrates worms into waste management processes and organic fertiliser production.",
    ],
    learningsTitle: "Key learnings",
    learnings: ["BSF farming", "Vermicomposting", "Azolla"],
    photos: [cw1, cw2, cw3, cw4, cw5],
  },
  {
    id: "site-4",
    number: "04",
    name: "KALRO Naivasha",
    subtitle: "Farmer learning visit: indigenous livestock breeds",
    focus: "Indigenous livestock",
    travelTime: "About 2 hrs",
    description: [
      "The visit to KALRO Naivasha will expose participants to the conservation, management and improvement of indigenous livestock breeds and their contribution to resilient farming systems.",
      "Farmers will learn about the importance of conserving indigenous livestock genetic resources, identifying locally adapted breeds and understanding their unique characteristics, including their ability to withstand harsh climatic conditions, tolerate diseases and survive under low-input production systems.",
      "The visit will also provide an opportunity to learn about sustainable livestock management, breed selection, breeding practices, pasture and fodder management, and how indigenous livestock contribute to household food security, income generation and climate resilience.",
    ],
    learningsTitle: "Key learnings for farmers",
    learnings: [
      "learn on productive managemnet of indigenous livestock breeds- cows , goats and chicken ",
    ],
    photos: [kl1, kl2, kl3, kl4, kl5],
  },
  {
    id: "site-5",
    number: "05",
    name: "Organic Tea Farming in Kiambu County",
    subtitle: "Tea and organic farming",
    focus: "Tea and organic farming",
    travelTime: "About 1 hr 15 min",
    description: [
      "The visit to the organic tea farm in Kiambu County will provide participants with insights into sustainable tea farming practices, organic certification processes and the benefits of organic agriculture for both farmers and consumers.",
      "Farmers will learn about the principles of organic farming, including soil health management, pest and disease control, crop rotation, and the use of organic inputs. They will also gain an understanding of the economic and environmental advantages of organic tea production, as well as the market opportunities for organic products.",
      "The visit will include a tour of the tea plantation, where participants can observe the cultivation practices, harvesting techniques and processing methods used in organic tea production. Additionally, there will be discussions on the challenges faced by organic farmers and strategies for overcoming them.",
    ],
    learningsTitle: "Key learnings for farmers",
    learnings: [
      "Principles of organic farming and soil health management",
      "Pest and disease control in organic tea production",
      "Crop rotation and sustainable farming practices",
      
    ],
    photos: [cf1, cf2, cf3, cf4, cf5],
  },
];

// ── Structured data ──────────────────────────────────────────────────────────
const pageData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Excursions | EA-ISC 2026",
  description:
    "Field excursions at the 1st Eastern Africa Indigenous Seed Conference 2026: Landscape Alliance, Seed Savers Network, Comfort Worms and Insects, KALRO Naivasha, and Organic Tea Farming in Kiambu County.",
  url: `${SITE_URL}/excursions`,
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Excursions",
      item: `${SITE_URL}/excursions`,
    },
  ],
};

// ── Component ────────────────────────────────────────────────────────────────
const ExcursionPage = () => {
  const [activeId, setActiveId] = useState<string>(sites[0].id);
  const [lightbox, setLightbox] = useState<{ site: number; photo: number } | null>(
    null
  );
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const activeSite = lightbox ? sites[lightbox.site] : null;

  // Highlight the matching chip in the sticky menu while scrolling
  useEffect(() => {
    const elements = sites
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveId(id);
  };

  const openLightbox = (site: number, photo: number, trigger: HTMLElement) => {
    lastTriggerRef.current = trigger;
    setLightbox({ site, photo });
  };

  const closeLightbox = () => {
    setLightbox(null);
    lastTriggerRef.current?.focus();
  };

  const step = (direction: 1 | -1) => {
    setLightbox((prev) => {
      if (!prev) return prev;
      const total = sites[prev.site].photos.length;
      return { site: prev.site, photo: (prev.photo + direction + total) % total };
    });
  };

  // Lightbox: keyboard, scroll lock, focus
  useEffect(() => {
    if (lightbox === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightbox(null);
        lastTriggerRef.current?.focus();
      } else if (e.key === "ArrowRight") {
        step(1);
      } else if (e.key === "ArrowLeft") {
        step(-1);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox !== null]);

  return (
    <>
      <Helmet>
        <title>Excursions | EA-ISC 2026</title>
        <meta
          name="description"
          content="Explore the field excursions at EA-ISC 2026: Landscape Alliance, Seed Savers Network, Comfort Worms and Insects, KALRO Naivasha, and Organic Tea Farming in Kiambu County. Pick your preferred site and see travel times from CUEA."
        />
        <link rel="canonical" href={`${SITE_URL}/excursions`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/excursions`} />
        <meta property="og:title" content="Excursions | EA-ISC 2026" />
        <meta
          property="og:description"
          content="Five field excursions on trees, seeds, insects and indigenous livestock, part of the 1st Eastern Africa Indigenous Seed Conference."
        />
        <meta property="og:site_name" content="EA-ISC 2026" />
        <script type="application/ld+json">{JSON.stringify(pageData)}</script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <div className="ex-page">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          className="ex-hero"
          aria-label="Excursions hero"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="ex-hero-overlay" />
          <div className="ex-container ex-hero-inner">
            <nav className="ex-breadcrumb" aria-label="Breadcrumb">
              <Link to="/" className="ex-breadcrumb-link">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="ex-breadcrumb-current">Excursions</span>
            </nav>

            <span className="ex-badge">Field Learning · EA-ISC 2026</span>
            <h1>Conference Excursions</h1>
            <p className="ex-hero-lead">
              Step out of the conference hall and into the field. Five sites
              have been selected to show indigenous seeds, trees, insects and
              livestock at work: practical learning from the people and
              institutions leading the way.
            </p>

            <div className="ex-hero-actions">
              <a
                href={EXCURSION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ex-btn ex-btn-primary"
              >
                Pick Your Preferred Excursion
                <ExternalLink size={16} aria-hidden="true" />
              </a>
              <a
                href="#ex-pick"
                className="ex-btn ex-btn-outline"
                onClick={(e) => jumpTo(e, "ex-pick")}
              >
                See Sites and Travel Times
              </a>
            </div>

            <ul className="ex-hero-stats">
              <li>
                <span className="ex-stat-value">5</span>
                <span className="ex-stat-label">Learning sites</span>
              </li>
              <li>
                <span className="ex-stat-value">5</span>
                <span className="ex-stat-label">Themes</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ── Sticky site menu ──────────────────────────────────────────── */}
        <nav className="ex-jump" aria-label="Excursion sites">
          <div className="ex-container ex-jump-inner">
            {sites.map((site) => (
              <a
                key={site.id}
                href={`#${site.id}`}
                className={`ex-chip ${activeId === site.id ? "is-active" : ""}`}
                aria-current={activeId === site.id ? "true" : undefined}
                onClick={(e) => jumpTo(e, site.id)}
              >
                <span className="ex-chip-number">{site.number}</span>
                <span className="ex-chip-label">{site.name}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* ── Choose an excursion ───────────────────────────────────────── */}
        <section id="ex-pick" className="ex-pick" aria-labelledby="ex-pick-heading">
          <div className="ex-container">
            <div className="ex-pick-head">
              <h2 id="ex-pick-heading">Choose your field excursion</h2>
              <p>
                Look through the five sites below, note how far each one is from
                the conference venue (CUEA), then tell us which one you would
                like to join.
              </p>
            </div>

            <ul className="ex-pick-list">
              {sites.map((site) => (
                <li key={site.id}>
                  <a
                    href={`#${site.id}`}
                    className="ex-pick-card"
                    onClick={(e) => jumpTo(e, site.id)}
                  >
                    <span className="ex-pick-num">Site {site.number}</span>
                    <span className="ex-pick-name">{site.name}</span>
                    <span className="ex-pick-time">
                      <Clock size={14} aria-hidden="true" />
                      {site.travelTime} from CUEA
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="ex-pick-head">
              <h2 id="ex-pick-heading">Departure Time - 8:30 AM</h2>
              </div>

            <div className="ex-pick-action">
              <a
                href={EXCURSION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ex-btn ex-btn-primary"
              >
                Pick Your Preferred Excursion
                <ExternalLink size={16} aria-hidden="true" />
              </a>
              <p className="ex-pick-note">
                Opens a short Google Form in a new tab. Travel times are
                approximate one-way drive times from CUEA and may change with
                traffic; final transport timings will be confirmed before the
                excursion.
              </p>
            </div>
          </div>
        </section>

        {/* ── Sites ─────────────────────────────────────────────────────── */}
        {sites.map((site, siteIndex) => (
          <section
            key={site.id}
            id={site.id}
            className={`ex-site ${siteIndex % 2 === 1 ? "ex-site--alt" : ""}`}
            aria-labelledby={`${site.id}-title`}
          >
            <div className="ex-container">
              <header className="ex-site-header">
                <span className="ex-site-number" aria-hidden="true">
                  {site.number}
                </span>
                <div>
                  <div className="ex-meta">
                    <span className="ex-tag">{site.focus}</span>
                    <span className="ex-travel">
                      <Clock size={13} aria-hidden="true" />
                      {site.travelTime} from CUEA
                    </span>
                  </div>
                  <h2 id={`${site.id}-title`} className="ex-site-title">
                    {site.name}
                  </h2>
                  {site.subtitle && (
                    <p className="ex-site-subtitle">{site.subtitle}</p>
                  )}
                </div>
              </header>

              <div
                className={`ex-site-grid ${
                  siteIndex % 2 === 1 ? "ex-site-grid--reverse" : ""
                }`}
              >
                {/* Text */}
                <div className="ex-site-info">
                  {site.description.map((paragraph, i) => (
                    <p className="ex-site-text" key={i}>
                      {paragraph}
                    </p>
                  ))}

                  <div className="ex-learnings">
                    <h3 className="ex-learnings-title">{site.learningsTitle}</h3>
                    <ul className="ex-learnings-list">
                      {site.learnings.map((item) => (
                        <li key={item}>
                          <span className="ex-check" aria-hidden="true">
                            <Check size={14} strokeWidth={3} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Gallery */}
                <div
                  className="ex-gallery"
                  role="group"
                  aria-label={`${site.name} photos`}
                >
                  {site.photos.slice(0, 5).map((photo, photoIndex) => (
                    <button
                      type="button"
                      key={photo}
                      className="ex-tile"
                      onClick={(e) =>
                        openLightbox(siteIndex, photoIndex, e.currentTarget)
                      }
                      aria-label={`Open photo ${photoIndex + 1} of ${
                        site.photos.length
                      }: ${site.name}`}
                      aria-haspopup="dialog"
                    >
                      <img
                        src={photo}
                        alt={`${site.name}, photo ${photoIndex + 1}`}
                        loading="lazy"
                      />
                      {photoIndex === 0 && (
                        <span className="ex-tile-badge">
                          <Camera size={14} aria-hidden="true" />
                          View {site.photos.length} photos
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ── Closing band ──────────────────────────────────────────────── */}
        <section className="ex-cta" aria-labelledby="ex-cta-heading">
          <div className="ex-container ex-cta-inner">
            <div className="ex-cta-text">
              <h2 id="ex-cta-heading">Ready to choose your excursion?</h2>
              <p>
                Tell us which site you would like to visit. Questions about the
                field visits? Our team can help you plan your time at EA-ISC
                2026.
              </p>
            </div>
            <div className="ex-cta-actions">
              <a
                href={EXCURSION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ex-btn ex-btn-primary"
              >
                Pick Your Preferred Excursion
                <ExternalLink size={16} aria-hidden="true" />
              </a>
              <Link to="/contact" className="ex-btn ex-btn-outline">
                Contact the Team
              </Link>
              <Link to="/registration-abstract" className="ex-btn ex-btn-outline">
                Register for the Conference
              </Link>
            </div>
          </div>
        </section>

        {/* ── Lightbox ──────────────────────────────────────────────────── */}
        {lightbox && activeSite && (
          <div
            className="ex-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeSite.name} photo viewer`}
            onClick={closeLightbox}
          >
            <button
              type="button"
              className="ex-lightbox-close"
              onClick={closeLightbox}
              ref={closeButtonRef}
              aria-label="Close photo viewer"
            >
              <X size={22} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="ex-lightbox-nav ex-lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={28} aria-hidden="true" />
            </button>

            <figure
              className="ex-lightbox-figure"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeSite.photos[lightbox.photo]}
                alt={`${activeSite.name}, photo ${lightbox.photo + 1}`}
              />
              <figcaption>
                <strong>{activeSite.name}</strong>
                <span>
                  {lightbox.photo + 1} / {activeSite.photos.length}
                </span>
              </figcaption>
            </figure>

            <button
              type="button"
              className="ex-lightbox-nav ex-lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
            >
              <ChevronRight size={28} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ExcursionPage;