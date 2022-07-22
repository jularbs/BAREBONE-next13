import React from "react";

import Navigation from "components/Frontend/Navigation";
import HeroBasic from "components/Frontend/HeroBasic";
import OurTeamCard from "components/Frontend/OurTeamCard";

import { OUR_COMPANY_OUR_TEAMS } from "constants.js";

import { getSideBySideByLocation } from "actions/sideBySide";
import { getLink } from "actions/media";
import { createRef } from "react";

import { useRef } from "react";

const OurTeamsPage = ({ sideBySide }) => {
  const orgSection = useRef(null);
  const ourteam1 = useRef(null);
  const ourteam2 = useRef(null);
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

  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBasic
          next={orgSection}
          black
          data={{
            title: "Our Teams",
            content:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient.",
            bgLocation: "/bg/our-leadership.png",
          }}
        />
        {showSideBySide()}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await getSideBySideByLocation(OUR_COMPANY_OUR_TEAMS);
  // Pass data to the page via props
  return {
    props: {
      sideBySide: res.data,
    },
  };
}

export default OurTeamsPage;
