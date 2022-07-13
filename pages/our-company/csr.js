import React from "react";
import SideBySide from "components/Frontend/SideBySide";
import Navigation from "components/Frontend/Navigation";
import HeroBasic from "components/Frontend/HeroBasic";
import SamasamaHero from "components/Frontend/SamasamaHero";

import { OUR_COMPANY_CSR } from "constants.js";

import { getSideBySideByLocation } from "actions/sideBySide";
import { getLink } from "actions/media";
import { createRef } from "react";
const csrPage = ({ sideBySide }) => {
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
        <SamasamaHero
          next={refs[0]}
          withLogo
          data={{
            content:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient.",
            imgLocation: "/logos/main-color.png",
          }}
        />
        {showSideBySide()}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await getSideBySideByLocation(OUR_COMPANY_CSR);
  // Pass data to the page via props
  return {
    props: {
      sideBySide: res.data,
    },
  };
}

export default csrPage;
