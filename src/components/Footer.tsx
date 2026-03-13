// components/Footer.tsx
import { useState } from "react";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [faqExpanded, setFaqExpanded] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "When is the abstract submission deadline?",
      answer: "The abstract submission deadline is August 15, 2026. Late submissions may be considered until August 31, 2026, subject to space availability."
    },
    {
      question: "How do I register for the conference?",
      answer: "Registration is available through our online portal. Visit the Registration page, select your category, and complete the payment process. Early bird registration ends October 31, 2026."
    },
    {
      question: "Are there travel grants available?",
      answer: "Limited travel grants are available for farmers, students, and researchers from Eastern Africa. Applications must be submitted by July 31, 2026."
    },
    {
      question: "What is the visa application process?",
      answer: "Registered participants will receive an invitation letter to support visa applications. We recommend applying at least 8 weeks before the conference."
    },
    {
      question: "Will sessions be recorded?",
      answer: "Yes, plenary sessions will be recorded and made available to registered participants post-conference. Workshops and parallel sessions will not be recorded."
    },
    {
      question: "Is accommodation provided?",
      answer: "Accommodation is not included in registration fees. We have secured special rates with partner hotels. Details are available on the Venue page."
    }
  ];

  const toggleFaqSection = () => {
    setFaqExpanded(!faqExpanded);
  };

  const toggleQuestion = (index: number) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-section about">
            <h3>1st Eastern Africa Indigenous Seed Conference 2026</h3>
            <p className="footer-description">
              The 1st Eastern Africa Indigenous Seed Conference brings together farmers, 
              researchers, policymakers, and seed advocates to champion seed sovereignty 
              and strengthen farmer-managed seed systems across the region.
            </p>
            <div className="footer-social">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <span className="social-icon in">in</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <span className="social-icon x">𝕏</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <span className="social-icon fb">f</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                <span className="social-icon yt">yt</span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/about">About the Conference</a></li>
              <li><a href="/registration-abstract">Registration</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>For Attendees</h4>
            <ul className="footer-links">
              <li><a href="/venue">Venue Information</a></li>
              <li><a href="/accommodation">Accommodation</a></li>
              <li><a href="/travel">Travel Guide</a></li>
              <li><a href="/visa">Visa Support</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">✉</span>
                <a href="mailto:info@eaindigenousseedsconference.org">info@eaindigenousseedsconference.org</a>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <a href="tel:+254712451777">+254 712 451 777</a>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span>Nairobi, Kenya</span>
              </li>
              <li>
                <span className="contact-icon">📅</span>
                <span>17–20 November 2026</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Collapsible FAQ Section */}
        <div className="footer-faq-container">
          <button 
            className={`footer-faq-header ${faqExpanded ? 'expanded' : ''}`}
            onClick={toggleFaqSection}
            aria-expanded={faqExpanded}
          >
            <div className="faq-header-left">
              <span className="faq-section-badge">Got Questions?</span>
              <h4>Frequently Asked Questions</h4>
              <p className="footer-faq-subtitle">Quick answers to common questions about the conference</p>
            </div>
            <div className="faq-header-right">
              <span className="faq-header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {faqExpanded ? (
                    <path d="M18 12H6" strokeLinecap="round" />
                  ) : (
                    <path d="M12 6v12M6 12h12" strokeLinecap="round" />
                  )}
                </svg>
              </span>
            </div>
          </button>

          <div className={`footer-faq-content ${faqExpanded ? 'expanded' : ''}`}>
            <div className="footer-faq-grid">
              {faqs.map((faq, index) => (
                <div key={index} className="footer-faq-item">
                  <button 
                    className={`footer-faq-question ${expandedQuestion === index ? 'active' : ''}`}
                    onClick={() => toggleQuestion(index)}
                    aria-expanded={expandedQuestion === index}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-question-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {expandedQuestion === index ? (
                          <path d="M18 12H6" strokeLinecap="round" />
                        ) : (
                          <path d="M12 6v12M6 12h12" strokeLinecap="round" />
                        )}
                      </svg>
                    </span>
                  </button>
                  <div className={`footer-faq-answer ${expandedQuestion === index ? 'expanded' : ''}`}>
                    <div className="footer-faq-answer-content">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="footer-faq-footer">
              <p>Still have questions? <a href="/contact">Contact our support team</a></p>
            </div>
          </div>
        </div>

        {/* Footer Bottom with Powered by KSPACE */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} 1st Eastern Africa Indigenous Seed Conference. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="/privacy">Privacy Policy</a>
              <span className="separator">•</span>
              <a href="/terms">Terms of Use</a>
              <span className="separator">•</span>
              <a href="/cookies">Cookie Policy</a>
              <span className="separator">•</span>
              <a href="/accessibility">Accessibility</a>
            </div>
          </div>
          
          {/* Powered by KSPACE */}
          <div className="footer-powered-wrapper">
            <div className="footer-powered">
              <span className="powered-text">Powered by </span>
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