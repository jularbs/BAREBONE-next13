import styles from "./HeroBranding.module.scss";

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
        className={styles["hero-branding-container"]}
        style={{ backgroundImage: `url(${bgLocation})` }}
        ref={myRef}
      >
        <div className="bg-overlay-blue" />
        <div className={styles["arrow-placement"]}>
          <div className="arrow-wrapper" onClick={scrollNext} />
        </div>
        <Row>
          <Col lg={6} sm={12} className="w-100">
            <div className={`${styles["content-container"]} justify-content-center`}>
              <div className={styles["title"]} style={{ width: "100%" }}>
                <div className={styles["main-title"]}>{title}</div>
                <img className={styles["logo"]} src={logoLocation} width="100%" />
              </div>
              <div className={styles["content"]}>{content}</div>
              <Link href={ctaLink}>
                <button className={`${styles["cta-button"]} btn btn-block`}>
                  <span>{ctaText}</span> <img src="/common/arrow-white.svg" />
                </button>
              </Link>
            </div>
          </Col>
          <Col lg={6} sm={12} className="w-100">
            <div className={styles["media-container"]}>
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
