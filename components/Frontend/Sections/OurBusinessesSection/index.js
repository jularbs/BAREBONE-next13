import "./styles.scss";

import { Row, Col } from "reactstrap";
import CompanyCard from "components/Frontend/CompanyCard";
import { forwardRef } from "react";

const OurBusinessesSection = forwardRef(({}, myRef) => {
  const data = [
    {
      title: "Love Radio",
      logoLocation: "/logos/love-logo-h.svg",
      content:
        "It's difficult to find examples of lorem ipsum in use before Letraset made it popular as a dummy text in the 1960s, although McClintock says he remembers coming across the lorem ipsum passage in a book of old metal type samples. So far he hasn't relocated where he once saw the passage, but the popularity of Cicero in the 15th century supports the theory that the filler text has been used for centuries. And anyways, as Cecil Adams reasoned, “[Do you really] think graphic arts supply houses were hiring classics scholars in the 1960s?” Perhaps. But it seems reasonable to imagine that there was a version in use far before the age of Letraset.",
      ctaLabel: "VISIT WEBSITE",
      ctaLink: "/",
    },
    {
      title: "Yes the Best",
      logoLocation: "/logos/yesfm-logo-color.svg",
      content:
        "Lorem ipsum passage in a book of old metal type samples. So far he hasn't relocated where he once saw the passage, supports the theory that the filler text has been used for centuries. And anyways, as Cecil Adams reasoned, “[Do you really] think graphic arts supply houses were hiring classics scholars in the 1960s?” Perhaps. But it seems reasonable to imagine that there was a version in use far before the age of Letraset.",
      ctaLabel: "VISIT WEBSITE",
      ctaLink: "/",
    },
    {
      title: "Easy Rock",
      logoLocation: "/logos/easy-logo-color.svg",
      content:
        "Ilorem ipsum in use before Letraset made it across the lorem ipsum passage in a book of old metal type samples. So far he hasn't relocated where he once saw the passage, but the popularity of Cicero in the 15th century supports the theory that the filler text has been used for centuries. And anyways, as Cecil Adams reasoned, “[Do you really] think graphic arts supply houses were hiring classics scholars in the 1960s?” Perhaps. But it seems reasonable to imagine that there was a version in use far before the age of Letraset.",
      ctaLabel: "VISIT WEBSITE",
      ctaLink: "/",
    },
    {
      title: "DZRH",
      logoLocation: "/logos/dzrh-logo-color.svg",
      content:
        "It's difficult to find examples of lorem ipsum in use before Letraset made it popular as a dummy text in the 1960s, although McClintock says he remembers coming across the lorem ipsum passage in a book of old metal type samples. So far he hasn't relocated where he once saw the passage, but the popularity of Cicero in the 15th century supports the theory that the filler text has been used for centuries. And anyways, as Cecil Adams reasoned, “[Do you really] think graphic arts supply houses were hiring classics scholars in the 1960s?” Perhaps. But it seems reasonable to imagine that there was a version in use far before the age of Letraset.",
      ctaLabel: "VISIT WEBSITE",
      ctaLink: "/",
    },
    {
      title: "Radio Natin",
      logoLocation: "/logos/rn-logo-color.svg",
      content:
        "Although McClintock says he remembers coming across the lorem ipsum passage in a book of old metal type samples. So far he hasn't relocated where he once saw the passage, but the popularity of Cicero in the 15th century supports the theory that the filler text has been used for centuries. And anyways, as Cecil Adams reasoned, “[Do you really] think graphic arts supply houses were hiring classics scholars in the 1960s?” Perhaps. But it seems reasonable to imagine that there was a version in use far before the age of Letraset.",
      ctaLabel: "VISIT WEBSITE",
      ctaLink: "/",
    },
    {
      title: "Aksyon Radio",
      logoLocation: "/logos/aksyon-logo-color.svg",
      content:
        "So far he hasn't relocated where he once saw the passage, but the popularity of Cicero in the 15th century supports the theory that the filler text has been used for centuries. And anyways, as Cecil Adams reasoned, “[Do you really] think graphic arts supply houses were hiring classics scholars in the 1960s?” Perhaps. But it seems reasonable to imagine that there was a version in use far before the age of Letraset.",
      ctaLabel: "VISIT WEBSITE",
      ctaLink: "/",
    },
  ];
  const showCards = () => {
    return data.map((item, index) => {
      return (
        <Col lg={4} className="mb-4" key={index}>
          <CompanyCard
            title={item.title}
            logoLocation={item.logoLocation}
            content={item.content}
            ctaLabel={item.ctaLabel}
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
