import {  BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
/*import ProgramPage from "./pages/ProgramPage";
import SpeakersPage from "./pages/SpeakersPage";*/
import RegistrationAbstractPage from "./pages/RegistrationAbstractPage";
import RegistrationForm from "./components/RegistrationForm";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import ContactPage from "./pages/ContactPage";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <HelmetProvider>
    <BrowserRouter>
     <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      {/*<Route path="/program" element={<ProgramPage />} />
      <Route path="/speakers" element={<SpeakersPage />} />*/}
      <Route path="/registration-abstract" element={<RegistrationAbstractPage />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/registration-success" element={<RegistrationSuccess />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/contact" element={<ContactPage />} />

    </Routes>
    <Footer />
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;