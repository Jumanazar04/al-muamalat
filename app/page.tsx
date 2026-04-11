import Image from "next/image";
import HeroSection from "@/components/hero/Hero";
import OurServices from "@/components/ourServices/OurServices";

export default function Home() {
  return (
    <>
      <HeroSection />
      <OurServices />
    </>
  );
}
