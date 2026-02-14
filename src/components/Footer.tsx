import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        <div className="footer-col">
          <h3>Conference 2026</h3>
          <p>
            An international gathering of researchers, academics,
            and professionals advancing knowledge and innovation.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#themes">Themes</a></li>
            <li><a href="#program">Program</a></li>
            <li><a href="#registration">Registration</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>Email: conference2026@example.com</p>
          <p>Kampala, Uganda</p>
          <p>12–14 September 2026</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Conference 2026. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;