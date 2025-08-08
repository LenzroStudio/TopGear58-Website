"use client";
import { navlinks } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { t_logo } from "../../public/images/images";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Booking from "./Booking";
import { Instagram, Music, Ticket, Twitter } from "lucide-react";
const Navbar = () => {
  const [Menustatus, setStatus] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const handleBookingClick = () => {
    setShowBooking(true);
  };

  const handleBackToMenu = () => {
    setShowBooking(false);
  };

  const handleMobileBookingClose = () => {
    setShowBooking(false);
    setStatus(false); // Close mobile menu entirely
  };

  const handleMobileBookingClick = () => {
    setShowBooking(true);
    // Keep mobile menu open for mobile booking
  };

  const menuControls = () => {};
  return (
    <div>
      {/* desktop navbar */}
      <div className="hidden md:grid grid-cols-3 !py-[1rem] !px-[3%] bg-black/90 backdrop-blur-2xl text-white fixed z-50 w-full">
        {/* navlinks */}
        <div className="flex items-center justify-start gap-[3rem]">
          {navlinks.map((item, index) => (
            <Link
              href={item.to}
              key={index}
              className="cursor-pointer hover:text-red-500 duration-600 transition-all"
            >
              <p>{item.link}</p>
            </Link>
          ))}
        </div>
        {/* logo */}
        <Link href={"/"} className="flex items-center justify-center">
          <Image src={t_logo} alt="Website logo" className="w-[15vw]" />
        </Link>
        {/* booking button */}
        <div className="flex items-center justify-end ">
          <Button className="uiverse-btn" onClick={handleBookingClick}>
            Book an Appointment
          </Button>
        </div>
      </div>

      {/* Mobile navbar */}
      <div className="md:hidden bg-black/30 backdrop-blur-2xl text-white fixed z-50 w-full">
        <div className="!p-[1rem] flex items-center justify-between">
          <Link href={"/"} className="flex items-center justify-center">
            <Image src={t_logo} alt="Website logo" className="w-[42vw]" />
          </Link>
          <div>
            <button
              onClick={() => setStatus((prev) => !prev)}
              aria-label={Menustatus ? "Close menu" : "Open menu"}
              className="relative z-50 flex items-center justify-center w-10 h-10"
            >
              <div
                className={`absolute left-1/2 top-1/2 w-5 h-0.5 bg-white rounded transition-all duration-300 ${
                  Menustatus
                    ? "rotate-45 -translate-x-1/2 -translate-y-1/2"
                    : "-translate-x-1/2 -translate-y-1.5"
                }`}
              />
              <div
                className={`absolute left-1/2 top-1/2 w-5 h-0.5 bg-white rounded transition-all duration-300 ${
                  Menustatus
                    ? "-rotate-45 -translate-x-1/2 -translate-y-1/2"
                    : "-translate-x-1/2 translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
        {/* sidemenu */}
        <AnimatePresence>
          {Menustatus && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              className="fixed top-0 right-0 h-screen w-full bg-black text-white z-50 shadow-lg"
            >
              <div className="flex flex-col h-full md:flex-row">
                {/* Close button at top right of sidebar */}
                <div className="absolute top-4 right-4 z-50">
                  <button
                    onClick={() => setStatus(false)}
                    aria-label="Close menu"
                    className="flex items-center justify-center w-10 h-10 border border-white/30 rounded-full bg-black/60 hover:bg-black/80 transition"
                  >
                    <div className="absolute left-1/2 top-1/2 w-5 h-0.5 bg-white rounded rotate-45 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute left-1/2 top-1/2 w-5 h-0.5 bg-white rounded -rotate-45 -translate-x-1/2 -translate-y-1/2" />
                  </button>
                </div>
                <div className="flex-1 flex flex-col items-start gap-6  !mt-8">
                  {/* Show booking form or menu items */}
                  <AnimatePresence mode="wait">
                    {showBooking ? (
                      <Booking key="booking" onBack={handleBackToMenu} />
                    ) : (
                      <motion.div
                        key="menu"
                        className="flex flex-col gap-6 w-full !px-6"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: { transition: { staggerChildren: 0.12 } },
                          hidden: {},
                        }}
                      >
                        {navlinks.map((item, index) => (
                          <motion.div
                            key={index}
                            variants={{
                              hidden: { x: 40, opacity: 0 },
                              visible: { x: 0, opacity: 1 },
                            }}
                          >
                            <Link
                              href={item.to}
                              className="cursor-pointer text-lg "
                              onClick={() => setStatus(false)}
                            >
                              <p>{item.link}</p>
                            </Link>
                          </motion.div>
                        ))}
                        <motion.div
                          variants={{
                            hidden: { x: 40, opacity: 0 },
                            visible: { x: 0, opacity: 1 },
                          }}
                        >
                          <Button
                            className={
                              "rounded-none border border-[#ff2c2c] bg-black transition-all duration-500 cursor-pointer hover:border-white hover:text-black hover:bg-red-500 "
                            }
                            onClick={handleMobileBookingClick}
                          >
                            Book an Appointment
                          </Button>
                        </motion.div>
                        {/* Location Card styled like the yellow zip code card, but with location content */}
                        {/* Location Card styled like the yellow zip code card, but with location content */}
                        <motion.div
                          key="location-card"
                          initial={{ y: 80, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 80, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 60,
                            delay: 1.0, // This delay should match or slightly exceed the side menu's slide-in duration
                          }}
                          className="bg-white w-screen h-[68vh] rounded-tl-4xl rounded-tr-none rounded-br-none rounded-bl-none mt-8 overflow-hidden flex flex-col relative"
                          style={{
                            marginLeft: "-24px",
                            marginRight: "-24px",
                            marginBottom: "-24px",
                          }}
                        >
                          <div className="p-0">
                            <div className="bg-yellow-400 w-full px-8 py-[1.25rem]">
                              <h3 className="font-bold text-sm text-gray-900">
                                Find Our Location
                              </h3>
                            </div>
                            <div className="w-full">
                              {/* Embedded Map */}
                              <div className="w-full overflow-hidden mb-2">
                                <iframe
                                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d34569.80672527318!2d36.8380108!3d-1.2792793!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11a66a8b5077%3A0x52d611a099b8730e!2sTopGear58!5e1!3m2!1sen!2ske!4v1754471731476!5m2!1sen!2ske"
                                  width="100%"
                                  height="100%"
                                  style={{ border: 0 }}
                                  allowFullScreen=""
                                  loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                              </div>
                              {/* Socials */}
                              <div className="flex flex-col gap-0.5 mt-2 !py-7 !px-6 text-black">
                                {/* TikTok */}
                                <a
                                  href="https://www.tiktok.com/@topgear58"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-4 py-2 border-b-2 border-gray-200 font-bold text-xs"
                                >
                                  {/* TikTok Icon SVG */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill={"#000000"}
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 3 3 0 0 1 .88.13V9.4a7 7 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a5 5 0 0 1-1-.1z"></path>
                                  </svg>
                                  TikTok
                                </a>
                                {/* Instagram */}
                                <a
                                  href="https://www.instagram.com/topgear58"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-4 py-2 border-b-2 border-gray-200 font-bold text-xs"
                                >
                                  {/* Instagram Icon SVG */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill={"#000000"}
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M20.947 8.305a6.5 6.5 0 0 0-.419-2.216 4.6 4.6 0 0 0-2.633-2.633 6.6 6.6 0 0 0-2.186-.42c-.962-.043-1.267-.055-3.709-.055s-2.755 0-3.71.055a6.6 6.6 0 0 0-2.185.42 4.6 4.6 0 0 0-2.633 2.633 6.6 6.6 0 0 0-.419 2.185c-.043.963-.056 1.268-.056 3.71s0 2.754.056 3.71c.015.748.156 1.486.419 2.187a4.6 4.6 0 0 0 2.634 2.632 6.6 6.6 0 0 0 2.185.45c.963.043 1.268.056 3.71.056s2.755 0 3.71-.056a6.6 6.6 0 0 0 2.186-.419 4.62 4.62 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.187.043-.962.056-1.267.056-3.71-.002-2.442-.002-2.752-.058-3.709m-8.953 8.297c-2.554 0-4.623-2.069-4.623-4.623s2.069-4.623 4.623-4.623a4.623 4.623 0 0 1 0 9.246m4.807-8.339a1.077 1.077 0 0 1-1.078-1.078 1.077 1.077 0 1 1 2.155 0c0 .596-.482 1.078-1.077 1.078"></path>
                                    <path d="M11.994 8.976a3.003 3.003 0 1 0 0 6.006 3.003 3.003 0 1 0 0-6.006"></path>
                                  </svg>
                                  Instagram
                                </a>
                                {/* Twitter */}
                                <a
                                  href="https://twitter.com/topgear58"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-4 py-2 border-b-2 border-gray-200 font-bold text-sm"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill={"#000000"}
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M13.68 10.62 20.24 3h-1.55L13 9.62 8.45 3H3.19l6.88 10.01L3.19 21h1.55l6.01-6.99 4.8 6.99h5.24l-7.13-10.38Zm-2.13 2.47-.7-1-5.54-7.93H7.7l4.47 6.4.7 1 5.82 8.32H16.3z"></path>
                                  </svg>
                                  Twitter
                                </a>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* Removed duplicate close button at bottom right */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Overlay */}
        <AnimatePresence>
          {Menustatus && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setStatus(false)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Booking Modal */}
      <AnimatePresence>
        {showBooking && (
          <>
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4,
              }}
              className="fixed left-0 top-[68px] w-full h-[calc(100vh-68px)] z-[70] hidden md:flex bg-black"
            >
              <div className="bg-black w-screen max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gradient-to-r from-red-900/20 to-gray-900/20 flex-shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Book Your Service
                      </h2>
                      <p className="text-gray-300">
                        Schedule your automotive service appointment
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBooking(false)}
                    className="w-10 h-10 rounded-full bg-gray-800/50 border border-gray-600/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 group"
                  >
                    <svg
                      className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Booking Form Content */}
                <div className="flex-1 min-h-0">
                  <Booking onBack={() => setShowBooking(false)} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
