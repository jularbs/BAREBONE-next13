import React from "react";
import SideBySide from "components/Frontend/SideBySide";
import Navigation from "components/Frontend/Navigation";
import HeroBasic from "components/Frontend/HeroBasic";
import SamasamaHero from "components/Frontend/SamasamaHero";

import { useRef } from "react";
function csrPage() {
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);

  return (
    <>
      <Navigation />
      <div className="main">
        <SamasamaHero
          next={firstRef}
          withLogo
          data={{
            content:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient.",
            imgLocation: "/logos/main-color.png",
          }}
        />
        <SideBySide
          ref={firstRef}
          next={secondRef}
          data={{
            imgLocation: "/bg/csr-1.svg",
            title: "",
            content:
              "To continuously be the leader in content creation for existing and emerging multimedia platforms, providing global audiences with relevant, compelling content and advertisers with cost-effective ways to reach target audiences.",
          }}
        />
        <SideBySide
          ref={secondRef}
          next={thirdRef}
          reverse
          data={{
            imgLocation: "/bg/csr-2.svg",
            title: "",
            content:
              "Guided by the principles of integrity, responsible financial stewardship, and transparent corporate governance, we continuously serve our internal and external stakeholders, specifically, our audiences, advertisers, and investors.<br><br> We value innovation and adaptability, acknowledging that our continued relevance and competitiveness depends on growing our audiences and our platforms, adding value for our stakeholders, venturing boldly into areas where we enjoy a strategic advantage, providing our clients with integrated marketing solutions, and serving as a socially-responsible corporate citizen.",
          }}
        />
        <SideBySide
          ref={thirdRef}
          data={{
            imgLocation: "/bg/csr-3.svg",
            title: "",
            content:
              "Guided by the principles of integrity, responsible financial stewardship, and transparent corporate governance, we continuously serve our internal and external stakeholders, specifically, our audiences, advertisers, and investors.<br><br> We value innovation and adaptability, acknowledging that our continued relevance and competitiveness depends on growing our audiences and our platforms, adding value for our stakeholders, venturing boldly into areas where we enjoy a strategic advantage, providing our clients with integrated marketing solutions, and serving as a socially-responsible corporate citizen.",
          }}
        />
      </div>
    </>
  );
}

export default csrPage;
