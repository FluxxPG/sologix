'use client';

import { Button } from "@nextui-org/react";
import { Hero } from "@/components/Home/Hero";
import { TrustedBy } from "@/components/Home/TrustedBy";
import { AboutUs } from "@/components/Home/AboutUs";
import { ExploreProducts } from "@/components/Home/ExploreProducts";
import { WhySolar } from "@/components/Home/WhySolar";
import { OurJourney } from "@/components/Home/OurJourney";
import { PMSuryaGhar } from "@/components/Home/PMSuryaGhar";

export default function Home() {
  return (
    <div>
      <Hero />
      <PMSuryaGhar />
      <ExploreProducts />
      <TrustedBy />
      <AboutUs />
      <WhySolar />
      <OurJourney />
    </div>
  );
}
