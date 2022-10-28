import React from "react";

import Navigation from "components/Frontend/Navigation";
import HeroBasic from "components/Frontend/HeroBasic";
import HeroBeforeAfter from "components/Frontend/HeroBeforeAfter";
import GalleryTile from "components/Frontend/GalleryTile";
import { useRef, useState, useEffect } from "react";
import SamasamaHero from "components/Frontend/SamasamaHero";
import { readOption } from "actions/option";
import { readByLocation } from "actions/hero";

import {
  HERO_THEN_VALUES,
  HERO_NOW_VALUES,
  HERO_OUR_STORY,
  HERO_OUR_STORY_SECONDARY,
  HERO_OUR_STORY_SAMASAMA,
} from "constants.js";

import { getLink } from "actions/media";

const OurStoryPage = ({ then, now, topfold }) => {
  const beforeAfterRef = useRef(null);
  const leadershipRef = useRef(null);
  const samasamaRef = useRef(null);

  const topFoldData = {
    bgLocation: getLink(topfold.background),
    title: topfold.title,
    content: topfold.content,
  };

  const [secondaryData, setSecondaryData] = useState({});
  const [samaSamaData, setSamaSamaData] = useState({});

  useEffect(() => {
    readByLocation(HERO_OUR_STORY_SECONDARY).then((data) => {
      setSecondaryData({
        bgLocation: getLink(data.data.background),
        title: data.data.title,
        content: data.data.content,
      });
    });
    readByLocation(HERO_OUR_STORY_SAMASAMA).then((data) => {
      setSamaSamaData({
        ...data.data,
        imgLocation: getLink(data.data.image),
      });
    });
  }, []);

  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBasic next={beforeAfterRef} blue data={topFoldData} />
        <HeroBeforeAfter
          ref={beforeAfterRef}
          next={leadershipRef}
          then={then}
          now={now}
        />
        <HeroBasic
          ref={leadershipRef}
          next={samasamaRef}
          black
          data={secondaryData}
        />
        <GalleryTile />

        <SamasamaHero ref={samasamaRef} data={samaSamaData} />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const then = await readOption(HERO_THEN_VALUES);
  const now = await readOption(HERO_NOW_VALUES);
  const topfold = await readByLocation(HERO_OUR_STORY);
  // Pass data to the page via props
  return {
    props: {
      then: then.data,
      now: now.data,
      topfold: topfold.data,
    },
  };
}

export default OurStoryPage;
