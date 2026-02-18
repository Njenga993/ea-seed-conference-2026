// components/HomeCountdown.tsx
import { useEffect, useState } from "react";
import "../styles/countdown.css";

const Countdown = () => {
  const eventDate = new Date("2026-11-17T09:00:00").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Add leading zeros
  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString();
  };

  return (
    <section className="home-countdown">
      <div className="home-countdown-container">
        <div className="home-countdown-content">
          <div className="home-countdown-header">
            <span className="home-countdown-tag">Don't Miss Out</span>
            <h2 className="home-countdown-title">Conference Begins In</h2>
            <p className="home-countdown-subtitle">
              Join us for the 1st Eastern Africa Indigenous Seed Conference 2026
            </p>
          </div>

          <div className="home-countdown-timer">
            <div className="home-timer-grid">
              <div className="home-time-unit">
                <div className="home-time-card">
                  <span className="home-time-number">{formatNumber(timeLeft.days)}</span>
                  <span className="home-time-label">Days</span>
                </div>
              </div>

              <div className="home-time-separator">
                <span>:</span>
              </div>

              <div className="home-time-unit">
                <div className="home-time-card">
                  <span className="home-time-number">{formatNumber(timeLeft.hours)}</span>
                  <span className="home-time-label">Hours</span>
                </div>
              </div>

              <div className="home-time-separator">
                <span>:</span>
              </div>

              <div className="home-time-unit">
                <div className="home-time-card">
                  <span className="home-time-number">{formatNumber(timeLeft.minutes)}</span>
                  <span className="home-time-label">Minutes</span>
                </div>
              </div>

              <div className="home-time-separator">
                <span>:</span>
              </div>

              <div className="home-time-unit">
                <div className="home-time-card">
                  <span className="home-time-number">{formatNumber(timeLeft.seconds)}</span>
                  <span className="home-time-label">Seconds</span>
                </div>
              </div>
            </div>
          </div>

          <div className="home-countdown-footer">
            <div className="home-event-details">
              <div className="home-event-item">
                <span className="home-event-icon"></span>
                <span className="home-event-text">17th – 20th November 2026</span>
              </div>
              <div className="home-event-item">
                <span className="home-event-icon"></span>
                <span className="home-event-text">Nairobi, Kenya</span>
              </div>
            </div>
            
            <div className="home-countdown-cta">
              <button className="home-cta-button">Register Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;