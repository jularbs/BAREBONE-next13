import styles from "./Showcase.module.scss";

import { Row, Col } from "reactstrap";

import { forwardRef } from "react";
import CustomArrow from "../CustomArrow";

import { getLink } from "actions/media";

import Link from "next/link";
const Showcase = forwardRef(({ next, data }, myRef) => {
  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const showBusinesses = () => {
    return data.map((item, key) => {
      return (
        <Col lg={4} className="px-2 py-2" key={key}>
          <Link href={`${item.URL}`}>
            <div
              className={styles["card-item"]}
              style={{
                backgroundImage: `url("${getLink(item.background)}")`,
              }}
            >
              <div className="black-gradient-overlay" />
              <div className={styles["logo"]}>
                <img src={getLink(item.logo)} height="30px" alt="" />
              </div>
              <CustomArrow className={`${styles["arrow-icon"]} reverse`} />
            </div>
          </Link>
        </Col>
      );
    });
  };

  return (
    <>
      <div className={styles["showcase-container"]} ref={myRef}>
        <div className={styles["header-container"]}>
          <div className={styles["header"]}>Our Businesses</div>
          <div className={styles["subheader"]}>
            on-air &#8226; on-ground &#8226; online
          </div>
        </div>
        <div className={styles["showcase-cards-container"]}>
          <Row className="px-4">{showBusinesses()}</Row>
        </div>
        {next && (
          <div className={styles["arrow-placement"]}>
            <div className="arrow-wrapper bg-black" onClick={scrollNext} />
          </div>
        )}
      </div>
    </>
  );
});

export default Showcase;
