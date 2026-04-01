// components/Loader.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/loader.css";

interface LoaderProps {
  onLoadingComplete?: () => void;
}

const Loader = ({ onLoadingComplete }: LoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="loader-container">
            {/* Seed Icon Animation */}
            <div className="seed-loader">
              <svg
                className="seed-svg"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M50 20 L50 80 M50 20 L35 35 M50 20 L65 35 M50 80 L35 65 M50 80 L65 65"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="15"
                  stroke="var(--color-secondary)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="8"
                  fill="var(--color-accent)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 1 }}
                />
              </svg>
            </div>

            {/* Loading Text */}
            <div className="loader-text">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Eastern Africa Indigenous Seed Conference
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Loading conference information...
              </motion.p>
            </div>

            {/* Progress Bar */}
            <motion.div
              className="loader-progress"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
