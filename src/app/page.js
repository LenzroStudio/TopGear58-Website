"use client"
import { BackcardContent, FrontcardContent } from "@/assets/assets";
import Cardstemplate from "@/components/Cardstemplate";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import History from "@/components/History";
import Location from "@/components/Location";
import Services from "@/components/Services";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [cardSide , setSide] = useState("FRONT");
  return (
    <div className="">
      <Hero />
      <Services />
      <History />
      <div className="!px-[5%] bg-black text-white md:!px-[5%] !pb-[5rem] !py-[3rem] md:!py-[5%] flex flex-col gap-[2rem] md:gap-[5rem] items-center justify-center">
        {/* section-text */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl !px-8 md:!px-16 text-center">
          Be Part of the Vip Club
        </h1>
        <div className="relative z-10 min-h-[80vh] md:min-h-[90vh] w-full grid md:grid-cols-2  grid-cols-1 gap-3 items-center justify-center  md:gap-[5rem]">
          {/* cards */}
          {cardSide === "FRONT"
            ? FrontcardContent.map((item, index) => {
                return (
                  <Cardstemplate
                    key={index}
                    color={item.color}
                    text={item.text}
                    textColor={item.textColor}
                    cardSide={cardSide}
                    logo={item.logo}
                  />
                );
              })
            : BackcardContent.map((item, index) => {
                return (
                  <Cardstemplate
                    key={index}
                    color={item.color}
                    text={item.text}
                    textColor={item.textColor}
                    cardSide={cardSide}
                    logo={item.logo}
                  />
                );
              })}
          {/* pricing */}
          {}
        </div>
        <Link
          href="/membership_cards"
          scroll={true}
          className="w-full flex items-center justify-center"
        >
          <Button
            className={
              "h-11 w-80 bg-gray-800 text-white hover:bg-white hover:text-black rounded-none text-lg cursor-pointer transition-all duration-500 !mt-6 md:!mt-0"
            }
          >
            Get your card now
          </Button>
        </Link>
      </div>
      <Location />
      <Contact />
    </div>
  );
}
