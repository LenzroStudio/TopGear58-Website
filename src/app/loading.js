"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { t_logo } from "../../public/images/images";

export default function AppLoader({ onComplete, children }) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setLoading(false);
          if (onComplete) requestAnimationFrame(() => onComplete());
        }
        return next;
      });
    }, 100); // ~4 seconds

    return () => clearInterval(interval);
  }, [onComplete]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white">
        <Image
          src={t_logo}
          alt="TopGear58 Logo"
          width={180}
          height={180}
          priority
          className="mb-8 animate-pulse"
        />
        {/* Progress bar */}
        <div className="w-64 h-1 bg-gray-700 mt-6 overflow-hidden rounded">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  }

  return children;
}
