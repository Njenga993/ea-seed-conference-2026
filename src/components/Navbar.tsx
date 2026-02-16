import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Update active section based on scroll position
      const sections: string[] = ["home", "about", "program", "speakers", "contact"];
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
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
      closeMobileMenu();
    }
  };

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      <div className="container nav-content">
        <Link to="/" className="logo" onClick={() => scrollToSection("home")}>
           EA- ISC 2026
        </Link>
        
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        
        <ul className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <li className={activeSection === "home" ? "active" : ""}>
            <button onClick={() => scrollToSection("home")}>Home</button>
          </li>
          <li className={activeSection === "about" ? "active" : ""}>
            <button onClick={() => scrollToSection("about")}>About</button>
          </li>
          <li className={activeSection === "program" ? "active" : ""}>
            <button onClick={() => scrollToSection("program")}>Program</button>
          </li>
          <li className={activeSection === "speakers" ? "active" : ""}>
            <button onClick={() => scrollToSection("speakers")}>Speakers</button>
          </li>
          <li className={activeSection === "contact" ? "active" : ""}>
            <button onClick={() => scrollToSection("contact")}>Contact</button>
          </li>
          <li className="nav-cta">
            <button onClick={() => scrollToSection("register")} className="register-btn">
              Register Now
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;