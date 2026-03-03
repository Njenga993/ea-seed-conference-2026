import {  BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
/*import ProgramPage from "./pages/ProgramPage";
import SpeakersPage from "./pages/SpeakersPage";*/
import RegistrationAbstractPage from "./pages/RegistrationAbstractPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <BrowserRouter>
     <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      {/*<Route path="/program" element={<ProgramPage />} />
      <Route path="/speakers" element={<SpeakersPage />} />*/}
      <Route path="/registration-abstract" element={<RegistrationAbstractPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;