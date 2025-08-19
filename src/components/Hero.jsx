"use client";
import React from "react";

const hero_video =
  "https://xr1jblfnjocxsqzv.public.blob.vercel-storage.com/videos/Hero_video";

const Hero = () => {
  return (
    <div>
      {/* Simplified hero with just video background and text */}
      <div className="relative w-full h-[90vh] md:h-screen flex items-center justify-center">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={hero_video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Text overlay */}
        <div className="absolute z-20 flex flex-col gap-3 items-center justify-center w-full h-full !px-4">
          <div className="w-full flex flex-col items-center justify-center !mb-8">
            <p className="text-white text-3xl text-center leading-tight max-w-xl">
              Driven by Trust , <br /> Powered by Care
            </p>
            <p className="text-gray-300 text-base text-center w-full max-w-xl !mt-2">
              Fifty eight years in the making , TopGear58 is more than an auto
              repair company, its an investment to protect your vehicle, save
              you time and give you a piece of mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
