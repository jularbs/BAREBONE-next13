import React from "react";

import Navigation from "components/Frontend/Navigation";
import HeroBasic from "components/Frontend/HeroBasic";
import OrgChartSection from "components/Frontend/Sections/OrgChartSection";

import { useRef } from "react";

function LeadershipPage() {
  const orgSection = useRef(null);
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
      </div>
    </>
  );
}

export default LeadershipPage;
