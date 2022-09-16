import React from "react";

import Navigation from "components/Frontend/Navigation";
import HeroInternship from "components/Frontend/HeroInternship";
import InternshipApplicationSection from "components/Frontend/Sections/InternshipApplicationSection/InternshipApplicationSection";

import { readByLocation } from "actions/hero";

import { readOptions } from "actions/option";

import {
  HERO_INTERNSHIP,
  INTERNSHIP_SHOWCASE_TILE_1,
  INTERNSHIP_SHOWCASE_TILE_2,
  INTERNSHIP_SHOWCASE_TILE_3,
  INTERNSHIP_SHOWCASE_TILE_4,
} from "constants.js";

const InternshipPage = ({ hero, showcaseList }) => {
  return (
    <>
      <Navigation />
      <div className="main">
        <HeroInternship
          // next={workWithUsSection}
          blue
          black
          hero={hero}
          showcaseList={showcaseList}
        />
        <InternshipApplicationSection />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const hero = await readByLocation(HERO_INTERNSHIP);
  const showcaseList = await readOptions([
    INTERNSHIP_SHOWCASE_TILE_1,
    INTERNSHIP_SHOWCASE_TILE_2,
    INTERNSHIP_SHOWCASE_TILE_3,
    INTERNSHIP_SHOWCASE_TILE_4,
  ]);
  // Pass data to the page via props
  return {
    props: {
      hero: hero.data,
      showcaseList: showcaseList.data,
    },
  };
}

export default InternshipPage;
