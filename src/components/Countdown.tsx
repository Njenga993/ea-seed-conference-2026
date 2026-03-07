// components/Countdown.tsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/countdown.css";

const Countdown = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  
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
  const [prevTimeLeft, setPrevTimeLeft] = useState(timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevTimeLeft(timeLeft);
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Title appears first
            setTimeout(() => {
              titleRef.current?.classList.add('countdown-title-visible');
            }, 200);
            
            // Subtitle appears second
            setTimeout(() => {
              subtitleRef.current?.classList.add('countdown-subtitle-visible');
            }, 400);
            
            // Timer appears third
            setTimeout(() => {
              timerRef.current?.classList.add('countdown-timer-visible');
            }, 600);
            
            // Button appears last
            setTimeout(() => {
              buttonRef.current?.classList.add('countdown-button-visible');
            }, 800);

            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString();
  };

  const handleRegister = () => {
    navigate("/registration");
  };

  // Check if a unit value changed for animation
  const hasUnitChanged = (unit: keyof typeof timeLeft, value: number) => {
    return prevTimeLeft[unit] !== value;
  };

  return (
    <section className="conf-countdown-section" ref={sectionRef}>
      <div className="conf-countdown-wrapper">
        <div className="conf-countdown-inner">
          <header className="conf-countdown-header">
            <h2 
              className="conf-countdown-title" 
              ref={titleRef}
            >
              Conference Begins In
            </h2>
            <p 
              className="conf-countdown-subtitle" 
              ref={subtitleRef}
            >
              17th – 20th November 2026 • Nairobi, Kenya
            </p>
          </header>

          <div 
            className="conf-countdown-timer" 
            ref={timerRef}
          >
            <div className="conf-timer-grid">
              <div className="conf-timer-unit">
                <span 
                  className={`conf-timer-value ${hasUnitChanged('days', timeLeft.days) ? 'conf-timer-pulse' : ''}`}
                >
                  {formatNumber(timeLeft.days)}
                </span>
                <span className="conf-timer-label">Days</span>
              </div>

              <span className="conf-timer-separator">:</span>

              <div className="conf-timer-unit">
                <span 
                  className={`conf-timer-value ${hasUnitChanged('hours', timeLeft.hours) ? 'conf-timer-pulse' : ''}`}
                >
                  {formatNumber(timeLeft.hours)}
                </span>
                <span className="conf-timer-label">Hours</span>
              </div>

              <span className="conf-timer-separator">:</span>

              <div className="conf-timer-unit">
                <span 
                  className={`conf-timer-value ${hasUnitChanged('minutes', timeLeft.minutes) ? 'conf-timer-pulse' : ''}`}
                >
                  {formatNumber(timeLeft.minutes)}
                </span>
                <span className="conf-timer-label">Minutes</span>
              </div>

              <span className="conf-timer-separator">:</span>

              <div className="conf-timer-unit">
                <span 
                  className={`conf-timer-value ${hasUnitChanged('seconds', timeLeft.seconds) ? 'conf-timer-pulse' : ''}`}
                >
                  {formatNumber(timeLeft.seconds)}
                </span>
                <span className="conf-timer-label">Seconds</span>
              </div>
            </div>
          </div>

          <div 
            className="conf-countdown-action" 
            ref={buttonRef}
          >
            <button 
              className="conf-action-btn"
              onClick={handleRegister}
            >
              Register Now
              <span className="conf-btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;