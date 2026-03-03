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
      setScrolled(window.scrollY > 50);

      if (location.pathname !== "/") return;

      const sections = ["home", "about", "program", "speakers", "contact"];
      const scrollPosition = window.scrollY + 100;

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

  // FIX: Added type annotation for sectionId parameter
  const handleNavigation = (sectionId: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth",
        });
      }
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
    setMobileMenuOpen(false);
  };

  // FIX: Added type annotation for path parameter
  const isActive = (path: string): boolean => {
    if (path === "/") {
      return location.pathname === "/" && activeSection === "home";
    }
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          EA-ISC 2026
        </Link>

        <button
          className={`mobile-toggle ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
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

            {/*<li className="nav-item">
              <Link
                to="/program"
                className={`nav-link ${location.pathname === "/program" ? "active" : ""}`}
              >
                Program
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/speakers"
                className={`nav-link ${location.pathname === "/speakers" ? "active" : ""}`}
              >
                Speakers
              </Link>
            </li>*/}

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
                Register Now
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;