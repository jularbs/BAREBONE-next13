import React from "react";

import Navigation from "components/Frontend/Navigation";
import HeroBasic from "components/Frontend/HeroBasic";
import OurTeamCard from "components/Frontend/OurTeamCard";

import { OUR_COMPANY_OUR_TEAMS, HERO_OUR_TEAMS } from "constants.js";

import { getSideBySideByLocation } from "actions/sideBySide";
import { readByLocation } from "actions/hero";

import { getLink } from "actions/media";
import { createRef, useState } from "react";

const OurTeamsPage = ({ sideBySide, hero }) => {
  const refs = sideBySide.map((item) => createRef());

  const showSideBySide = () => {
    return sideBySide.map((item, key) => {
      return (
        <OurTeamCard
          ref={refs[key]}
          next={refs[key + 1]}
          data={{
            imgLocation: getLink(item.background),
            logoLocation: getLink(item.logo),
            title: item.title,
            content: item.content,
          }}
          key={key}
          reverse={key % 2 == 0 ? true : false}
        />
      );
    });
  };

  const [heroData, setHeroData] = useState({
    bgLocation: getLink(hero.background),
    title: hero.title,
    content: hero.content,
  });

  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBasic next={refs[0]} black data={heroData} />
        {showSideBySide()}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await getSideBySideByLocation(OUR_COMPANY_OUR_TEAMS);
  const hero = await readByLocation(HERO_OUR_TEAMS);

  // Pass data to the page via props
  return {
    props: {
      hero: hero.data,
      sideBySide: res.data,
    },
  };
}

export default OurTeamsPage;
