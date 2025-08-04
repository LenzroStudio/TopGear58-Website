"use client";
import { navlinks } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { t_logo } from "../../public/images/images";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Booking from "./Booking";
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
      <div className="hidden md:grid grid-cols-3 !py-[1rem] !px-[3%] bg-black/30 backdrop-blur-2xl text-white fixed z-50 w-full">
        {/* navlinks */}
        <div className="flex items-center justify-start gap-[3rem]">
          {navlinks.map((item, index) => (
            <Link href={item.to} key={index} className="cursor-pointer">
              <p>{item.link}</p>
            </Link>
          ))}
        </div>
        {/* logo */}
        <div className="flex items-center justify-center">
          <Image src={t_logo} alt="Website logo" className="w-[15vw]" />
        </div>
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
          <div className="flex items-center justify-center">
            <Image src={t_logo} alt="Website logo" className="w-[30vw]" />
          </div>
          <div>
            <button
              onClick={() => setStatus((prev) => !prev)}
              aria-label={Menustatus ? "Close menu" : "Open menu"}
              className="relative z-50 flex items-center justify-center w-10 h-10 border border-white/30 rounded-full"
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
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-end !p-4">
                  <button
                    onClick={() => setStatus(false)}
                    aria-label="Close menu"
                    className="relative z-50 flex items-center justify-center w-10 h-10 border border-white/30 rounded-full"
                  >
                    <div className="absolute left-1/2 top-1/2 w-5 h-0.5 bg-white rounded rotate-45 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute left-1/2 top-1/2 w-5 h-0.5 bg-white rounded -rotate-45 -translate-x-1/2 -translate-y-1/2" />
                  </button>
                </div>
                <motion.div
                  className="flex flex-col items-start gap-6 !px-6 !mt-8"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.12 } },
                    hidden: {},
                  }}
                >
                  {/* Show booking form or menu items */}
                  <AnimatePresence mode="wait">
                    {showBooking ? (
                      <Booking key="booking" onBack={handleBackToMenu} />
                    ) : (
                      <motion.div
                        key="menu"
                        className="flex flex-col gap-6 w-full"
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
                              className="cursor-pointer text-lg"
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
                              "rounded-none border border-[#ff2c2c] bg-black transition-all duration-500 cursor-pointer hover:border-white hover:text-black hover:bg-red-500 !mt-8"
                            }
                            onClick={handleMobileBookingClick}
                          >
                            Book an Appointment
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] hidden md:block"
              onClick={() => setShowBooking(false)}
            />

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
              className="fixed inset-0 z-[70] hidden md:flex items-center justify-center p-4"
            >
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gradient-to-r from-red-900/20 to-gray-900/20">
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
                <div className="h-[calc(90vh-120px)] overflow-hidden">
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
