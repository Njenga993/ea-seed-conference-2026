// pages/CallForSideEventsPage.tsx
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/CallForSideEventsPage.css";

import heroBackground from "../assets/side_event.jpg";

// Swap in the real poster file for this side event.
import sideEvent1Poster from "../assets/side1.png";
import sideEvent2Poster from "../assets/image_icraf.png";
import sideEvent3Poster from "../assets/side3.png";
import sideEvent4Poster from "../assets/side4.jpeg";
import sideEvent5Poster from "../assets/side5.png";
import sideEventAF from "../assets/Agroecologyfund.png";
import sideEventDCA from "../assets/DCA.png";
import sideEventSIDAA from "../assets/SIDAA.png";
import sideEventPELUM from "../assets/PELUM.png";
import sideEventWomen from "../assets/awc_sideevent.png";
import sideEventSWISSDCA from "../assets/SwissaidDCA.png";
import sideEventBiovision from "../assets/BioVision.png";
import sideEventOpenSource from "../assets/OSSeeds.png";
import sideEventPFF from "../assets/PFF.png";

// ── Data ─────────────────────────────────────────────────────────────────────

const sideEventBenefits = [
  {
    title: "50-Seat Dedicated Venue",
    description:
      "Your side event takes place in a professionally set-up 50-seat conference room — fully equipped, staffed, and ready for your audience.",
  },
  {
    title: "Free Exhibition Space",
    description:
      "Every side event organiser receives a complimentary exhibition booth for all 4 conference days — a USD 500 value included at no extra cost.",
  },
  {
    title: "Programme Listing",
    description:
      "Your side event is listed in the official EA-ISC 2026 conference programme, on digital signage, and on the conference website.",
  },
  {
    title: "Dedicated Promotion",
    description:
      "We promote your session to all registered attendees via email, social media, and the conference app ahead of the event.",
  },
  {
    title: "Networking Access",
    description:
      "Side event organisers receive 2 full conference passes, granting access to all plenary sessions, thematic tracks, and networking events.",
  },
];

const DELEGATE_REGISTRATION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScXE_pElTxbyW1ldeVHAetgplwecHxrdHHCSYzY3P_-Onrn4A/viewform";

const whoCanOrganise = [
  "Research Institutions and Universities",
  "International NGOs and Development Agencies",
  "Government Ministries and Agencies",
  "Seed Companies and Agri-Businesses",
  "Farmer Networks and Cooperatives",
  "Civil Society and Advocacy Groups",
  "AgriTech and Digital Innovation Firms",
  "Foundations and Philanthropic Organisations",
];

const sideEventTypes = [
  {
    heading: "Thematic Workshops",
    body: "Run a focused, participatory workshop on a topic central to indigenous seed systems — policy, agronomy, gender, climate, or nutrition.",
  },
  {
    heading: "Roundtables and Dialogues",
    body: "Convene a multi-stakeholder dialogue around a pressing issue, bringing together farmers, scientists, policymakers, and civil society.",
  },
  {
    heading: "Product or Research Launches",
    body: "Use the conference platform to launch a new publication, tool, dataset, product, or research initiative to a regional expert audience.",
  },
  {
    heading: "Training and Capacity Building",
    body: "Deliver a hands-on training session — seed identification, agro-ecological practices, digital tools, or organisational capacity.",
  },
  {
    heading: "Film Screenings and Showcases",
    body: "Screen a documentary, multimedia piece, or community-produced visual story related to seeds, food sovereignty, or farming traditions.",
  },
  {
    heading: "Network or Coalition Meetings",
    body: "Host a closed or open meeting of your network, project consortium, or regional coalition — with full AV and streaming support.",
  },
];

interface ConfirmedSideEvent {
  title: string;
  organisers: string;
  description: string[]; // paragraph 1 is used as the card snippet; all paragraphs show in the popup
  poster: string;
}

