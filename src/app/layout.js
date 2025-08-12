"use client";
import { Outfit, Poppins } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import Loading from "@/components/AppLoader";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "200",
});

// export const metadata = {
//   title: "TopGear58",
//   description: "A Vip Auto Repair shop",
// };

export default function RootLayout({ children }) {
  const [showLoader, setShowLoader] = useState(true);

  if (showLoader) {
    return (
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <title>TopGear58</title>
        </head>
        <body className="antialiased bg-black text-white">
          <Loading onComplete={() => setShowLoader(false)} />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="root">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>TopGear58</title>
      </head>
      <body
        className={`${outfit.variable}  ${poppins.variable} antialiased bg-black text-white`}
      >
        <Toaster richColors position="bottom-center" />
        <Analytics />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
