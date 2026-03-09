// components/HomeFocusAreas.tsx
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import "../styles/focus.css";

const FocusAreas = () => {
  const focusAreas = [
    {
      id: 1,
      title: "Seed Sovereignty",
      description: "Advancing the rights of farmers to save, exchange, and manage indigenous seed systems without external restrictions.",
      icon: "",
      category: "Rights & Governance"
    },
    {
      id: 2,
      title: "Farmer-Managed Seed Systems",
      description: "Strengthening community-based seed production, conservation, and local knowledge systems.",
      icon: "",
      category: "Community Practice"
    },
    {
      id: 3,
      title: "Climate Resilience",
      description: "Promoting indigenous seed diversity as a strategy for adapting to climate variability and ecological challenges.",
      icon: "",
      category: "Environment"
    },
    {
      id: 4,
      title: "Policy & Advocacy",
      description: "Creating enabling policy environments that protect traditional seed systems and farmer rights.",
      icon: "",
      category: "Governance"
    },
    {
      id: 5,
      title: "Regional Community of Practice",
      description: "Building collaborative platforms for knowledge exchange, partnerships, and sustained regional engagement.",
      icon: "",
      category: "Collaboration"
    },
    {
      id: 6,
      title: "Indigenous Knowledge",
      description: "Documenting and preserving traditional farming practices and seed conservation methods.",
      icon: "",
      category: "Heritage"
    }
  ];

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const featuredCardVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        delay: 0.2 + custom * 0.15,
        ease: [0.25, 0.1, 0.25, 1] // cubic-bezier values are fine as array
      }
    })
  };

  const secondaryCardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4 + custom * 0.1,
        ease: [0.25, 0.1, 0.25, 1] // cubic-bezier values are fine as array
      }
    })
  };

  const ctaVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: "easeOut"
      }
    }
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5
      }
    }
  };

  const tagVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1
      }
    }
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2
      }
    }
  };

  const decorationVariants: Variants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 0.7,
        delay: 0.3
      }
    }
  };

  const dotVariants: Variants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        delay: 0.5
      }
    }
  };

  const descriptionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4
      }
    }
  };

  const categoryVariants = (index: number, baseDelay: number): Variants => ({
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: baseDelay + index * 0.2,
        duration: 0.5
      }
    }
  });

  const cardTitleVariants = (index: number, baseDelay: number): Variants => ({
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: baseDelay + index * 0.2,
        duration: 0.5
      }
    }
  });

  const cardDescriptionVariants = (index: number, baseDelay: number): Variants => ({
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: baseDelay + index * 0.2,
        duration: 0.5
      }
    }
  });

  const secondaryHeaderVariants = (index: number): Variants => ({
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + index * 0.1,
        duration: 0.5
      }
    }
  });

  const secondaryTitleVariants = (index: number): Variants => ({
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + index * 0.1,
        duration: 0.5
      }
    }
  });

  const secondaryDescriptionVariants = (index: number): Variants => ({
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + index * 0.1,
        duration: 0.5
      }
    }
  });

  const ctaContentVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.3,
        duration: 0.6
      }
    }
  };

  const ctaTitleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.4,
        duration: 0.5
      }
    }
  };

  const ctaDescriptionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5,
        duration: 0.5
      }
    }
  };

  const ctaButtonVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.6,
        duration: 0.6
      }
    }
  };

  return (
    <section className="focus-section">
      <div className="focus-container">
        
        {/* Section Header with animation */}
        <motion.div 
          className="focus-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <motion.span 
            className="focus-header-tag"
            variants={tagVariants}
          >
            Conference Themes
          </motion.span>
          
          <motion.h2 
            className="focus-header-title"
            variants={titleVariants}
          >
            Theme & Focus Areas
          </motion.h2>
          
          <motion.div 
            className="focus-header-decoration"
            variants={decorationVariants}
          >
            <span className="decoration-line"></span>
            <motion.span 
              className="decoration-dot"
              variants={dotVariants}
            ></motion.span>
            <span className="decoration-line"></span>
          </motion.div>
          
          <motion.p 
            className="focus-header-description"
            variants={descriptionVariants}
          >
            The conference will explore key thematic areas that strengthen
            indigenous seed systems and advance seed sovereignty across
            Eastern Africa.
          </motion.p>
        </motion.div>

        {/* Featured Cards with staggered animation */}
        <motion.div 
          className="focus-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {focusAreas.slice(0, 2).map((area, index) => (
            <motion.article 
              key={area.id} 
              className="focus-card featured"
              variants={featuredCardVariants}
              custom={index}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="focus-card-media"
                variants={iconVariants}
              >
                <motion.span 
                  className="focus-card-icon"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {area.icon}
                </motion.span>
              </motion.div>
              <div className="focus-card-content">
                <motion.span 
                  className="focus-card-category"
                  variants={categoryVariants(index, 0.3)}
                >
                  {area.category}
                </motion.span>
                <motion.h3 
                  className="focus-card-title"
                  variants={cardTitleVariants(index, 0.4)}
                >
                  {area.title}
                </motion.h3>
                <motion.p 
                  className="focus-card-description"
                  variants={cardDescriptionVariants(index, 0.5)}
                >
                  {area.description}
                </motion.p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Regular Cards Grid with staggered animation */}
        <motion.div 
          className="focus-grid-secondary"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {focusAreas.slice(2).map((area, index) => (
            <motion.article 
              key={area.id} 
              className="focus-card"
              variants={secondaryCardVariants}
              custom={index}
              whileHover={{ 
                y: -6,
                boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="focus-card-header"
                variants={secondaryHeaderVariants(index)}
              >
                <motion.span 
                  className="focus-card-icon-small"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  {area.icon}
                </motion.span>
                <span className="focus-card-category-small">{area.category}</span>
              </motion.div>
              
              <motion.h3 
                className="focus-card-title-small"
                variants={secondaryTitleVariants(index)}
              >
                {area.title}
              </motion.h3>
              
              <motion.p 
                className="focus-card-description-small"
                variants={secondaryDescriptionVariants(index)}
              >
                {area.description}
              </motion.p>
            </motion.article>
          ))}
        </motion.div>

        {/* Call to Action with animation */}
        <motion.div 
          className="focus-cta"
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.div 
            className="focus-cta-content"
            variants={ctaContentVariants}
          >
            <motion.h3 
              className="focus-cta-title"
              variants={ctaTitleVariants}
            >
              Want to present in one of these themes?
            </motion.h3>
            <motion.p 
              className="focus-cta-description"
              variants={ctaDescriptionVariants}
            >
              Submit your abstract and join the conversation on seed sovereignty in Eastern Africa.
            </motion.p>
          </motion.div>
          
          <motion.a 
            href="/registration-abstract" 
            className="focus-cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={ctaButtonVariants}
          >
            <span>Submit Your Abstract</span>
            <motion.svg 
              className="button-arrow" 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <path d="M5 10H15M15 10L11 6M15 10L11 14" strokeLinecap="round"/>
            </motion.svg>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

export default FocusAreas;