// Confirmed side events already scheduled for EA-ISC 2026. Add the next
// one as another object in this array — the grid below handles any number.
const confirmedSideEvents: ConfirmedSideEvent[] = [
  {
    title:
      "Building Collective Power on Food Sovereignty, Environmental Justice, and Farmers' Rights",
    organisers:
      "Seed Savers Network, Kenya Left Alliance & Ukombozi Library  with support from the Rosa Luxemburg Stiftung",
    description: [
      "People in rural and urban communities may experience different realities, but many of their struggles are connected - from rising costs of living and food, insecure livelihoods and environmental degradation to limited power over decisions that shape their everyday lives.",
      "At the 1st Eastern Africa Indigenous Seed Conference, Seed Savers Network, Kenya Left Alliance and Ukombozi Library, with support from the Rosa Luxemburg Stiftung, will convene a side event to explore how these struggles can be connected through collective action and solidarity.",
      "The session will bring together farmers, social justice activists, community organisers and other allies to examine the links between social justice, environmental justice, climate justice, food sovereignty and farmers' rights. It will create space to share experiences, build alliances and identify opportunities for coordinated advocacy and action.",
      "The event aims to move beyond individual struggles towards building collective power for more just, democratic and community-centred food and social systems.",
    ],
    poster: sideEvent1Poster,
  },
  {
    title:
      "Defining the Role of Farmers and Communities in Strengthening Tree Seed Systems for Inclusive Landscape Restoration",
    organisers: "Landscape Alliance",
    description: [
      "This side event aims to identify gaps, opportunities and effective models for engaging farmers, communities, seed source custodians, nursery operators and local enterprises in the collection, storage, production, distribution and planting of native tree seeds and seedlings - and to facilitate stakeholder dialogue, peer learning and joint action toward recommendations for integrating functional tree seed systems into policies, advocacy and restoration practices that support biodiversity conservation, climate resilience and inclusive rural livelihoods.",
      "The outcome of the event will be recommendations for integrating tree seed systems into broader advocacy and practice, in support of delivering the right tree in the right place for the right purpose - enabling tree-planting-based biodiversity conservation, climate resilience, restoration success and inclusive rural livelihood development.",
    ],
    poster: sideEvent2Poster,
  },
  {
    title:
      "Gender Equality and Social Inclusion in Farmer-Managed Seed Systems: Farmers’ Experiences and Perspectives",
    organisers: "Rural Women Cultivating Change Project: Seed Change, Seed Savers Network, ISD- Ethiopia, TGNP, GROOTS- Kenya, HIVOS, We Action, PELUM Tanzania",
    description: [
      "The side event puts farmers’ voices at the centre of the question: Has participation become power? It will explore how gender and social relations shape knowledge, access, decision-making, recognition, leadership and benefits in farmer-managed seed systems (FMSS), while creating space for farmers to share their knowledge and experience and identify practical actions and policy priorities for more equitable, socially inclusive and resilient seed systems.",
      "Farmer-managed seed systems (FMSS) maintain seed diversity, conserve locally adapted varieties, sustain indigenous knowledge and strengthen the resilience of farming communities. Farmers, particularly women, hold significant knowledge of seed selection, production, conservation, storage, and exchange, and play a central role in passing this knowledge across generations.",
      "Yet seed systems are not gender or socially neutral. Gender norms and other social factors, including age, disability, socio-economic status, access to land and resources, and location, shape who does seed-related work, who has access to and control over seed and productive resources, whose knowledge is recognised, who takes part in decisions and leadership, and who benefits. Women and other groups may hold substantial seed knowledge and do much of the work of selection, conservation and exchange, but this does not reliably translate into recognition, control over resources, decision-making power, leadership or benefits. Many seed initiatives have focused on participation without sufficiently examining these underlying relations. Recognition of women’s knowledge and contribution is important, but gender transformation also requires attention to the redistribution of labour, resources, benefits and decision-making power.",
      "The central question is whether participation has become power. The side event puts this question to farmers, in their own words, before policymakers, researchers and other seed-system actors. It creates space for farmers to share knowledge and practices refined and passed down over generations, and to shape the actions and policy priorities that affect their seed systems.",
    ],
    poster: sideEvent3Poster,
  },
  {
    title:
      "Increasing space for farmers' seeds in Eastern Africa: Regional Experiences, Case Studies and Policy Lessons",
    organisers: "Swissaid, CEFROHT, Seed Savers Network,  TABIO, South- South Seed Continuum",
    description: [
      "To strengthen recognition and support for farmers’ seed systems in Eastern Africa by sharing regional experiences, case studies and policy lessons, and identifying opportunities to create greater policy and practical space for farmers’ seeds.",
      "This side event will provide a regional platform for sharing experiences, case studies and policy lessons from Eastern African countries, including Kenya, Tanzania, Uganda, Ethiopia, Somalia, Rwanda and Burundi.",
      "The side event will consolidate evidence and lessons from across the region to inform ongoing policy processes, protect gains already made, and strengthen coordinated advocacy and collaboration among farmer organisations, civil society, researchers, regulators and policymakers towards an enabling policy environment for farmers’ seeds.",
      "Through country experiences and multi-stakeholder dialogue, participants will explore how existing laws and policies affect FMSS in practice, identify recurring regulatory and implementation challenges, and examine opportunities to strengthen the recognition and protection of farmers’ seed rights.",
    ],
    poster: sideEvent4Poster,
  },
  {
    title:
      "Indigenous Seed Conservation Practices",
    organisers: "Trax Ghana , 11th hour foundation and The Beela Project",
    description: [
      "To promote and highlight the local and indigenous practices that farmers use in seed selection, processing, and conservation",
      "The side event is about highlighting the role of indigenous knowledge and practices for seed conservation and agricultural biodiversity. The side event will be led by farmers who will demonstrate practical and hands-on indigenous knowledge that they have been using to store and preserve their seeds.",
      "Farmers will begin by sharing the local knowledge used in seed selection. Farmers will then proceed to showcase the natural biopesticides such as herbs, tree bark, wood ash, etc., used in seed treatment for seed storage. This aspect of the side event will highlight the importance of using locally available materials for seed processing and storage.",
      "Farmers will also showcase storage materials, such as gourds and clay bowls used to store seeds. This side event is about emphasizing farmers' local and indigenous knowledge and practices for seed processing and storage. ",
    ],
    poster: sideEvent5Poster,
  },
  {
    title:
      "Open-source for Seed Sovereignty, Biodiversity and Food Security",
    organisers: "Agrecol-Germany, Misereor and Seed Savers Network Kenya",
    description: [
      "To promote dialogue and collaboration on Open-Source Seed Systems as a practical approach for strengthening farmer-managed seed systems.",
      "The side event, co-organised by Agrecol, Germany, and Seed Savers Network Kenya, will explore how Open-Source Seed Systems (OSS) can strengthen Farmer-Managed Seed Systems, conserve agricultural biodiversity and advance Farmers’ Rights in Eastern Africa.",
      "Farmer-managed seed systems supply the majority of seed used by smallholder farmers in the region, yet access to, exchange and further development of farmer varieties can be constrained by restrictive intellectual property regimes. Open-Source Seed Systems offer an alternative by allowing varieties to be saved, exchanged and further developed while protecting them and their progenies against privatisation through open-source agreements.",
      "The two-hour participatory side event will bring together farmer practitioners, community seed bank representatives, plant breeders, researchers, civil society organisations, development partners and policymakers. Following introductory presentations by farmers and Seed Savers Network Kenya staff, participants will work in small groups to develop an open-source seed system concept for a farmer community. The groups will identify practical steps, relevant stakeholders and their contributions, and opportunities for documenting and sharing results. ",
      "The session will conclude with the development of preliminary roadmaps for action, helping participants identify opportunities to integrate open-source approaches into existing seed initiatives. Ultimately, the side event aims to build partnerships and promote practical strategies for keeping farmer varieties accessible as a shared resource, supporting public-interest plant breeding and strengthening resilient, diverse and equitable seed systems across Eastern Africa. ",
    ],
    poster: sideEventOpenSource,
  },
  {
    title:
      "Whose Seeds Count? Advancing Farmers’ Seed Rights and Inclusive Recognition of Farmer Varieties in East Africa",
    organisers: "SIDA, OXFAM, ESAFF UGANDA, NORAD, HEX EPER, CEFROHT, KENYAN PEASANTS LEAGUE, LA VIA CAMPESINA",
    description: [
      "To strengthen regional recognition and support for farmer-managed seed systems and farmers’ seed rights by ensuring that Ugandan small-scale farmers’ experiences and priorities conto the 1st Eastern Africa Indigenous Seed Conference and its emerging regional Community of Practice.tribute",
      "East Africa has diverse seed systems that support food security, agricultural biodiversity and small-scale farmers’ livelihoods. Farmer-managed seed systems remain essential through the saving, selection, conservation and exchange of locally adapted varieties",
      "However, these systems face increasing pressure from climate change, loss of indigenous varieties, commercialisation of seed systems and limited recognition of farmers’ rights.",
      "There is therefore a need to strengthen regional collaboration and ensure that farmers’ knowledge, practices and priorities are recognised in seed policy and development processes.",
      "The session will conclude with the development of preliminary roadmaps for action, helping participants identify opportunities to integrate open-source approaches into existing seed initiatives. Ultimately, the side event aims to build partnerships and promote practical strategies for keeping farmer varieties accessible as a shared resource, supporting public-interest plant breeding and strengthening resilient, diverse and equitable seed systems across Eastern Africa.The 1st Eastern Africa Indigenous Seed Conference provides ESAFF Uganda with an important platform to amplify farmers’ voices, strengthen partnerships and advance advocacy for farmers’ seed rights. Through participation and a dedicated side event, ESAFF Uganda will promote dialogue on farmer variety registration and the implementation of Article 9 of the International Treaty on Plant Genetic Resources for Food and Agriculture (ITPGRFA), which addresses Farmers’ Rights. Support for this engagement will help generate practical policy recommendations, strengthen regional collaboration and advance more inclusive seed systems that contribute to food sovereignty and resilient livelihoods. ",
    ],
    poster: sideEventSIDAA,
  },
  {
    title:
      "Facilitating inter-generational knowledge sharing on indigenous seeds and farm diversity for a climate resilient and food secure future",
    organisers: "DCA Uganda",
    description: [
      "To provoke public discussions on indigenous seeds and farm diversity for a climate resilient and food.",
      "Smallholder farmers in the two targeted districts of Amudat and Nakapiripirit in the Karamoja sub-region currently face numerous challenges that undermine their sustainable access to diverse and climate resilient seeds.",
    ],
    poster: sideEventDCA,
  },
  {
    title:
      "Beyond Seed Conservation: Advancing Indeginous Seed Sovereignity Through BioInputs and Reduced Reliance on Hghly Hazardous Pesticides",
    organisers: "PELUM Kenya",
    description: [
      "Highlight the implications of the Highly Hazardous Pesticides (HHPs) on indeginous seed systems, biodiversity , human health and ecological resilience",
        "Showcase emerging opportunities, Innovations and experience in Bio-Inputs production, accessibility and adoption within Agroecology farming Systems.",
    " Facilitate dialogue on practical strategies and policy action for scaling dafe Bio Inputs and reducing depennce on harzanous pesticides to strengthen farmer managed seed systems(FMSS)."
    ],
    poster: sideEventPELUM,
  },
  {
    title:
      "Indeginous Seeds, Nutrition and Resilience: Finding and reccomedations from farmer led research.",
    organisers: " African Women's Collaborative for Healthy Food System",
    description: [
      "The Emphirical Study of Nutritional African Foods.",
      "Nutritional Assessment of the Ten Climate-Resilient Food Crops.",
      "Highlight the contribution of African nutrional foods and climate resilient crops to healthy diverse and resilient food systems.",
      "provide space for women farmers to reflect on the research findings and their practical implications."
    ],
    poster: sideEventWomen,
  },
  {
    title:
      "Strengthening FMSS for Resilient and Agroecological Food Futures in Eastern Africa",
    organisers:"Agroecology Fund",
    description: [
      "To provide a platform for Agroecology Fund-supported seed initiatives to share experiences, exchange promising practices and strengthen collaboration on farmer-managed seed systems, seed sovereignty and agroecological transitions.",
      "The side event will provide a platform for dialogue, knowledge exchange, and collective action among farmers, community seed bank practitioners, researchers, policymakers, civil society organizations, and other stakeholders working to safeguard seed diversity and promote seed sovereignty.",
        "Globally, farmers and communities continue to play a vital role in conserving, regenerating, exchanging, and improving indigenous and locally adapted seeds. However, community seed systems face growing challenges, including biodiversity loss, climate change, restrictive seed policies, limited recognition of farmers’ rights, and inadequate support for community-led seed conservation initiatives.",
        "The side event will explore practical approaches to strengthening community seed systems, enhancing farmers’ access to diverse and resilient seeds, and recognizing seeds as a common heritage essential to food sovereignty and agroecological transformation. Through interactive discussions, experience sharing, and reflection on policy and practice, participants will highlight successful community-led initiatives, identify existing gaps, and explore opportunities for collaboration across the region.",
        "Particular attention will be given to the role of community seed banks, farmer-managed seed networks, youth and women in sustaining seed diversity and advancing resilient food systems. The event will conclude with shared recommendations and actionable commitments to strengthen community seed systems, promote enabling policy environments, and ensure that farmers remain central to the conservation and use of agricultural biodiversity."
    ],
    poster: sideEventAF,
  },
  {
    title:
      "Role of the community seed bank in addressing and strengthening Emergency seed response and climate resilience in Eastern Africa",
    organisers: "  Swissaid, DCA Kenya, Seed Savers Network",
    description: [
      "Share practical experiences and lessons on the role of community seed banks in emergency seed response and post-disaster recovery",
      "The 1st Eastern Africa Indigenous Seed Conference 2026 provides an important platform for farmers, policymakers, researchers, civil society organizations, and seed advocates to exchange knowledge and develop strategies for protecting indigenous seeds and strengthening farmer-managed seed systems across Eastern Africa.",
        "Across the region, farming communities increasingly face the effects of climate change, including prolonged droughts, unpredictable rainfall, floods, crop failures, and declining agricultural biodiversity. These challenges threaten food security, agricultural livelihoods, and farmers’ ability to access diverse and locally adapted seeds, particularly in arid and semi-arid lands (ASALs) and other climate-vulnerable areas.",
        "Emergency seed preparedness and response  is an important intervention following climate-related disasters and other shocks. However, conventional emergency seed responses often rely on externally sourced, commercially available, or formally certified seeds, which may not adequately reflect farmers’ preferences, local growing conditions, cultural practices, and diverse seed needs. Delays in seed distribution and limited availability of locally adapted varieties can further undermine the effectiveness of emergency interventions.",
        "This side event will provide a platform to examine how community seed banks can contribute to effective emergency seed response, climate adaptation, and resilient farmer-managed seed systems. It will draw on practical experiences from Eastern Africa, with particular attention to community-led approaches in drought-prone and climate-vulnerable farming communities"
    ],
    poster: sideEventSWISSDCA,
  },
  {
    title:
      "Efficient governance and coordination structures for the domestication of the African union FMSS framework",
    organisers: " Biovision Africa Trust",
    description: [
      "To explore practical approaches for domesticating and implementing the African Union Farmer-Managed Seed Systems (FMSS) Framework in Eastern Africa by strengthening policy alignment, institutional coordination, county-level implementation, and community seed bank support, while promoting cross-border seed exchange, circular seed economies, and the recognition of farmers as custodians of seed diversity.",
      "The African Union Farmer Managed Seed Systems (FMSS) Framework offers African countries its first continental roadmap for recognising the seed systems that feed most of its farmers, but only if it moves from paper into national policy, county budgets and community seed banks.",
        "This session asks what governance and coordination it takes to domesticate the Framework in Eastern Africa, with the EAC, the Kenyan and Ugandan ministries of agriculture, Kenya’s national gene bank, county governments and farmer seed custodians weighing in on cross-border exchange, circular seed economies and practical next steps."
    ],
    poster: sideEventBiovision,
  },
  {
    title:
      "POWER FOR FOOD PARTNERSHIP",
    organisers: " POWER FOR FOOD PARTNERSHIP- IKEA FOUNDATION, SNV, SEED SAVERS NETWORK, CO-ELIB. KILIMO TRUST, WORLD VEG, GREEN ZONE KENYA, BOP INC, KEREA , SOCAA",
    description: [
      "To facilitate cross-country knowledge exchange and strengthen regional partnerships.",
      "To showcase country experiences, evidence and case studies on regenerative agriculture, the productive use of renewable energy (PURE)",
        "For the Power for Food Partnership (P4FP), the conference creates a strategic platform that will bring regional actors from Rwanda, Uganda, Kenya and Ethiopia to share country experiences, case studies and emerging evidence on the integration of Regenerative Agriculture and the Productive Use of Renewable Energy (RA-PURE).",
        "The side event will provide a platform for countries to demonstrate how the RA-PURE nexus can contribute to more productive, resilient and inclusive food systems, while identifying the conditions required for successful adoption and scaling. It will foster cross-country learning, identify complementary strengths and promote coordinated regional action, demonstrating how collective efforts can accelerate systems change and transform East Africa's food systems more effectively than isolated interventions.",
        "The side event will serve as a catalyst for action rather than simply a communication platform. It will convene key actors across agriculture, energy, finance, research and policy to showcase evidence The conference provides a timely regional platform for P4FP to share emerging evidence, farmer adoption and viable business cases can translate regenerative agriculture and productive use of renewable energy into investable solutions."
    ],
    poster: sideEventPFF,
  },
];

