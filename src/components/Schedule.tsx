// components/HomeSchedule.tsx
import { useState } from "react";
import "../styles/schedule.css";

const scheduleData = [
  {
    day: "Day 1 — 17 November 2026",
    sessions: [
      { time: "09:00 - 10:00", title: "Opening Ceremony & Welcome Remarks" },
      { time: "10:30 - 12:00", title: "Keynote: Seed Sovereignty in Eastern Africa" },
      { time: "14:00 - 16:00", title: "Panel Discussion: Farmer-Managed Seed Systems" },
      { time: "16:30 - 18:00", title: "Networking & Cultural Exchange" }
    ]
  },
  {
    day: "Day 2 — 18 November 2026",
    sessions: [
      { time: "09:00 - 12:00", title: "Workshop: Indigenous Seed Conservation Practices" },
      { time: "13:00 - 15:00", title: "Policy Roundtable: Regional Seed Regulations" },
      { time: "15:30 - 17:00", title: "Case Studies from Community Seed Banks" },
      { time: "19:00 - 21:00", title: "Evening Dialogue Session" }
    ]
  },
  {
    day: "Day 3 — 19 November 2026",
    sessions: [
      { time: "09:00 - 13:00", title: "Field Visits to Local Seed Initiatives" },
      { time: "14:30 - 16:30", title: "Climate Resilience & Seed Diversity" },
      { time: "17:00 - 18:30", title: "Collaborative Strategy Development" }
    ]
  },
  {
    day: "Day 4 — 20 November 2026",
    sessions: [
      { time: "09:00 - 11:00", title: "Community of Practice (CoP) Formation" },
      { time: "11:30 - 13:00", title: "Conference Resolutions & Way Forward" },
      { time: "14:00 - 15:30", title: "Closing Ceremony" }
    ]
  }
];

const Schedule = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="home-schedule">
      <div className="home-schedule-container">
        <div className="home-schedule-header">
          <span className="home-schedule-tag">Conference Program</span>
          <h2 className="home-schedule-title">Program & Schedule</h2>
          <p className="home-schedule-subtitle">
            A four-day structured program combining dialogue, learning,
            field experiences, and collaborative strategy development.
          </p>
        </div>

        <div className="home-schedule-accordion">
          {scheduleData.map((item, index) => (
            <div key={index} className="home-accordion-item">
              <button
                className={`home-accordion-button ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <span className="home-accordion-day">{item.day}</span>
                <span className="home-accordion-icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              <div
                className={`home-accordion-content ${
                  activeIndex === index ? "open" : ""
                }`}
              >
                <div className="home-sessions-list">
                  {item.sessions.map((session, i) => (
                    <div key={i} className="home-session-item">
                      <span className="home-session-time">{session.time}</span>
                      <span className="home-session-title">{session.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="home-schedule-note">
          <p>
            <span className="home-note-icon"></span>
            Schedule subject to minor changes. Final program will be shared with registered participants.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Schedule;