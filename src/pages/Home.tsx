import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import FocusAreas from "../components/FocusAreas";
import Countdown from "../components/Countdown";
import Speakers from "../components/Speakers";
import Schedule from "../components/Schedule";
import CallForAbstracts from "../components/CallForAbstracts";
import Registration from "../components/Registration";
import Venue from "../components/Venue";
import Sponsors from "../components/Sponsors";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <FocusAreas />
      <Countdown />
      <Speakers />
      <Schedule />
      <CallForAbstracts />
      <Registration />
      <Venue />
      <Sponsors />
      <Footer />
    </>
  );
};

export default Home;