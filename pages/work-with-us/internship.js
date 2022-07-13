import React from "react";

import Navigation from "components/Frontend/Navigation";
import InternshipApplicationSection from "components/Frontend/Sections/InternshipApplicationSection/InternshipApplicationSection";

function ContactUsPage() {
  return (
    <>
      <Navigation />
      <div className="main _pt-70">
        <InternshipApplicationSection />
      </div>
    </>
  );
}

export default ContactUsPage;
