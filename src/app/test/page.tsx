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
    const targetDate = new Date("2026-05-26T00:00:00");
    const startDate = new Date("2025-05-26T00:00:00");

    const interval = setInterval(() => {
      const now = new Date();

      const percentage1 =
        ((now.getTime() - startDate.getTime()) /
          (targetDate.getTime() - startDate.getTime())) *
        100;

      setPercentage(Math.min(percentage1, 100));

      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        // Game released!
        setTimeLeft({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);

      const years = Math.floor(totalSeconds / (60 * 60 * 24 * 365));
      const days = Math.floor(
        (totalSeconds % (60 * 60 * 24 * 365)) / (60 * 60 * 24)
      );
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ years, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
