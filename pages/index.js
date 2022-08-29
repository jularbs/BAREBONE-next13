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
import { getSimpleBusinessList } from "actions/simpleBusiness";
import { getMetricList } from "actions/metric";
import { getLink } from "actions/media";

//TEST

function Index({ heroBranding, ourBusiness, metric }) {
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
        <Showcase ref={showcaseRef} next={heroMetricsRef} data={ourBusiness} />
        <HeroMetrics ref={heroMetricsRef} next={genericCtaRef} data={metric}/>
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
  const businesses = await getSimpleBusinessList();
  const metrics = await getMetricList();

  // Pass data to the page via props
  return {
    props: {
      heroBranding: res.data,
      ourBusiness: businesses.data,
      metric: metrics.data,
    },
  };
}

export default Index;
