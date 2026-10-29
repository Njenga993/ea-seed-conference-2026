// components/AboutConferenceSection.tsx
import "../styles/AboutConferenceSection.css";

// Update this import to point at your actual image file in src/assets/
import conferenceImage from "../assets/image.png";

const REGISTRATION_URL = "https://eaindigenousseedconference.org/registration-abstract";

const AboutConferenceSection = () => {
  return (
    <section className="about-conference-section">
      <div className="about-conference-container">
        <div className="about-conference-text">
          <h2>Join us at the 1st Eastern Africa Indigenous Seed Conference</h2>

          <p>
            What happens if we can no longer grow our own food? It may sound
            unthinkable, but the power to grow our own food is under threat.
            Across Eastern Africa, climate change, biodiversity loss,
            changing farming systems, and restrictive policies are putting
            pressure on the Indigenous seeds, local livestock breeds, and
            traditional knowledge systems that have sustained communities for
            generations.
          </p>

          <p>
            Our food systems are built on diversity. The seeds farmers save,
            the breeds they conserve, and the knowledge they pass from one
            generation to another are the foundation of resilience, culture,
            and food sovereignty. When communities lose the ability to
            control these resources, we risk losing not only biodiversity,
            but also the power to determine what we grow, what we eat, and
            how we feed future generations.
          </p>

          <p>
            For over a decade, Seed Savers Network (SeedSavers) has worked
            alongside farming communities to protect this power; conserving
            Indigenous seeds, strengthening community seed systems, promoting
            agroecology, and advocating for farmers' rights. Today,
            SeedSavers works with more than 120,000 farmers and established
            125 community seed banks, alongside communities. Building on this
            experience, SeedSavers is convening the 1st Eastern Africa
            Indigenous Seed Conference, taking place from 17–20 November 2026
            in Nairobi, Kenya, under the theme{" "}
            <em>"Realizing the Right to Food through Seed Sovereignty."</em>
          </p>

          <p>
            The conference comes at a critical moment when the region must
            rethink how we produce, protect, and access food. It will bring
            together farmers, seed custodians, researchers, policymakers,
            civil society organisations, youth, development partners, and
            other food system actors to exchange knowledge, showcase
            innovations, influence policy, and strengthen collaboration for a
            more resilient future.
          </p>

          <p>
            What makes this conference unique is that it places farmers and
            communities at the centre of the conversation. It is not only a
            space to discuss challenges but also a platform to celebrate
            solutions already working on the ground and build collective
            action for food sovereignty across Eastern Africa.
          </p>

          <p>
            Whether you are a farmer, policymaker, researcher, practitioner,
            agri entrepreneur, media or communicator or advocate for
            sustainable food systems, this is an opportunity to connect with
            regional changemakers and contribute to shaping the future of
            food.
          </p>

          <a href={REGISTRATION_URL} className="about-conference-cta">
            Register here to join us
          </a>
          <p className="about-conference-cta-note">
            in Nairobi from 17–20 November 2026 and be part of the movement.
          </p>
        </div>

        <div className="about-conference-image">
          <img
            src={conferenceImage}
            alt="Farmers and community members at a Seed Savers Network event in Eastern Africa"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutConferenceSection;