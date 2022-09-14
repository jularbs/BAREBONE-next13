import React from "react";

import Navigation from "components/Frontend/Navigation";
import WorkWithUsSection from "components/Frontend/Sections/WorkWithUsSection/WorkWithUsSection";
import HeroWhyMBC from "components/Frontend/HeroWhyMBC";
import { useRef } from "react";

import { readByLocation } from "actions/hero";

import { WORK_WITH_US_FAQ, HERO_WORK_WITH_US } from "constants.js";

const ContactUsPage = ({ topfold }) => {
  const workWithUsSection = useRef(null);

  return (
    <>
      <Navigation />
      <div className="main">
        <HeroWhyMBC next={workWithUsSection} blue black data={topfold} />
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
