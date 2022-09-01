import React from "react";
import SideBySide from "components/Frontend/SideBySide";
import Navigation from "components/Frontend/Navigation";
import SamasamaHero from "components/Frontend/SamasamaHero";

import { OUR_COMPANY_CSR, HERO_CSR } from "constants.js";
import { readByLocation } from "actions/hero";

import { getSideBySideByLocation } from "actions/sideBySide";
import { getLink } from "actions/media";
import { createRef, useState } from "react";
const csrPage = ({ sideBySide, hero }) => {
  const refs = sideBySide.map((item) => createRef());

  const [heroData, setHeroData] = useState({
    imgLocation: getLink(hero.image),
    title: hero.title,
    content: hero.content,
  });

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

  return (
    <>
      <Navigation />
      <div className="main">
        <SamasamaHero next={refs[0]} withLogo data={heroData} />
        {showSideBySide()}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await getSideBySideByLocation(OUR_COMPANY_CSR);
  const hero = await readByLocation(HERO_CSR);

  // Pass data to the page via props
  return {
    props: {
      hero: hero.data,
      sideBySide: res.data,
    },
  };
}

export default csrPage;
