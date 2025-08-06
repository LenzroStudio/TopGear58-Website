"use client";
import { navlinks } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { t_logo } from "../../public/images/images";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Booking from "./Booking";
import { Instagram, Ticket, Twitter } from "lucide-react";
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
            <Link href={item.to} key={index} className="cursor-pointer">
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
          <Button
            className={
              "rounded-none border border-[#ff2c2c] bg-black transition-all duration-500 cursor-pointer hover:border-white hover:text-black hover:bg-red-500"
            }
            onClick={handleBookingClick}
          >
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
                        <div
                          className="bg-white w-screen h-[60vh] rounded-tl-3xl rounded-tr-none rounded-br-none rounded-bl-none mt-8 overflow-hidden flex flex-col relative"
                          style={{
                            marginLeft: "-24px",
                            marginRight: "-24px",
                            marginBottom: "-24px",
                          }}
                        >
                          <div className="p-0">
                            <div className="bg-yellow-400 w-full px-4 pt-4 pb-2">
                              <h3 className="font-bold text-gray-900">
                                Find Our Location
                              </h3>
                            </div>
                            <div className="bg-white w-full pb-2 pt-2">
                              {/* Embedded Map */}
                              <div className="w-full rounded-lg overflow-hidden mb-2">
                                <iframe
                                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d34569.80672527318!2d36.8380108!3d-1.2792793!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11a66a8b5077%3A0x52d611a099b8730e!2sTopGear58!5e1!3m2!1sen!2ske!4v1754471731476!5m2!1sen!2ske"
                                  width="100%"
                                  height="100%"
                                  style={{ border: 0 }}
                                  allowFullScreen=""
                                  loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"
                                  referrerpolicy="no-referrer-when-downgrade"
                                ></iframe>
                              </div>
                              <a
                                href="https://www.google.com/maps/search/?api=1&query=9.05785,7.49508"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-center text-black text-xs font-bold underline mt-2 mb-2"
                              >
                                Show Full Map
                              </a>
                              {/* Socials */}
                              <div className="flex flex-col gap-0.5 mt-2 !px-6">
                                <a
                                  href="https://www.tiktok.com/@topgear58"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-4 py-2 border-b-2 border-gray-200 font-bold text-xs text-black hover:text-[#111]"
                                >
                                  <Ticket />
                                  TikTok
                                </a>
                                <a
                                  href="https://www.instagram.com/topgear58"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-4 py-2 border-b-2 border-gray-200 font-bold text-xs text-black hover:text-[#111]"
                                >
                                  <Instagram />
                                  Instagram
                                </a>
                                <a
                                  href="https://twitter.com/topgear58"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-4 py-2 border-b-2 border-gray-200 font-bold text-sm text-black hover:text-[#111]"
                                >
                                  <Twitter />
                                  Twitter
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
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
