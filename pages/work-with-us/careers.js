import React from "react";
import { Row, Col } from "reactstrap";

import Navigation from "components/Frontend/Navigation";
import JobsSection from "components/Frontend/Sections/JobsSection/JobsSection";
import HeroBasic from "components/Frontend/HeroBasic";

function ContactUsPage() {
  return (
    <>
      <Navigation />
      <div className="main">
        <HeroBasic
        //   next={visionRef}
          blue
          black
          data={{
            title: "Job postings & Career Opportunities",
            content:
              "Working at MBC Media Group is fun and fulfilling! We are the longest-running and pioneering broadcasting company in the Philippines and recognized as an industry leader in content creation. We are always on the lookout for innovative people to help grow our brands, including -- Love Radio, Yes the Best, Easy Rock, DZRH, Radyo Natin, Aksyon Radyo, MBC Talents, MBC Digital etc.",
            bgLocation: "/bg/vnc.png",
          }}
        />
        <JobsSection />
      </div>
    </>
  );
}

export default ContactUsPage;
