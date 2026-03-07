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
    <section className="conf-countdown-section">
      <div className="conf-countdown-wrapper">
        <div className="conf-countdown-inner">
          <header className="conf-countdown-header">
            <h2 className="conf-countdown-title">Conference Begins In</h2>
            <p className="conf-countdown-subtitle">
              17th – 20th November 2026 • Nairobi, Kenya
            </p>
          </header>

          <div className="conf-countdown-timer">
            <div className="conf-timer-grid">
              <div className="conf-timer-unit">
                <span className="conf-timer-value">{formatNumber(timeLeft.days)}</span>
                <span className="conf-timer-label">Days</span>
              </div>

              <span className="conf-timer-separator">:</span>

              <div className="conf-timer-unit">
                <span className="conf-timer-value">{formatNumber(timeLeft.hours)}</span>
                <span className="conf-timer-label">Hours</span>
              </div>

              <span className="conf-timer-separator">:</span>

              <div className="conf-timer-unit">
                <span className="conf-timer-value">{formatNumber(timeLeft.minutes)}</span>
                <span className="conf-timer-label">Minutes</span>
              </div>

              <span className="conf-timer-separator">:</span>

              <div className="conf-timer-unit">
                <span className="conf-timer-value">{formatNumber(timeLeft.seconds)}</span>
                <span className="conf-timer-label">Seconds</span>
              </div>
            </div>
          </div>

          <div className="conf-countdown-action">
            <button className="conf-action-btn">Register Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;