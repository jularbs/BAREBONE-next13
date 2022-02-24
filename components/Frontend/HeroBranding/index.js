import "./styles.scss";

import { forwardRef } from "react";
import ReactPlayer from "react-player/lazy";
import { Row, Col } from "reactstrap";
import Link from "next/link";
const HeroBranding = forwardRef(({ data, next }, myRef) => {
  const {
    logoLocation,
    bgLocation,
    title,
    content,
    ctaText,
    ctaLink,
    videoLink,
  } = data;

  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <>
      <div
        className="hero-branding-container"
        style={{ backgroundImage: `url(${bgLocation})` }}
        ref={myRef}
      >
        <div className="bg-overlay-blue" />
        <div className="arrow-placement">
          <div className="arrow-wrapper" onClick={scrollNext} />
        </div>
        <Row>
          <Col lg={6} sm={12} className="w-100">
            <div className="content-container justify-content-center">
              <div className="title" style={{ width: "100%" }}>
                <div className="main-title">{title}</div>
                <img className="logo" src={logoLocation} width="100%" />
              </div>
              <div className="content">{content}</div>
              <Link href={ctaLink}>
                <button className="cta-button btn btn-block">
                  <span>{ctaText}</span> <img src="/common/arrow-white.svg" />
                </button>
              </Link>
            </div>
          </Col>
          <Col lg={6} sm={12} className="w-100">
            <div className="media-container">
              <div className="embed-responsive embed-responsive-16by9">
                <ReactPlayer
                  url={videoLink}
                  className="player"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
});

export default HeroBranding;
