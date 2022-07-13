//TODOS: UseRef for array

import React from "react";

import Navigation from "components/Frontend/Navigation";
import HeroBasic from "components/Frontend/HeroBasic";

import SideBySide from "components/Frontend/SideBySide";

import { OUR_BRAND_VISION_AND_CULTURE } from "constants.js";

import { getSideBySideByLocation } from "actions/sideBySide";
import { getLink } from "actions/media";
import { createRef } from "react";


const VisionAndCulturePage = ({ sideBySide }) => {
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
  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBasic
          next={refs[0]}
          blue
          black
          data={{
            title: "Our brand vision and culture",
            content:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient.",
            bgLocation: "/bg/vnc.png",
          }}
        />

        {showSideBySide()}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await getSideBySideByLocation(OUR_BRAND_VISION_AND_CULTURE);
  // Pass data to the page via props
  return {
    props: {
      sideBySide: res.data,
    },
  };
}

export default VisionAndCulturePage;
