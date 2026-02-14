import { useState } from "react";
import "../styles/schedule.css";

const scheduleData = [
  {
    day: "Day 1 — 17 November 2026",
    sessions: [
      "Opening Ceremony & Welcome Remarks",
      "Keynote: Seed Sovereignty in Eastern Africa",
      "Panel Discussion: Farmer-Managed Seed Systems",
      "Networking & Cultural Exchange"
    ]
  },
  {
    day: "Day 2 — 18 November 2026",
    sessions: [
      "Workshop: Indigenous Seed Conservation Practices",
      "Policy Roundtable: Regional Seed Regulations",
      "Case Studies from Community Seed Banks",
      "Evening Dialogue Session"
    ]
  },
  {
    day: "Day 3 — 19 November 2026",
    sessions: [
      "Field Visits to Local Seed Initiatives",
      "Climate Resilience & Seed Diversity",
      "Collaborative Strategy Development"
    ]
  },
  {
    day: "Day 4 — 20 November 2026",
    sessions: [
      "Community of Practice (CoP) Formation",
      "Conference Resolutions & Way Forward",
      "Closing Ceremony"
    ]
  }
];

const Schedule = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="schedule">
      <div className="container">
        <div className="schedule-header">
          <h2>Program & Schedule</h2>
          <p>
            A four-day structured program combining dialogue, learning,
            field experiences, and collaborative strategy development.
          </p>
        </div>

        <div className="accordion">
          {scheduleData.map((item, index) => (
            <div key={index} className="accordion-item">
              <button
                className={`accordion-title ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => toggleAccordion(index)}
              >
                {item.day}
              </button>

              <div
                className={`accordion-content ${
                  activeIndex === index ? "open" : ""
                }`}
              >
                <ul>
                  {item.sessions.map((session, i) => (
                    <li key={i}>{session}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;