import React, { useState } from "react";
import Image from "next/image";
import { LocationQR, t_logo } from "../../public/images/images";
import { Globe, Phone } from "lucide-react";

const Cardstemplate = ({ color, text, textColor }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-[270px] md:h-[350px] perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: "1200px" }}
    >
      <div
        className={`absolute w-[370px] md:w-[500px] h-[30vh] md:h-[40vh] rounded-2xl ${color} transition-transform duration-700`}
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front Side */}
        <div
          className={`absolute w-[370px] md:w-[500px] h-[30vh] md:h-[40vh] ${color} ${textColor} !p-6`}
          style={{
            backfaceVisibility: "hidden",
            background: color,
            color: textColor,
            borderRadius: "1.5rem",
          }}
        >
          <div>
            <Image src={t_logo} className="!w-34 md:!w-50" alt="Logo" />
            <p className="text-[9px] md:text-xs !ml-6  font-bold">
              Driven by Trust , Powered by Care
            </p>
          </div>
          <div
            className={`absolute top-44 md:top-58 right-6 text-2xl font-extrabold`}
          >
            <h1>{text}</h1>
          </div>
        </div>
        {/* Back Side */}
        <div
          className={`absolute w-[370px] md:w-[500px] h-[30vh] md:h-[40vh] rounded-2xl ${color} ${textColor} flex flex-col !p-6`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div>
            <Image src={t_logo} className="!w-34 md:!w-40" alt="Logo" />
            <p className="text-[6px] md:text-[10px] !ml-6 font-bold">
              Driven by Trust , Powered by Care
            </p>
          </div>
          <div
            className={`absolute top-20 md:top-30 left-10 flex flex-col gap-4 w-[78vw] md:w-full `}
          >
            <div>
              <p className=" text-[8px] text-xs">Your subscription type is:</p>
              <h1 className="text-md font-extrabold">{text}</h1>
            </div>
            <div className="rounded-md text-center text-xl md:text-4xl !p-3 font-extrabold border-2 ">
              TG58 0010 0GGC 07CO
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="text-[8px] md:text-[11px] flex items-center gap-2">
                <Phone className="!w-3 !h-3" />
                <p>+254717721106 / +254723279953</p>
              </div>
              <div className="text-[8px] md:text-[11px] flex items-center gap-2">
                <Globe className="!w-3 !h-3" />
                <p>TOPGEAR58.COM</p>
              </div>
            </div>
          </div>
          <div className="absolute top-8 right-6">
            <Image src={LocationQR} className="!w-10 !h-10 md:!w-15 md:!h-15" />
            <div className="!ml-[10px] text-[8px] md:text-xs">
              <span>find us</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardstemplate;
