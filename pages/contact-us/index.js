import React from "react";
import { Row, Col } from "reactstrap";

import Navigation from "components/Frontend/Navigation";
import ContactUsSection from "components/Frontend/Sections/ContactUsSection";

import { useRef } from "react";

function ContactUsPage() {
  return (
    <>
      <Navigation />
      <div className="main _pt-70">
        <ContactUsSection />
      </div>
    </>
  );
}

export default ContactUsPage;
