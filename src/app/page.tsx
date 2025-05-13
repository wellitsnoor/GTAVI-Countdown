"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import BackgroundSlideshow from "./components/BackgroundSlideshow";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date in New York timezone
    const targetDate = new Date("2026-05-26T00:00:00-04:00"); // EDT timezone offset

    const interval = setInterval(() => {
      // Get current time in New York
      const now = new Date();
      const nyTime = new Date(
        now.toLocaleString("en-US", { timeZone: "America/New_York" })
      );
      const difference = targetDate.getTime() - nyTime.getTime();

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
        <BackgroundSlideshow />

        <div className="text-center z-10 w-full max-w-7xl">
          <div className="grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-2 md:gap-4">
            {["Years", "Days", "Hours", "Minutes", "Seconds"].map(
              (item, index) => (
                <div
                  key={index}
                  className="bg-opacity-50 p-2 md:p-6 rounded-lg"
                >
                  <div className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold">
                    {timeLeft[item.toLowerCase() as keyof typeof timeLeft]}
                  </div>
                  <div className="text-sm sm:text-lg md:text-xl lg:text-2xl">
                    {item}
                  </div>
                </div>
              )
            )}
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
