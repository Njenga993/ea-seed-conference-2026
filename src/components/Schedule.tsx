import { useEffect, useRef } from "react";
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

const ConferenceSchedule = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".conf-animate, .conf-session-card"
    );

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("conf-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="conf-schedule-section">
      <div className="conf-schedule-container">

        <header className="conf-schedule-header conf-animate">
          <span className="conf-schedule-tag">Conference Program</span>
          <h2 className="conf-schedule-title">Program & Schedule</h2>
          <p className="conf-schedule-subtitle">
            A four-day structured program combining dialogue, learning,
            field experiences, and collaborative strategy development.
          </p>
        </header>

        <div className="conf-schedule-cards">
          {scheduleData.map((day, index) => (
            <div
              key={index}
              className="conf-day-card conf-animate"
              style={{
                transitionDelay: `${index * 120}ms`
              }}
            >
              <div className="conf-day-header">
                <h3 className="conf-day-title">{day.day}</h3>

                <div className="conf-day-indicator">
                  <span className="conf-day-number">
                    Day {index + 1}
                  </span>
                </div>
              </div>

              <div className="conf-sessions-container">
                {day.sessions.map((session, i) => (
                  <div
                    key={i}
                    className="conf-session-card"
                    style={{
                      transitionDelay: `${300 + i * 120}ms`
                    }}
                  >
                    <div className="conf-session-time">
                      <span className="conf-time-icon"></span>
                      {session.time}
                    </div>

                    <div className="conf-session-content">
                      <h4 className="conf-session-title">
                        {session.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="conf-schedule-note conf-animate">
          <div className="conf-note-icon"></div>
          <p>
            Schedule subject to minor changes. Final program will be shared with registered participants.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ConferenceSchedule;