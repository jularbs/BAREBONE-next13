import React from "react";

import Navigation from "components/Frontend/Navigation";
import HeroBasic from "components/Frontend/HeroBasic";
import HeroBeforeAfter from "components/Frontend/HeroBeforeAfter";

import { useRef } from "react";
import SamasamaHero from "components/Frontend/SamasamaHero";

function OurStoryPage() {
  const beforeAfterRef = useRef(null);
  const leadershipRef = useRef(null);
  const samasamaRef = useRef(null);

  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBasic
          next={beforeAfterRef}
          blue
          data={{
            title: "our story",
            content:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient.",
            bgLocation:
              "https://images.unsplash.com/photo-1520482068820-852e8e63541b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2669&q=80",
          }}
        />
        <HeroBeforeAfter ref={beforeAfterRef} next={leadershipRef} />
        <HeroBasic
          ref={leadershipRef}
          next={samasamaRef}
          black
          data={{
            title: "our leadership",
            content:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient.",
            bgLocation: "/bg/our-leadership.png",
          }}
        />

        <SamasamaHero
          ref={samasamaRef}
          data={{
            imgLocation: "logos/main-color.png",
            content:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient.",
          }}
        />
      </div>
    </>
  );
}

export default OurStoryPage;
