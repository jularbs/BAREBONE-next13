import React from "react";
// reactstrap components
// core components
import HeroBranding from "components/Frontend/HeroBranding";
import Showcase from "components/Frontend/Showcase";
import HeroMetrics from "components/Frontend/HeroMetrics";
import GenericCTA from "components/Frontend/GenericCTA";
import LogoShowcase from "components/Frontend/LogoShowcase/LogoShowcase";
import Navigation from "components/Frontend/Navigation";
import { useRef } from "react";
import { HERO_TYPE_BRANDING, HERO_HOMEPAGE } from "constants.js";

import { readHeroByTypeLocation } from "actions/hero";
import { getLink } from "actions/media";

//TEST

function Index({ heroBranding }) {
  const showcaseRef = useRef(null);
  const genericCtaRef = useRef(null);
  const heroMetricsRef = useRef(null);
  const heroBrandingRef = useRef(null);

  const branding = {
    logoLocation: getLink(heroBranding.image),
    bgLocation: getLink(heroBranding.background),
    title: "",
    content: heroBranding.content,
    ctaText: heroBranding.ctaText,
    ctaLink: heroBranding.ctaLink,
    videoLink: heroBranding.videoURL,
  };
  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBranding
          ref={heroBrandingRef}
          next={showcaseRef}
          data={branding}
        />
        <Showcase ref={showcaseRef} next={heroMetricsRef} />
        <HeroMetrics ref={heroMetricsRef} next={genericCtaRef} />
        <GenericCTA ref={genericCtaRef} />
        <LogoShowcase />
      </div>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const index = { type: HERO_TYPE_BRANDING, location: HERO_HOMEPAGE };
  const res = await readHeroByTypeLocation(index);

  // Pass data to the page via props
  return {
    props: {
      heroBranding: res.data,
    },
  };
}

export default Index;
