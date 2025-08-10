"use client"
import { BackcardContent, FrontcardContent } from "@/assets/assets";
import Cardstemplate from "@/components/Cardstemplate";
import Hero from "@/components/Hero";
import History from "@/components/History";
import Services from "@/components/Services";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [cardSide , setSide] = useState("FRONT");
  return (
    <div className="">
      <Hero />
      <Services />
      <History />
      <div className="!px-[2.5%] md:!px-[5%] !pb-[5rem] !py-[10%] md:!py-[8%] flex flex-col gap-[5rem]">
        {/* section-text */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl !px-8 md:!px-16 text-center">
          Be Part of the Vip Club
        </h1>
        <div className="relative z-10 min-h-[80vh] md:min-h-[90vh]  grid md:grid-cols-2  grid-cols-1 items-center  justify-center  md:gap-[5rem]">
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
                  />
                );
              })}
          {/* pricing */}
          {}
        </div>
      </div>
    </div>
  );
}
