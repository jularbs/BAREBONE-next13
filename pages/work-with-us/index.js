import React from "react";

import Navigation from "components/Frontend/Navigation";
import WorkWithUsSection from "components/Frontend/Sections/WorkWithUsSection/WorkWithUsSection";
import HeroWhyMBC from "components/Frontend/HeroWhyMBC";
import { useRef } from "react";

import { readByLocation } from "actions/hero";

import { HERO_WORK_WITH_US } from "constants.js";
import ValuesHero from "components/Frontend/ValuesHero";
import BenefitsSection from "components/Frontend/Sections/BenefitsSection";
const ContactUsPage = ({ topfold }) => {
  const workWithUsSection = useRef(null);
  const valuesSection = useRef(null);
  const benefitsSection = useRef(null);
  return (
    <>
      <Navigation />
      <div className="main">
        <HeroWhyMBC next={valuesSection} blue black data={topfold} />
        <ValuesHero ref={valuesSection} next={benefitsSection} />
        <BenefitsSection ref={benefitsSection} />
        <WorkWithUsSection ref={workWithUsSection} />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const topfold = await readByLocation(HERO_WORK_WITH_US);
  // Pass data to the page via props
  return {
    props: {
      topfold: topfold.data,
    },
  };
}

export default ContactUsPage;