// ── Structured data ───────────────────────────────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "EA-ISC 2026 Side Events",
  description:
    "Call for Side Event Organisers at the 1st Eastern Africa Indigenous Seed Conference 2026, Nairobi, Kenya.",
  startDate: "2026-11-17",
  endDate: "2026-11-20",
  location: {
    "@type": "Place",
    name: "Catholic University of Eastern Africa, Nairobi, Kenya",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
const CallForSideEventsPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const activeEvent =
    activeIndex !== null ? confirmedSideEvents[activeIndex] : null;

  const openModal = (index: number, trigger: HTMLElement) => {
    lastTriggerRef.current = trigger;
    setActiveIndex(index);
  };

  const closeModal = () => {
    setActiveIndex(null);
    // Return focus to the button that opened the popup
    lastTriggerRef.current?.focus();
  };

  // Escape to close, lock page scroll while open, focus the close button
  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
        lastTriggerRef.current?.focus();
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
  }, [activeIndex]);

  return (
    <>
      <Helmet>
        <title>Call for Side Events | EA-ISC 2026</title>
        <meta
          name="description"
          content="Organise a side event at the 1st Eastern Africa Indigenous Seed Conference 2026. A 100-seat venue with full AV, live streaming, and a free exhibition booth included. Fee: USD 10,000."
        />
        <link
          rel="canonical"
          href="https://eaindigenousseedconference.org/call-for-side-events"
        />
        <meta property="og:title" content="Call for Side Events | EA-ISC 2026" />
        <meta
          property="og:description"
          content="Host your own session at EA-ISC 2026 — a 50-seat room, full AV, live streaming, and a free exhibition booth. Apply now."
        />
        <meta
          property="og:url"
          content="https://eaindigenousseedconference.org/call-for-side-events"
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="side-events-page">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          className="side-events-hero"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="hero-overlay" />
          <div className="hero-container">
            <nav className="hero-breadcrumb" aria-label="Breadcrumb">
              <a href="/" className="breadcrumb-link">Home</a>
              <span aria-hidden="true">/</span>
              <span className="current">Call for Side Events</span>
            </nav>

            <div className="hero-content">
              <div className="hero-eyebrow">
                EA-ISC 2026 · Catholic University of Eastern Africa, Nairobi, Kenya
              </div>
              <h1>Call for Side Events</h1>
              <p className="hero-description">
                Host your own session at the 1st Eastern Africa Indigenous Seed
                Conference. A 50-seat venue with full audio-visual equipment,
                live streaming support, and a complimentary exhibition booth — all
                included for organisations ready to lead meaningful conversations
                on indigenous seed systems.
              </p>

              <div className="hero-cta-row">
                <a href="#apply" className="btn-hero-primary">
                  Apply to Organise a Side Event
                </a>
                <div className="hero-meta-badges">
                  <span className="meta-badge">Nov 17–20, 2026</span>
                  <span className="meta-badge">Nairobi, Kenya</span>
                  <span className="meta-badge meta-badge-alert">
                    Limited slots  apply early
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Invitation ────────────────────────────────────────────────── */}
        <section className="content-section">
          <div className="container narrow">
            <h2>An Invitation to Lead a Conversation</h2>
            <p className="lead-text">
              The EA-ISC 2026 Organising Committee warmly invites organisations,
              networks, and institutions to propose and host a side event during the{" "}
              <strong>1st Eastern Africa Indigenous Seed Conference</strong>, taking
              place from <strong>17th – 20th November 2026</strong> at the{" "}
              <strong>Catholic University of Eastern Africa, Nairobi, Kenya</strong>.
            </p>
            <p className="lead-text">
              Side events offer a dedicated space  separate from the main
              conference programme  to convene your community, launch new work,
              run a focused workshop, or spark a regional dialogue. With a
              50-seat room, professional AV, and live streaming support, your
              session can reach both the conference floor and a global audience
              simultaneously.
            </p>

            <div className="intro-stats">
              {[
                { number: "50", label: "Seats per Side Event" },
                { number: "500+", label: "Conference Attendees" },
                { number: "20+", label: "Countries Represented" },
                { number: "4", label: "Conference Days" },
              ].map(({ number, label }) => (
                <div className="stat-card" key={label}>
                  <span className="stat-number">{number}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Package Highlight ─────────────────────────────────────────── */}
        <section className="content-section bg-light">
          <div className="container narrow">
            <h2 className="text-center">The Side Event Package</h2>
            <p className="section-subtitle text-center">
              One fee. Everything you need to run a high-impact session 
              including a free exhibition space for the full conference.
            </p>

            <div className="package-card">
              {/* Left — price */}
              <div className="package-left">
                <span className="package-label">Side Event Fee</span>
                <div className="package-price">
                  <span className="package-currency">USD</span>
                  <span className="package-amount">10,000</span>
                </div>
                <p className="package-sub">Per organiser · one side event slot</p>

                {/* Free booth callout */}
                <div className="free-booth-badge">
                  <span className="free-booth-icon" aria-hidden="true">&#10003;</span>
                  <div>
                    <strong>Includes a free exhibition booth</strong>
                    <p>
                      Full exhibition space for all 4 conference days —
                      a USD 500 value at no extra cost.
                    </p>
                  </div>
                </div>

                <a href="#apply" className="btn-register-now">
                  Apply Now
                </a>
              </div>

              {/* Right — what's included */}
              <div className="package-right">
                <h4 className="package-includes-title">What's included</h4>
                <ul className="package-features">
                  {[
                    "Exclusive use of a 50-seat conference room",
                    "Full audio-visual setup: projector, screen, microphones, PA",
                    "20 full conference passes (access to all sessions)",
                    "Complimentary exhibition booth — all 4 conference days",
                    "Listing in the official conference programme",
                    "Accomodation of delegates in standard accomodation facilities",
                    "Logo displayed on conference digital signage and website",
                    "Dedicated EA-ISC 2026 coordination team support",
                  ].map((item) => (
                    <li key={item}>
                      <span className="feature-check" aria-hidden="true">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="apply-cta-box delegate-cta-box">
  <div className="apply-cta-text">
    <h3>Already a confirmed side event organiser?</h3>
    <p>
      Register the 20 delegates who will receive complimentary conference
      passes with your side event package. Please submit all names through
      the form so we can prepare their badges and access.
    </p>
  </div>
  <a
    href={DELEGATE_REGISTRATION_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="btn-apply-external btn-register-delegates"
  >
    Register Your 20 Delegates
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </a>
</div>

        {/* ── Confirmed Side Events ─────────────────────────────────────── */}
        <section className="content-section">
          <div className="container">
            <h2 className="text-center">Confirmed Side Events</h2>
            <p className="section-subtitle text-center">
              A first look at the side events already lined up for EA-ISC 2026.
            </p>

            <div className="confirmed-side-events-grid">
              {confirmedSideEvents.map((event, index) => (
                <article className="side-event-card" key={event.title}>
                  <button
                    type="button"
                    className="side-event-poster"
                    onClick={(e) => openModal(index, e.currentTarget)}
                    aria-label={`View full details: ${event.title}`}
                  >
                    <img
                      src={event.poster}
                      alt={`Poster for ${event.title}`}
                      loading="lazy"
                    />
                    <span className="side-event-badge">Confirmed</span>
                  </button>

                  <div className="side-event-content">
                    <p className="side-event-organisers">{event.organisers}</p>
                    <h3 className="side-event-title">{event.title}</h3>
                    <p className="side-event-snippet">{event.description[0]}</p>

                    <button
                      type="button"
                      className="btn-read-more"
                      onClick={(e) => openModal(index, e.currentTarget)}
                      aria-haspopup="dialog"
                    >
                      Read more
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Side event popup ──────────────────────────────────────────── */}
        {activeEvent && (
          <div
            className="side-event-modal-backdrop"
            onClick={closeModal}
          >
            <div
              className="side-event-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="side-event-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="side-event-modal-close"
                onClick={closeModal}
                ref={closeButtonRef}
                aria-label="Close side event details"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path
                    d="M4 4l10 10M14 4L4 14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div className="side-event-modal-poster">
                <img
                  src={activeEvent.poster}
                  alt={`Poster for ${activeEvent.title}`}
                />
              </div>

              <div className="side-event-modal-body">
                <span className="side-event-modal-badge">Confirmed Side Event</span>
                <p className="side-event-organisers">{activeEvent.organisers}</p>
                <h3 id="side-event-modal-title" className="side-event-modal-title">
                  {activeEvent.title}
                </h3>
                {activeEvent.description.map((paragraph, i) => (
                  <p className="side-event-modal-text" key={i}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Benefits grid ─────────────────────────────────────────────── */}
        <section className="content-section bg-light">
          <div className="container">
            <h2 className="text-center">Why Organise a Side Event?</h2>
            <p className="section-subtitle text-center">
              Everything that comes with taking the lead at EA-ISC 2026.
            </p>
            <div className="benefits-grid">
              {sideEventBenefits.map(({ title, description }) => (
                <div className="benefit-card" key={title}>
                  <h3 className="benefit-title">{title}</h3>
                  <p className="benefit-desc">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who can organise ──────────────────────────────────────────── */}
        <section className="content-section">
          <div className="container">
            <h2 className="text-center">Who Can Organise a Side Event?</h2>
            <p className="section-subtitle text-center">
              We welcome proposals from any organisation working in or alongside
              the seed, food, agriculture, or conservation sectors.
            </p>
            <div className="who-grid">
              {whoCanOrganise.map((label) => (
                <div className="who-card" key={label}>
                  <span className="who-bullet" aria-hidden="true" />
                  <span className="who-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Side event types ──────────────────────────────────────────── */}
        <section className="content-section bg-light">
          <div className="container narrow">
            <h2>What Kind of Side Event Can You Host?</h2>
            <p className="lead-text">
              Side events can take many forms. Below are some of the most common
              formats  but we encourage creative and participatory proposals
              that go beyond the conventional conference session.
            </p>
            <div className="what-grid">
              {sideEventTypes.map(({ heading, body }) => (
                <div className="what-card" key={heading}>
                  <h4>{heading}</h4>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Application Form ──────────────────────────────────────────── */}
        <section className="content-section" id="apply">
          <div className="container narrow">
            <h2>Apply to Organise a Side Event</h2>
            <p className="lead-text">
              Complete the online application form to submit your side event
              proposal. Our team will review your application and respond within
              5 working days with feedback and next steps.
            </p>

            <div className="apply-cta-box">
              <div className="apply-cta-text">
                <h3>Ready to lead a session at EA-ISC 2026?</h3>
                <p>
                  Fill in the online form with your organisation details, a
                  description of your proposed session, and any specific
                  requirements. Slots are limited — apply early to secure your
                  preferred date and time.
                </p>
              </div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdUDLfN291bFxb4ybfMqzb1Lqvz0ywEpvO43rPr8ZbVGdHqiA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-apply-external"
              >
                Open Application Form
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <p className="apply-note">
              Prefer to reach us directly first? Email the side events team at{" "}
              <a href="mailto:sideevents@eaindigenousseedconference.org">
                sideevents@eaindigenousseedconference.org
              </a>
            </p>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="cta-section">
          <div className="cta-pattern-overlay" />
          <div className="container">
            <h2>Ready to Lead a Conversation?</h2>
            <p className="cta-text">
              Side event slots are limited. Submit your proposal early to
              secure your preferred date and time — and your complimentary
              exhibition space for all four days of EA-ISC 2026.
            </p>
            <div className="cta-buttons">
              <a href="#apply" className="btn btn-primary btn-cta-large">
                Apply Now
              </a>
              <a
                href="mailto:sideevents@eaindigenousseedconference.org"
                className="btn btn-secondary"
              >
                Contact the Side Events Team
              </a>
            </div>
            <p className="cta-sub">
              Questions? Email{" "}
              <a
                href="mailto:sideevents@eaindigenousseedconference.org"
                className="cta-email-link"
              >
                sideevents@eaindigenousseedconference.org
              </a>
            </p>
          </div>
        </section>

      </div>
    </>
  );
};

export default CallForSideEventsPage;