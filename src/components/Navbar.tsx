// components/Navbar.tsx
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const location = useLocation();
  const navigate = useNavigate();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      if (location.pathname !== "/") return;

      const sections = ["home", "about", "program", "speakers", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleNavigation = (sectionId: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: "smooth",
        });
      }
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
    setMobileMenuOpen(false);
  };

  const isActive = (path: string): boolean => {
    if (path === "/") {
      return location.pathname === "/" && activeSection === "home";
    }
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo removed - now empty */}
        <div className="nav-logo-placeholder"></div>

        <button
          className={`mobile-toggle ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <button
                onClick={() => handleNavigation("home")}
                className={`nav-link ${isActive("/") ? "active" : ""}`}
              >
                Home
              </button>
            </li>

            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
              >
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/registration-abstract"
                className={`nav-link ${location.pathname === "/registration-abstract" ? "active" : ""}`}
              >
                Registration
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/contact"
                className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
              >
                Contact
              </Link>
            </li>

            <li className="nav-item">
              <button
                onClick={() => handleNavigation("registration")}
                className="nav-cta"
              >
                <span>Register Now</span>
                <svg className="cta-arrow" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              </button>
            </li>
          </ul>

          {/* Mobile menu footer - only visible on mobile */}
          <div className="mobile-footer">
            <div className="mobile-contact">
              <a href="mailto:info@eaindigenousseedsconference.org">info@eaindigenousseedsconference.org</a>
              <a href="tel:+256712451777">+256 712 451 777</a>
            </div>
            <div className="mobile-social">
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="Facebook">f</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;