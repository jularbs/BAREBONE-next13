import React from "react";

import Navigation from "components/Frontend/Navigation";
import HeroInternship from "components/Frontend/HeroInternship";
import InternshipApplicationSection from "components/Frontend/Sections/InternshipApplicationSection/InternshipApplicationSection";

function ContactUsPage() {
  return (
    <>
      <Navigation />
      <div className="main">
        <HeroInternship
          // next={workWithUsSection}
          blue
          black
          data={{
            title: "Are you ready to have a rewarding career with us?",
            content:
              "Working at MBC Media Group is fun and fulfilling! We are the longest-running and pioneering broadcasting company in the Philippines and recognized as an industry leader in content creation. We are always on the lookout for innovative people to help grow our brands, including -- Love Radio, Yes the Best, Easy Rock, DZRH, Radyo Natin, Aksyon Radyo, MBC Talents, MBC Digital etc.",
            bgLocation: "/bg/vnc.png",
          }}
        />
        <InternshipApplicationSection />
      </div>
    </>
  );
}

export default ContactUsPage;
