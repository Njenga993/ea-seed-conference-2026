import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-section about">
            <h3>EA-ISC 2026</h3>
            <p className="footer-description">
              An international gathering of researchers, academics,
              and professionals advancing knowledge and innovation 
              in sustainable development across Africa and beyond.
            </p>
            <div className="footer-social">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">in</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">𝕏</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">f</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">yt</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/about">About</a></li>
              <li><a href="/program">Program</a></li>
              <li><a href="/speakers">Speakers</a></li>
              <li><a href="/registration-abstract">Registration</a></li>
              <li><a href="/contact">Contact</a></li>
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
                <span className="contact-icon"></span>
                <a href="mailto:info@eaisc2026.org">info@eaisc2026.org</a>
              </li>
              <li>
                <span className="contact-icon"></span>
                <a href="tel:+256700123456">+256 700 123 456</a>
              </li>
              <li>
                <span className="contact-icon"></span>
                <span>Kampala, Uganda</span>
              </li>
              <li>
                <span className="contact-icon"></span>
                <span>12–14 September 2026</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} East African International Science Conference. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="/privacy">Privacy Policy</a>
              <span className="separator">|</span>
              <a href="/terms">Terms of Use</a>
              <span className="separator">|</span>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;