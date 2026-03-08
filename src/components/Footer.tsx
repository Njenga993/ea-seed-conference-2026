// components/Footer.tsx
import { useState } from "react";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-section about">
            <h3>EA-ISC 2026</h3>
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
              <li><a href="/program">Program & Schedule</a></li>
              <li><a href="/speakers">Keynote Speakers</a></li>
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
                <a href="tel:+256712451777">+256 712 451 777</a>
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

        {/* FAQ Section - Expandable */}
        <div className="footer-faq-section">
          <div className="footer-faq-header">
            <h4>Frequently Asked Questions</h4>
            <p className="footer-faq-subtitle">Quick answers to common questions about the conference</p>
          </div>
          
          <div className="footer-faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="footer-faq-item">
                <button 
                  className={`footer-faq-question ${expandedFaq === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={expandedFaq === index}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-question-icon">
                    {expandedFaq === index ? '−' : '+'}
                  </span>
                </button>
                <div className={`footer-faq-answer ${expandedFaq === index ? 'expanded' : ''}`}>
                  <div className="footer-faq-answer-content">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          
        </div>

        {/* Footer Bottom */}
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;