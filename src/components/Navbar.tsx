// components/Navbar.tsx
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

// Import logos (update these paths to match your actual logo files)
import rightLogo from "../assets/ssklogo.webp"; // Your right side logo

// Desktop layout starts at this width (must match the CSS media query)
const DESKTOP_QUERY = "(min-width: 1181px)";
const isDesktop = () =>
  typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches;

// Your old file used both "/accommodation" and "/accomodation".
// Set this to whichever path your router actually defines.


type DropdownKey = "accommodation" | "contact";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // External Google Form URL
  const GOOGLE_FORM_URL = "https://api.eaindigenousseedconference.org/";

  

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

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
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

  // Reset menus when the window crosses the desktop/mobile breakpoint
  useEffect(() => {
    const onResize = () => {
      setOpenDropdown(null);
      if (isDesktop()) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Escape closes menus; clicking outside the navbar closes dropdowns
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Element | null;
      if (target && !target.closest(".navbar")) setOpenDropdown(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, []);

  const closeMenus = () => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

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
    closeMenus();
  };

  // Handle register click to open Google Form in new tab
  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
    closeMenus();
  };

  const isActive = (path: string): boolean => {
    if (path === "/") {
      return location.pathname === "/" && activeSection === "home";
    }
    return location.pathname === path;
  };

  // ── Dropdown helpers ───────────────────────────────────────────────────────
  // Desktop: opens on hover and keyboard focus. The parent link still navigates.
  // Mobile: tapping the parent toggles the list instead of navigating, and the
  // parent page is the first item inside the list.
  const dropdownHandlers = (key: DropdownKey) => ({
    onMouseEnter: () => {
      if (isDesktop()) setOpenDropdown(key);
    },
    onMouseLeave: () => {
      if (isDesktop()) setOpenDropdown(null);
    },
    onFocus: () => {
      if (isDesktop()) setOpenDropdown(key);
    },
    onBlur: (e: React.FocusEvent<HTMLLIElement>) => {
      if (isDesktop() && !e.currentTarget.contains(e.relatedTarget as Node | null)) {
        setOpenDropdown((prev) => (prev === key ? null : prev));
      }
    },
  });

  const handleParentClick = (e: React.MouseEvent, key: DropdownKey) => {
    if (isDesktop()) {
      setOpenDropdown(null);
      setMobileMenuOpen(false);
      return; // let the link navigate normally
    }
    e.preventDefault();
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const accommodationActive = location.pathname === "/accommodation" || location.pathname === "/ebola-update" || location.pathname === "/logistics";
  const contactActive =
    location.pathname === "/contact" ||
    location.pathname === "/faqs" ||
    location.pathname === "/faq";

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">

        {/* LEFT LOGO */}
        <Link to="/" className="nav-logo-left" onClick={closeMenus}>
          <img
            src={rightLogo}
            alt="Eastern Africa Indigenous Seed Conference"
            className="nav-logo-image"
          />
        </Link>

        {/* Mobile toggle */}
        <button
          className={`mobile-toggle ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => {
            setOpenDropdown(null);
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="nav-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Menu */}
        <div id="nav-menu" className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
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
                onClick={closeMenus}
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
              >
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/registration-abstract"
                onClick={closeMenus}
                className={`nav-link ${location.pathname === "/registration-abstract" ? "active" : ""}`}
              >
                Registration
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/call-for-exhibitors"
                onClick={closeMenus}
                className={`nav-link ${location.pathname === "/call-for-exhibitors" ? "active" : ""}`}
              >
                Exhibitors
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/call-for-sideevents"
                onClick={closeMenus}
                className={`nav-link ${location.pathname === "/call-for-sideevents" ? "active" : ""}`}
              >
                SideEvents
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/how-to-submit-abstract"
                onClick={closeMenus}
                className={`nav-link ${location.pathname === "/how-to-submit-abstract" ? "active" : ""}`}
              >
                Abstract Submission
              </Link>
            </li>

            {/* Accommodation dropdown */}
            <li
              className={`nav-item nav-item-dropdown ${openDropdown === "accommodation" ? "open" : ""}`}
              {...dropdownHandlers("accommodation")}
            >
              <Link
                to= "/accommodation"
                onClick={(e) => handleParentClick(e, "accommodation")}
                aria-haspopup="true"
                aria-expanded={openDropdown === "accommodation"}
                className={`nav-link ${accommodationActive ? "active" : ""}`}
              >
                Accommodation
                <svg
                  className="dropdown-chevron"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 4l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <ul className="nav-dropdown">
                <li>
                  <Link
                    to= "/excursion"
                    onClick={closeMenus}
                    className={`nav-dropdown-link ${
                      location.pathname === "/excursion" ? "nav-dropdown-link-active" : ""
                    }`}
                  >
                    Excursion Sites
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ebola-update"
                    onClick={closeMenus}
                    className={`nav-dropdown-link ${
                      location.pathname === "/ebola-update" ? "nav-dropdown-link-active" : ""
                    }`}
                  >
                    Ebola Update
                  </Link>
                </li>

                <li>
  <Link
    to="/logistics"
    onClick={closeMenus}
    className={`nav-dropdown-link ${
      location.pathname === "/logistics" ? "nav-dropdown-link-active" : ""
    }`}
  >
    Logistics
  </Link>
</li>
              </ul>
            </li>

            {/* Contact dropdown */}
            <li
              className={`nav-item nav-item-dropdown ${openDropdown === "contact" ? "open" : ""}`}
              {...dropdownHandlers("contact")}
            >
              <Link
                to="/contact"
                onClick={(e) => handleParentClick(e, "contact")}
                aria-haspopup="true"
                aria-expanded={openDropdown === "contact"}
                className={`nav-link ${contactActive ? "active" : ""}`}
              >
                Contact
                <svg
                  className="dropdown-chevron"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 4l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <ul className="nav-dropdown">
                <li>
                  <Link
                    to="/contact"
                    onClick={closeMenus}
                    className={`nav-dropdown-link ${
                      location.pathname === "/contact" ? "nav-dropdown-link-active" : ""
                    }`}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faqs"
                    onClick={closeMenus}
                    className={`nav-dropdown-link ${
                      location.pathname === "/faqs" || location.pathname === "/faq"
                        ? "nav-dropdown-link-active"
                        : ""
                    }`}
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <button
                onClick={handleRegisterClick}
                className="nav-cta"
                aria-label="Register for the conference"
              >
                <span>Register Now</span>
                <svg className="cta-arrow" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              </button>
            </li>
          </ul>

          {/* Mobile menu footer */}
          <div className="mobile-footer">
            <div className="mobile-contact">
              <a href="mailto:info@eaindigenousseedconference.org">info@eaindigenousseedconference.org</a>
              <a href="tel:+254712451777">+254 712 451 777</a>
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