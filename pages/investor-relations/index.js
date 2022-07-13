import React from "react";

import Navigation from "components/Frontend/Navigation";
import InvestorRelationsSection from "components/Frontend/Sections/InvestorRelationsSection";

function InvestorRelationsPage() {
  return (
    <>
      <Navigation />
      <div className="main _pt-70">
        <InvestorRelationsSection />
      </div>
    </>
  );
}

export default InvestorRelationsPage;
