import React from "react";

import Navigation from "components/Frontend/Navigation";
import HeroBasic from "components/Frontend/HeroBasic";
import OrgChartSection from "components/Frontend/Sections/OrgChartSection";

import { useRef, useState } from "react";

import { readByLocation } from "actions/hero";
import { getLink } from "actions/media";
import { HERO_LEADERSHIP } from "constants.js";

const LeadershipPage = ({ hero }) => {
  const orgSection = useRef(null);

  const [heroData, setHeroData] = useState({
    bgLocation: getLink(hero.background),
    title: hero.title,
    content: hero.content,
  });

  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBasic next={orgSection} black data={heroData} />
        <OrgChartSection ref={orgSection} />
        <img src="/bg/org-chart.svg" width="100%" />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const hero = await readByLocation(HERO_LEADERSHIP);
  // Pass data to the page via props
  return {
    props: {
      hero: hero.data,
    },
  };
}

export default LeadershipPage;
