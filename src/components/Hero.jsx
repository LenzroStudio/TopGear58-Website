"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { hero_img, hero_sm_img } from "../../public/images/images";
import { Button } from "./ui/button";

const Hero = () => {
  const [engineStatus, setStatus] = useState("START");
  const audioRef = useRef(null);

  const engineControls = () => {
    if (engineStatus === "START") {
      setStatus("STOP");
      // Play engine sound when starting the engine
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else {
      setStatus("START");
      // Stop engine sound when stopping the engine
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };
  return (
    <div>
      {/* Audio element for engine sound */}
      <audio ref={audioRef} loop>
        <source src="/videos/engineSound.mpeg" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* large screen size */}
      <div className="hidden md:flex h-screen w-full relative">
        <Image
          src={hero_img}
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          className="absolute "
        />
        {/* this is the text div it need to be centered in the middle of the hero section no matter the screen size increase */}
        <div className="absolute top-20  inset-0 flex flex-col gap-[1rem] items-center justify-center z-10">
          <p className="text-white md:text-5xl lg:text-6xl">
            Driven by Trust , Powered by Care
          </p>
          <p className="text-gray-300 text-center text-lg w-[50%] max-w-[60%]">
            Fifty eight years in the making , TopGear58 is more than an auto
            repair company, its an investment to protect your vehicle , save you
            time and give you a piece of mind.{" "}
          </p>
          {/* engine */}
          <div
            className={`flex flex-col  items-center text-white w-[100px] h-[100px] border-2 
                        ${
                          engineStatus === "START"
                            ? "border-red-900"
                            : "border-green-900"
                        }
                            bg-gray-950 cursor-pointer rounded-full justify-center gap-4  !mt-5 transition-all duration-700`}
            onClick={engineControls}
          >
            <div
              className={`w-7 h-1 rounded-full ${
                engineStatus === "START" ? "bg-red-500" : "bg-green-500"
              } duration-700 transition-all`}
            ></div>
            <p className="flex flex-col items-center leading-3 text-gray-400 duration-700 transition-all">
              {engineStatus}
              <span className="text-xs">ENGINE</span>
            </p>
          </div>
          <p
            className={`!p-2 text-sm  ${
              engineStatus === "START" ? " text-red-500" : " text-green-500"
            } duration-700 transition-all`}
          >
            LISTEN TO A HEALTHY ENGINE
          </p>
        </div>
      </div>
      {/* small screen size - video background, image overlay on pause, text bottom-right */}
      <div className="flex md:hidden h-screen w-full relative">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
          ref={audioRef} // for play/pause control
        >
          <source src="/videos/hero_vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Image overlay when paused */}
        {engineStatus === "START" && (
          <Image
            src={hero_sm_img}
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-10"
          />
        )}
        {/* Text and controls bottom-right */}
        <div className="absolute bottom-6 right-4 flex flex-col gap-3 items-end z-20 w-[90vw] max-w-[95vw]">
          <p className="text-white text-[28px] text-right leading-tight">
            Driven by Trust , <br /> Powered by Care
          </p>
          <p className="text-gray-300 text-xs text-right w-full max-w-xs">
            Fifty eight years in the making , TopGear58 is more than an auto
            repair company, its an investment to protect your vehicle.
          </p>
          {/* engine */}
          <div
            className={`flex flex-col items-center text-white w-[80px] h-[80px] border-2 
              ${
                engineStatus === "START" ? "border-red-900" : "border-green-900"
              }
              bg-gray-950 cursor-pointer rounded-full justify-center gap-4 mt-3 transition-all duration-700`}
            onClick={() => {
              engineControls();
              // Pause/play video
              const video = audioRef.current;
              if (video) {
                if (engineStatus === "START") video.pause();
                else video.play();
              }
            }}
          >
            <div
              className={`w-7 h-1 rounded-full ${
                engineStatus === "START" ? "bg-red-500" : "bg-green-500"
              } duration-700 transition-all`}
            ></div>
            <p className="flex flex-col items-center leading-3 text-xs text-gray-400 duration-700 transition-all">
              {engineStatus}
              <span className="text-xs">ENGINE</span>
            </p>
          </div>
          <p
            className={`!p-2 text-sm  ${
              engineStatus === "START" ? " text-red-500" : " text-green-500"
            } duration-700 transition-all`}
          >
            LISTEN TO A HEALTHY ENGINE
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
