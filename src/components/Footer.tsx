// components/Footer.tsx

import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
 
  





  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-section about">
            <h3>1st Eastern Africa Indigenous Seed Conference 2026</h3>
            <p className="footer-description">
              The 1st Eastern Africa Indigenous Seed Conference brings together
              farmers, researchers, policymakers, and seed advocates to champion
              seed sovereignty and strengthen farmer-managed seed systems across
              the region.
            </p>
            <div className="footer-social">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <span className="social-icon">in</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="X / Twitter"
              >
                <span className="social-icon">x</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <span className="social-icon">fb</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="YouTube"
              >
                <span className="social-icon">yt</span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="/about">About the Conference</a>
              </li>
              <li>
                <a href="/registration-abstract">Registration</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>For Attendees</h4>
            <ul className="footer-links">
              <li>
                <a href="/accommodation">Accommodation</a>
              </li>
              <li>
                <a href="/contact">Venue Information</a>
              </li>
              <li>
                <a href="/faqs">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">mail</span>
                <a href="mailto:info@eaindigenousseedconference.org">
                  info@eaindigenousseedconference.org
                </a>
              </li>
              <li>
                <span className="contact-icon">call</span>
                <a href="tel:+254712451777">+254 712 451 777</a>
              </li>
              <li>
                <span className="contact-icon">pin</span>
                <span>
                  Catholic university of Eastern Africa, Nairobi, Kenya
                </span>
              </li>
              <li>
                <span className="contact-icon">date</span>
                <span>17–20 November 2026</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Collapsible FAQ Section 
        <div className="footer-faq-container">
          <button
            className={`footer-faq-header ${faqExpanded ? "expanded" : ""}`}
            onClick={toggleFaqSection}
            aria-expanded={faqExpanded}
          >
            <div className="faq-header-left">
              <span className="faq-section-badge">Inquiries</span>
              <h4>Frequently Asked Questions</h4>
              <p className="footer-faq-subtitle">
                Common questions about the conference
              </p>
            </div>
            <div className="faq-header-right">
              <span className="faq-header-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  {faqExpanded ? (
                    <path d="M18 12H6" strokeLinecap="round" />
                  ) : (
                    <path d="M12 6v12M6 12h12" strokeLinecap="round" />
                  )}
                </svg>
              </span>
            </div>
          </button>

        </div>*/}

        {/* Footer Bottom with Powered by KSPACE */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              (c) {currentYear} 1st Eastern Africa Indigenous Seed Conference.
              All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="/privacy">Privacy Policy</a>
              <span className="separator">|</span>
              <a href="/terms">Terms of Use</a>
              <span className="separator">|</span>
              <a href="/cookies">Cookie Policy</a>
              <span className="separator">|</span>
              <a href="/accessibility">Accessibility</a>
            </div>
          </div>

          {/* Powered by KSPACE */}
          <div className="footer-powered-wrapper">
            <div className="footer-powered">
              <span className="powered-text">Powered by</span>
              <a
                href="https://njenga993.github.io/kspace/"
                target="_blank"
                rel="noopener noreferrer"
                className="powered-link"
              >
                <span className="powered-link-text">KSPACE</span>
                <span className="powered-link-arrow">→</span>
              </a>
            </div>
            <div className="powered-decoration"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
