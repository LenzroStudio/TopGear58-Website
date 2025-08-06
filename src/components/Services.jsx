"use client";
import { services } from "@/assets/assets";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < services.length - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Get next item index
  const getNextIndex = () => {
    return (currentIndex + 1) % services.length;
  };

  // Animation for section entrance
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div className="bg-white text-black relative overflow-hidden">
      <div
        ref={ref}
        className="relative z-10 min-h-[80vh] md:min-h-[90vh] !px-[2.5%] md:!px-0 !pb-[5rem] !py-[8%] md:!py-[5%] flex flex-col items-center text-center justify-center gap-[2rem] md:gap-[5rem]"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl  mozilla-text "
        >
          OUR TAILORMADE SERVICES
        </motion.h1>

        {/* Carousel Container */}
        <div className="relative w-full  mx-auto">
          {/* Main Display Area */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="relative flex items-center justify-center h-[300px] md:h-[400px] w-full overflow-x-hidden">
              <div className="relative w-full h-full overflow-hidden">
                <motion.div
                  className="flex items-center h-full gap-4 md:gap-4 transition-transform"
                  // --- Enable drag/swipe for the carousel ---
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(e, info) => {
                    // --- Snap to nearest image on drag end ---
                    const cardWidth = window.innerWidth < 768 ? 400 : 600;
                    const gap = 16;
                    const totalWidth = cardWidth + gap;
                    // Calculate how many cards to move based on drag offset
                    let moved = Math.round(-info.offset.x / totalWidth);
                    let newIdx = currentIndex + moved;
                    if (newIdx < 0) newIdx = 0;
                    if (newIdx > services.length - 1)
                      newIdx = services.length - 1;
                    if (newIdx !== currentIndex) setCurrentIndex(newIdx);
                  }}
                  animate={{
                    // --- Centering logic for smooth image alignment ---
                    x: (() => {
                      const cardWidth = 600; // md:w-[600px]
                      const gap = 16; // md:gap-4 = 1rem = 16px
                      if (
                        typeof window !== "undefined" &&
                        window.innerWidth < 768
                      ) {
                        return `calc(50% - ${
                          currentIndex + 0.5
                        } * 400px - ${currentIndex} * 16px)`;
                      }
                      if (currentIndex === 0) {
                        return `calc(50% - 0.5 * ${cardWidth}px)`;
                      }
                      if (currentIndex === services.length - 1) {
                        return `calc(50% - ${
                          services.length - 1 + 0.5
                        } * ${cardWidth}px - ${services.length - 1} * ${gap}px)`;
                      }
                      return `calc(50% - ${
                        currentIndex + 0.5
                      } * ${cardWidth}px - ${currentIndex} * ${gap}px)`;
                    })(),
                  }}
                  // --- Adjust spring config for smoother, less jumpy transition ---
                  transition={{
                    type: "spring",
                    stiffness: 1000,
                    damping: 50,
                    mass: 0.7,
                  }}
                  style={{ minWidth: "100%" }}
                >
                  {services.map((service, idx) => (
                    <div
                      key={service.title + idx}
                      // --- Adjust these classes to change image/card size ---
                      className={`relative w-[400px] h-[260px] md:w-[600px] md:h-[380px] flex-shrink-0`}
                      style={{ transition: "border 0.3s" }}
                    >
                      <Image
                        src={service.img}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 400px, 600px"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Text Content - Always centered, independent of images */}
          <div className="text-center !mt-10 md:!mt-[2rem]">
            <div className="relative flex flex-col justify-center">
              {/* Title with vertical slide animation */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={`title-${currentIndex}`}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center text-xl  md:text-2xl one md:leading-tight mozilla-text"
                  >
                    {services[currentIndex].title}
                  </motion.h3>
                </AnimatePresence>
              </div>

              {/* Description with fade animation */}
              <div className="relative h-16 md:h-20">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`desc-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center !mt-5 text-sm font-light leading-relaxed max-w-xl mx-auto"
                  >
                    {services[currentIndex].description}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-[25%] top-full"
            disabled={currentIndex === 0}
            aria-disabled={currentIndex === 0}
            style={{
              opacity: currentIndex === 0 ? 0.3 : 1,
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
            }}
          >
            <ChevronLeft className="md:w-5 md:h-5 text-black transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-[25%] top-full"
            disabled={currentIndex === services.length - 1}
            aria-disabled={currentIndex === services.length - 1}
            style={{
              opacity: currentIndex === services.length - 1 ? 0.3 : 1,
              cursor:
                currentIndex === services.length - 1
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            <ChevronRight className="md:w-5 md:h-5 text-black transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
