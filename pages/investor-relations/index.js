import React from "react";
import { Row, Col } from "reactstrap";

import Navigation from "components/Frontend/Navigation";
import InvestorRelationsSection from "components/Frontend/Sections/InvestorRelationsSection";
import { useRef } from "react";
import JobsSections from "components/Frontend/Sections/JobsSection/JobsSection";

import InternshipApplicationSection from "components/Frontend/Sections/InternshipApplicationSection/InternshipApplicationSection";
function ContactUsPage() {
  return (
    <>
      <Navigation />
      <div className="main _pt-70">
        {/* <InvestorRelationsSection></InvestorRelationsSection> */}
        {/* <JobsSections /> */}
        <InternshipApplicationSection />
      </div>
    </>
  );
}

export default ContactUsPage;
