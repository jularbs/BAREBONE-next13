import React from "react";

import Navigation from "components/Frontend/Navigation";
import HeroBasic from "components/Frontend/HeroBasic";

import StoryCard from "components/Frontend/StoryCard/exp";

import { createRef, useState } from "react";
import { getHistoryList } from "actions/history";
import { readByLocation } from "actions/hero";
import { getLink } from "actions/media";
import { HERO_HISTORY } from "constants.js";

const HistoryPage = ({ historyList, hero }) => {
  const refs = historyList.map((item) => createRef());

  const showHistories = () => {
    return historyList.map((item, key) => {
      return (
        <StoryCard
          key={key}
          data={item}
          timeline={historyList.map((item) => item.label)}
          ref={refs[key]}
          next={refs[key + 1]}
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
        <HeroBasic
          next={refs[0]}
          // black
          blue
          data={heroData}
        />
        {showHistories()}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await getHistoryList();
  const hero = await readByLocation(HERO_HISTORY);
  // Pass data to the page via props
  return {
    props: {
      historyList: res.data,
      hero: hero.data,
    },
  };
}

export default HistoryPage;
