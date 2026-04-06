// components/HomeFocusAreas.tsx
import { motion } from "framer-motion";
import { useRef } from "react";
import type { Variants } from "framer-motion";
import "../styles/focus.css";

const FocusAreas = () => {
  const sectionRef = useRef(null);

  const focusAreas = [
    {
      id: 1,
      title: "Farmer-Managed Seed Systems in Practice",
      description:
        "Recognition and contribution of FMSS; indigenous practices and innovation in seed conservation, selection, production and preservation, seed fairs, community seed networks and farmer-to-farmer learning and exchange mechanisms; practices and lessons from community seed banking.",
      category: "Community Practice",
      keyTopics: [
        "Community Seed Banking",
        "Participatory Research",
        "Indigenous Livestock Conservation",
      ],
    },
    {
      id: 2,
      title: "Seeds, Climate Change and Resilience",
      description:
        "Highlighting the role of indigenous and local seed varieties in climate adaptation, emergency seed response and resilience building, and sustaining farmer livelihoods under changing environmental conditions.",
      category: "Environment & Climate",
      keyTopics: [
        "Climate Adaptation",
        "Emergency Response",
        "Resilient Livelihoods",
      ],
    },
    {
      id: 3,
      title: "Gender Equity and Social Inclusion in Seed Initiatives",
      description:
        "Exploring the central role of women and youth in seed conservation, selection, exchange, and leadership within FMSS, and strategies to strengthen youth and women-led seed initiatives and networks.",
      category: "Social Justice",
      keyTopics: [
        "Women Leadership",
        "Youth Engagement",
        "Intergenerational Knowledge",
      ],
    },
    {
      id: 4,
      title: "Market Innovations around Farmer Managed Seed Systems",
      description:
        "Exploring farmer-led and community-based seed enterprises; opportunities and challenges in local seed markets, and how seed business models can support livelihoods while safeguarding seed sovereignty.",
      category: "Economic Innovation",
      keyTopics: ["Seed Enterprises", "Local Markets", "Indigenous Foods"],
    },
    {
      id: 5,
      title: "Data Sovereignty and Trends in Farmer Managed Seed Systems",
      description:
        "Examining risks and threats with knowledge sharing on farmers seeds including Digital Sequencing Information, gene mapping, and genome editing. Strategies to ensure farmers retain power over data on their seeds and knowledge.",
      category: "Digital Rights",
      keyTopics: [
        "Digital Rights",
        "Traditional Knowledge",
        "Biopiracy Prevention",
      ],
    },
    {
      id: 6,
      title: "Policy Solutions and Opportunities for FMSS & Seed Sovereignty",
      description:
        "Reflecting on legal, policy, and governance frameworks supporting farmers' seeds. Advancing Farmers' Rights and identifying advocacy strategies at local, national, and regional levels.",
      category: "Policy & Governance",
      keyTopics: ["Farmers' Rights", "Policy Frameworks", "Regional Advocacy"],
    },
  ];

  // Professional animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const dividerVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="focus-section-pro" ref={sectionRef}>
      <div className="focus-container-pro">
        {/* Section Header - Professional */}
        <motion.div
          className="focus-header-pro"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <span className="focus-suptitle">Conference Tracks</span>
          <h2 className="focus-title-pro">Thematic Focus Areas</h2>
          <motion.div className="focus-divider" variants={dividerVariants} />
          <p className="focus-description-pro">
            The conference will be organised around six thematic tracks, guiding
            paper presentations, plenary discussions, panel sessions, posters,
            and exhibitions.
          </p>
        </motion.div>

        {/* Cards Grid - Professional Layout */}
        <motion.div
          className="focus-grid-pro"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {focusAreas.map((area) => (
            <motion.article
              key={area.id}
              className="focus-card-pro"
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="card-number">0{area.id}</div>
              <div className="card-content-pro">
                <span className="card-category-pro">{area.category}</span>
                <h3 className="card-title-pro">{area.title}</h3>
                <p className="card-description-pro">{area.description}</p>

                <div className="card-topics">
                  <span className="topics-label">Key topics:</span>
                  <div className="topics-list">
                    {area.keyTopics.map((topic, idx) => (
                      <span key={idx} className="topic-tag">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* <a href={`/theme/${area.id}`} className="card-link-pro">
                  <span>Learn more</span>
                  <svg className="link-icon" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M19 12L13 6M19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>*/}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Call to Action - Professional */}
        <motion.div
          className="focus-cta-pro"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="cta-content-pro">
            <h3 className="cta-title-pro">Call for Abstracts</h3>
            <p className="cta-description-pro">
              Submit your research, case studies, and insights aligned with the
              conference themes. Selected presentations will be featured in the
              conference proceedings.
            </p>
          </div>
          <div className="cta-actions">
            <a href="/how-to-submit-abstract" className="cta-button-primary">
              Abstracts Submission Guidelines
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FocusAreas;
