import Hero from "@/components/Hero";
import History from "@/components/History";
import Services from "@/components/Services";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Hero/>
      <Services/>
      <History/>
    </div>
  );
}
