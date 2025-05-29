"use client";
import { useState, useEffect } from "react";

import { motion } from "framer-motion";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Define the total duration of the countdown from when it's considered 0% complete.
    // Based on your image (0 Years, 364 Days, 23 Hours, 27 Minutes, 39 Seconds at 0.00%):
    const totalSecondsAtStart =
      364 * 24 * 60 * 60 + // 364 days
      23 * 60 * 60 + // 23 hours
      27 * 60 + // 27 minutes
      39; // 39 seconds
    const TOTAL_COUNTDOWN_MILLISECONDS_AT_START = totalSecondsAtStart * 1000;

    // Set target date (ensure this correctly represents 2026-05-26T00:00:00 in the intended timezone, e.g., New York)
    // For getTime(), it will be converted to UTC milliseconds.
    const targetDate = new Date("2026-05-26T00:00:00");

    const interval = setInterval(() => {
      const now = new Date();
      const millisecondsRemaining = targetDate.getTime() - now.getTime();

      if (millisecondsRemaining <= 0) {
        // Game released!
        setTimeLeft({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        setPercentage(100.0); // Set percentage to 100
        clearInterval(interval);
        return;
      }

      // Calculate time elapsed since the defined start of the countdown period
      // This is: (Total Duration when countdown started) - (Current Time Remaining)
      const millisecondsElapsed =
        TOTAL_COUNTDOWN_MILLISECONDS_AT_START - millisecondsRemaining;

      let calculatedPercentage;
      if (TOTAL_COUNTDOWN_MILLISECONDS_AT_START > 0) {
        calculatedPercentage =
          (millisecondsElapsed / TOTAL_COUNTDOWN_MILLISECONDS_AT_START) * 100;
      } else {
        // This case implies the total duration was zero or negative.
        // If target is reached, 100%, otherwise 0%.
        calculatedPercentage = millisecondsRemaining <= 0 ? 100 : 0;
      }

      // Clamp percentage between 0% and 100%
      calculatedPercentage = Math.max(0, Math.min(100, calculatedPercentage));

      // Update the percentage state
      // The original code had `setPercentage(percentage)` which is incorrect.
      // It should be `setPercentage(calculatedPercentage)`.
      setPercentage(calculatedPercentage);

      // Calculate time left for display (years, days, hours, minutes, seconds)
      const totalSecondsLeft = Math.floor(millisecondsRemaining / 1000);

      const years = Math.floor(totalSecondsLeft / (60 * 60 * 24 * 365)); // Approximation
      const days = Math.floor(
        (totalSecondsLeft % (60 * 60 * 24 * 365)) / (60 * 60 * 24)
      );
      const hours = Math.floor((totalSecondsLeft % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSecondsLeft % (60 * 60)) / 60);
      const seconds = totalSecondsLeft % 60;

      setTimeLeft({ years, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
    // Add state setters to dependency array if they are props or defined outside.
    // If setTimeLeft and setPercentage are from useState in the same component,
    // they are stable and might not be strictly needed in deps, but it's good practice.
  }, [setTimeLeft, setPercentage]);


  return (
    <>
      <div className="min-h-screen flex items-center justify-center text-white relative px-4">
        <div className="text-center z-10 w-full max-w-7xl">
          <motion.div className="grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-2 md:gap-4">
            {["Years", "Days", "Hours", "Minutes", "Seconds"].map(
              (item, index) => (
                <motion.div
                  key={index}
                  initial={{
                    y: 25,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 1 + index * 0.1,
                    duration: 0.5,
                  }}
                  className="bg-opacity-50 p-2 md:p-6 rounded-lg"
                >
                  <motion.div
                    key={timeLeft[item.toLowerCase() as keyof typeof timeLeft]}
                    initial={{
                      y: 25,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold"
                  >
                    {timeLeft[item.toLowerCase() as keyof typeof timeLeft]}
                  </motion.div>
                  <div className="text-sm sm:text-lg md:text-xl lg:text-2xl">
                    {timeLeft[item.toLowerCase() as keyof typeof timeLeft] === 1
                      ? item.slice(0, -1) // Remove 's' from the end
                      : item}
                  </div>
                </motion.div>
              )
            )}
          </motion.div>

          <div className="flex flex-row justify-center gap-4 md:gap-8 text-xs md:text-sm opacity-80 mt-4">
            <p className=" text-5xl font-bold">{percentage.toFixed(4)}%</p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full text-center pb-4 z-20">
        <div className="flex flex-row justify-center gap-4 md:gap-8 text-xs md:text-sm opacity-80">
          <a
            href="https://instagram.com/wellitsnoor"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white transition-colors"
          >
            Instagram
          </a>
          <div className="flex flex-row">
            <a
              href="https://remaster.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium flex text-white transition-colors"
            >
              Visit Remaster
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
