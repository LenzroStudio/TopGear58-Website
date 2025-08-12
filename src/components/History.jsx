"use client";
import { ChevronRight, Pause, Play, Maximize, Minimize } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const History = () => {
  const [videoStatus, setVideoStatus] = useState("PLAYING");
  const [videoScale, setVideoScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isFullscreen) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is in viewport
      const isInViewport = rect.top < windowHeight && rect.bottom > 0;

      if (!isInViewport) {
        // Reset scale when section is out of view
        setVideoScale(1);
        return;
      }

      // Calculate scroll progress within the section
      const sectionHeight = rect.height;
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + sectionHeight))
      );

      // Scale from 1 to 0.3 based on scroll progress
      const minScale = 0.3;
      const maxScale = 1;
      const newScale = maxScale - scrollProgress * (maxScale - minScale);

      setVideoScale(Math.max(minScale, Math.min(maxScale, newScale)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      // Enter fullscreen
      setIsFullscreen(true);
      video.muted = false; // Enable audio in fullscreen
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      setIsFullscreen(false);
      video.muted = true; // Mute audio when exiting fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );

      if (!isCurrentlyFullscreen && isFullscreen) {
        setIsFullscreen(false);
        if (videoRef.current) {
          videoRef.current.muted = true;
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, [isFullscreen]);

  return (
    <div
      ref={sectionRef}
      className="min-h-[95vh] bg-gray-100 text-black !py-10 md:!py-20 flex flex-col gap-[3rem] "
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl !px-8 md:!px-16">
        Celebrating 58 Years of Being TopGear58
      </h1>
      <div className="w-full relative flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata" // Only load metadata initially
          className="object-cover w-full md:w-[90%] h-full transition-transform duration-75 ease-out"
          style={{
            zIndex: 0,
            cursor: "pointer",
            transform: `scale(${videoScale})`,
          }}
          ref={videoRef}
        >
          <source
            src="https://xr1jblfnjocxsqzv.public.blob.vercel-storage.com/videos/hero_vid.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* pause and play button */}
        <Button
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
          className="absolute top-1/2 left-1/2 flex items-center justify-center w-[90px] h-[90px] bg-black/20 !p-0 cursor-pointer backdrop-blur-lg md:hover:bg-red-500/30 rounded-full z-10"
          style={{
            transform: `translate(-50%, -50%) scale(${videoScale})`,
            transformOrigin: "center center",
          }}
        >
          {videoStatus === "PLAYING" ? (
            <Play className="text-white w-20 h-20" />
          ) : (
            <Pause className="text-white w-20 h-20" />
          )}
        </Button>

        {/* Fullscreen button - bottom right */}
        <Button
          onClick={toggleFullscreen}
          className="absolute bottom-4 right-4 flex items-center justify-center w-[40px] h-[40px] md:w-[100px] md:h-[100px] bg-black/60 !p-0 cursor-pointer backdrop-blur-lg hover:bg-black rounded-full z-10"
          style={{
            transform: `scale(${videoScale})`,
            transformOrigin: "center center",
          }}
        >
          {isFullscreen ? (
            <Minimize className="text-white md:!w-[30px] md:!h-[30px]" />
          ) : (
            <Maximize className="text-white md:!w-[30px] md:!h-[30px]" />
          )}
        </Button>
      </div>

      <div
        className="flex items-center justify-center transition-all duration-75 ease-out"
        style={{
          marginTop: `${0.5 + (-2 - videoScale) * 2}rem`,
        }}
      >
        <h1 className="text-3xl md:text-4xl font-light !px-8 md:!px-16 text-center !py-[20%] md:!py-0 md:w-[50%]">
          Over 50 years of innovation, straight from Syria. Now in{" "}
          <span className="text-red-500">Nairobi</span> Everywhere we've been
          pushes us toward everywhere we've yet to go.
        </h1>
      </div>

      <div className="!px-6 flex items-center justify-center">
        <Link
          href={"/Ourstory"}
          scroll={false}
          className={
            "bg-amber-500 md:w-[25%] hover:bg-blue-900 font-bold transition-all duration-500 text-white flex items-center justify-center gap-3 w-full cursor-pointer rounded-none h-[6vh]"
          }
        >
          Know Our History
          <ChevronRight />
        </Link>
      </div>
    </div>
  );
};

export default History;
