import "./styles.scss";

import { Row, Col } from "reactstrap";
import CompanyCard from "components/Frontend/CompanyCard";
import { forwardRef, useEffect, useState } from "react";

import { getLink } from "actions/media";
import { getCompanyShowcaseByLocation } from "actions/companyShowcase";

const OurBusinessesSection = forwardRef(({ location }, myRef) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    //loading
    getCompanyShowcaseByLocation(location).then((data) => {
      console.log(data);
      setData(data.data);
    });
  }, []);
  const showCards = () => {
    return data.map((item, index) => {
      return (
        <Col lg={4} className="mb-4" key={index}>
          <CompanyCard
            title={item.name}
            logoLocation={getLink(item.logo)}
            content={item.content}
            ctaLabel={item.ctaText}
            ctaLink={item.ctaLink}
          />
        </Col>
      );
    });
  };
  return (
    <>
      <div className="business-showcase" ref={myRef}>
        <Row style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {showCards()}
        </Row>
      </div>
    </>
  );
});

export default OurBusinessesSection;
