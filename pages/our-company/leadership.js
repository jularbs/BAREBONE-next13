import React from "react";

import Navigation from "components/Frontend/Navigation";
import HeroBasic from "components/Frontend/HeroBasic";
import OrgChartSection from "components/Frontend/Sections/OrgChartSection";

import { useRef, useState, useEffect } from "react";

import { readByLocation } from "actions/hero";
import { getLink } from "actions/media";
import { HERO_LEADERSHIP, ORG_CHART_IMAGE } from "constants.js";

import { readOption } from "actions/option";

const LeadershipPage = ({ hero }) => {
  const orgSection = useRef(null);
  const [orgChartSrc, setOrgChartSrc] = useState({});
  const [heroData, setHeroData] = useState({
    bgLocation: getLink(hero.background),
    title: hero.title,
    content: hero.content,
  });

  useEffect(() => {
    readOption(ORG_CHART_IMAGE).then((data) => {
      if (data.data) setOrgChartSrc(data.data);
    });
  }, []);

  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBasic next={orgSection} black data={heroData} />
        <OrgChartSection ref={orgSection} />
        {orgChartSrc.media && (
          <img src={getLink(orgChartSrc.media)} width="100%" />
        )}
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
