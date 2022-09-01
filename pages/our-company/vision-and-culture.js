//TODOS: UseRef for array

import React from "react";

import Navigation from "components/Frontend/Navigation";
import HeroBasic from "components/Frontend/HeroBasic";

import SideBySide from "components/Frontend/SideBySide";

import {
  OUR_BRAND_VISION_AND_CULTURE,
  HERO_VISION_CULTURE,
} from "constants.js";

import { getSideBySideByLocation } from "actions/sideBySide";
import { readByLocation } from "actions/hero";
import { getLink } from "actions/media";
import { createRef, useState } from "react";

const VisionAndCulturePage = ({ sideBySide, hero }) => {
  const refs = sideBySide.map((item) => createRef());

  const showSideBySide = () => {
    return sideBySide.map((item, key) => {
      return (
        <SideBySide
          ref={refs[key]}
          next={refs[key + 1]}
          data={{
            imgLocation: getLink(item.background),
            title: item.header,
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
        <HeroBasic next={refs[0]} blue black data={heroData} />

        {showSideBySide()}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await getSideBySideByLocation(OUR_BRAND_VISION_AND_CULTURE);
  const hero = await readByLocation(HERO_VISION_CULTURE);

  // Pass data to the page via props
  return {
    props: {
      sideBySide: res.data,
      hero: hero.data,
    },
  };
}

export default VisionAndCulturePage;
