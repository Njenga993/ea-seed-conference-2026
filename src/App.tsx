import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import BackToTop from "./components/BackToTop";
/*import ProgramPage from "./pages/ProgramPage";
import SpeakersPage from "./pages/SpeakersPage";*/
import RegistrationAbstractPage from "./pages/RegistrationAbstractPage";
import HowToSubmitAbstractPage from "./pages/HowToSubmitAbstractPage";
import HowToApplyForSideEvents from "./pages/HowToApplyForSideEvents";
import RegistrationForm from "./components/RegistrationForm";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import ContactPage from "./pages/ContactPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import CheckIn from "./pages/CheckIn";
import AdminDashboard from "./pages/AdminDashboard";

// Wrapper component to handle route changes
function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show loader on route change
    setLoading(true);

    // Hide loader after a short delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleLoadingComplete = () => {
    console.log("Loading completed");
  };

  return (
    <>
      {/* Loader Component */}
      {loading && <Loader onLoadingComplete={handleLoadingComplete} />}

      {/* Main App Content */}
      <div
        className="app-container"
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
          visibility: loading ? "hidden" : "visible",
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          {/*<Route path="/program" element={<ProgramPage />} />
          <Route path="/speakers" element={<SpeakersPage />} />*/}
          <Route
            path="/registration-abstract"
            element={<RegistrationAbstractPage />}
          />
          <Route
            path="/how-to-submit-abstract"
            element={<HowToSubmitAbstractPage />}
          />
          <Route
            path="/how-to-apply-for-side-events"
            element={<HowToApplyForSideEvents />}
          />
          <Route path="/register" element={<RegistrationForm />} />
          <Route
            path="/registration-success"
            element={<RegistrationSuccess />}
          />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />

        {/* Back to Top Button */}
        <BackToTop />
      </div>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
