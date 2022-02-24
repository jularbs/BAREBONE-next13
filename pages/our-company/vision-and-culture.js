import React from "react";

import Navigation from "components/Frontend/Navigation";
import HeroBasic from "components/Frontend/HeroBasic";

import SideBySide from "components/Frontend/SideBySide";

import { useRef } from "react";

function VisionAndCulturePage() {
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const coreValuesRef = useRef(null);
  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBasic
          next={visionRef}
          blue
          black
          data={{
            title: "Our brand vision and culture",
            content:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient.",
            bgLocation: "/bg/vnc.png",
          }}
        />
        <SideBySide
          ref={visionRef}
          next={missionRef}
          data={{
            imgLocation: "/bg/vision.png",
            title: "Our Vision",
            content:
              "To continuously be the leader in content creation for existing and emerging multimedia platforms, providing global audiences with relevant, compelling content and advertisers with cost-effective ways to reach target audiences.",
          }}
        />
        <SideBySide
          ref={missionRef}
          next={coreValuesRef}
          reverse
          data={{
            imgLocation: "/bg/our-mission.png",
            title: "Our Mission",
            content:
              "Guided by the principles of integrity, responsible financial stewardship, and transparent corporate governance, we continuously serve our internal and external stakeholders, specifically, our audiences, advertisers, and investors.<br><br> We value innovation and adaptability, acknowledging that our continued relevance and competitiveness depends on growing our audiences and our platforms, adding value for our stakeholders, venturing boldly into areas where we enjoy a strategic advantage, providing our clients with integrated marketing solutions, and serving as a socially-responsible corporate citizen.",
          }}
        />
        <SideBySide
          ref={coreValuesRef}
          data={{
            imgLocation: "/bg/core-value.png",
            title: "Our core values",
            content:
              "In the spirit of entrepreneurship and innovation, we nurture a corporate culture that encourages and empowers organization members from all levels to make decisions, act proactively, and provide feedback on how to improve our policies and processes.</br></br>We recognize that our people are our most important asset and so we nurture a meritocratic environment that emphasizes the value of leadership, career growth, teamwork, dedication, and loyalty.</br></br>We build strong, lasting relationships with business partners that share our vision and values and our commitment to being a socially and environmentally-responsible corporate citizen in every community that we serve.",
          }}
        />
      </div>
    </>
  );
}

export default VisionAndCulturePage;
