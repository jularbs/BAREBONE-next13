import "./styles.scss";

import { Row, Col } from "reactstrap";

import { forwardRef } from "react";
import CustomArrow from "../CustomArrow";
const Showcase = forwardRef(({ next }, myRef) => {
  const data = [
    {
      bgLocation: "/bg/radio-bg.png",
      logoLocation: "/logos/mbc-radio-white.svg",
      link: "",
    },
    {
      bgLocation: "/bg/tv-bg.png",
      logoLocation: "/logos/mbc-tv-white.svg",
      link: "",
    },
    {
      bgLocation: "/bg/events-bg.png",
      logoLocation: "/logos/mbc-events-white.svg",
      link: "",
    },
    {
      bgLocation: "/bg/talents-bg.png",
      logoLocation: "/logos/mbc-talents-white.svg",
      link: "",
    },
    {
      bgLocation: "/bg/promos-bg.png",
      logoLocation: "/logos/mbc-promos-white.svg",
      link: "",
    },
    {
      bgLocation: "/bg/digital-bg.png",
      logoLocation: "/logos/mbc-digital-white.svg",
      link: "",
    },
  ];

  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const showBusinesses = () => {
    return data.map((item, key) => {
      return (
        <Col lg={4} className="px-2 py-2" key={key}>
          <div
            className="card-item"
            style={{
              backgroundImage: `url(${item.bgLocation})`,
            }}
          >
            <div className="black-gradient-overlay" />
            <div className="logo">
              <img src={item.logoLocation} height="50px" alt="" />
            </div>
            <CustomArrow className="reverse arrow-icon" />
          </div>
        </Col>
      );
    });
  };

  return (
    <>
      <div className="showcase-container" ref={myRef}>
        <div className="header-container">
          <div className="header">Our Businesses</div>
          <div className="subheader">
            on-air &#8226; on-ground &#8226; online
          </div>
        </div>
        <div className="showcase-cards-container">
          <Row className="px-4">{showBusinesses()}</Row>
        </div>
        {next && (
          <div className="arrow-placement">
            <div className="arrow-wrapper bg-black" onClick={scrollNext} />
          </div>
        )}
      </div>
    </>
  );
});

export default Showcase;
