"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { hero_img, hero_sm_img } from "../../public/images/images";
import { Button } from "./ui/button";

const Hero = () => {
  const [videoStatus, setVideoStatus] = useState("PLAYING");
  const videoRef = useRef(null);
  return (
    <div>
      {/* Unified hero for all screen sizes: video background, overlay, pause/play, responsive text */}
      <div className="relative w-full h-[98vh] md:h-screen flex items-center justify-center">
        {/* Video background, tap to pause/play */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0, cursor: "pointer" }}
          ref={videoRef}
          onClick={() => {
            const video = videoRef.current;
            if (video) {
              if (video.paused) {
                video.play();
                setVideoStatus("PLAYING");
              } else {
                video.pause();
                setVideoStatus("PAUSED");
              }
            }
          }}
        >
          <source src="/videos/hero_vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Image overlay when video is paused */}
        {videoRef.current && videoRef.current.paused && (
          <Image
            src={hero_sm_img}
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-10"
          />
        )}
        {/* Responsive text and pause/play button */}
        <div
          className="absolute z-20 flex flex-col gap-3 md:gap-6 items-end md:items-center justify-end md:justify-center w-full h-full !px-4 md:!px-0"
          style={{ pointerEvents: "none" }}
        >
          <div
            className="w-full md:w-auto flex flex-col items-end md:items-center justify-end md:justify-center md:!mb-0 !mb-8"
            style={{ pointerEvents: "auto" }}
          >
            <p className="text-white text-[28px] md:text-5xl lg:text-6xl text-right md:text-center leading-tight">
              Driven by Trust , <br className="md:hidden" /> Powered by Care
            </p>
            <p className="text-gray-300 text-xs md:text-lg text-right md:text-center w-full max-w-xs md:max-w-2xl !mt-2 md:!mt-4">
              Fifty eight years in the making , TopGear58 is more than an auto
              repair company, its an investment to protect your vehicle
              <span className="hidden md:inline">
                , save you time and give you a piece of mind.
              </span>
            </p>
            {/* Pause/Play button */}
            <button
              className="!mt-2 md:!mt-6 !px-6 !py-2 rounded-full bg-black/70 text-white flex items-center gap-2 border border-white/20 shadow-md"
              style={{ minWidth: 120 }}
              onClick={(e) => {
                e.stopPropagation();
                const video = videoRef.current;
                if (video) {
                  if (video.paused) {
                    video.play();
                    setVideoStatus("PLAYING");
                  } else {
                    video.pause();
                    setVideoStatus("PAUSED");
                  }
                }
              }}
            >
              {videoRef.current && videoRef.current.paused ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.25 19.5 12l-14.25 6.75V5.25z"
                  />
                </svg>
              )}
              <span>
                {videoRef.current && videoRef.current.paused
                  ? "Play Video"
                  : "Pause Video"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
