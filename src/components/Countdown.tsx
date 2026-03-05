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

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString();
  };

  return (
    <section className="home-countdown">
      <div className="home-countdown-container">
        <div className="home-countdown-content">
          <div className="home-countdown-header">
            <h2 className="home-countdown-title">Conference Begins In</h2>
            <p className="home-countdown-subtitle">
              17th – 20th November 2026 • Nairobi, Kenya
            </p>
          </div>

          <div className="home-countdown-timer">
            <div className="home-timer-grid">
              <div className="home-time-unit">
                <span className="home-time-number">{formatNumber(timeLeft.days)}</span>
                <span className="home-time-label">Days</span>
              </div>

              <span className="home-time-separator">:</span>

              <div className="home-time-unit">
                <span className="home-time-number">{formatNumber(timeLeft.hours)}</span>
                <span className="home-time-label">Hours</span>
              </div>

              <span className="home-time-separator">:</span>

              <div className="home-time-unit">
                <span className="home-time-number">{formatNumber(timeLeft.minutes)}</span>
                <span className="home-time-label">Minutes</span>
              </div>

              <span className="home-time-separator">:</span>

              <div className="home-time-unit">
                <span className="home-time-number">{formatNumber(timeLeft.seconds)}</span>
                <span className="home-time-label">Seconds</span>
              </div>
            </div>
          </div>

          <div className="home-countdown-cta">
            <button className="home-cta-button">Register Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;