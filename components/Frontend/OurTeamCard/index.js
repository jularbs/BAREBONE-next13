import styles from "./OurTeamCard.module.scss";
import { forwardRef } from "react";
import { Col, Row } from "reactstrap";

const OurTeamCard = forwardRef(({ next, data, reverse }, myRef) => {
  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div
        className={`${styles["our-team-container"]} ${
          reverse ? styles.reverse : ""
        }`}
        ref={myRef}
      >
        <Col
          lg={6}
          sm={12}
          className="px-0 d-flex justify-content-center align-items-center"
        >
          <div
            className={styles["content-container"]}
            style={{ backgroundImage: `url("${data.logoLocation}")` }}
          >
            <div className={styles["bg-overlay"]}></div>
            <div className={styles["content-wrapper"]}>
              {data && data.title && (
                <div className={styles["title"]}>{data.title}</div>
              )}
              {data && data.content && (
                <div
                  className={styles["content"]}
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              )}
            </div>
          </div>
        </Col>
        <Col lg={6} sm={12} className="px-0">
          {data && data.imgLocation && (
            <div
              className={styles["img-container"]}
              style={{ backgroundImage: `url("${data.imgLocation}")` }}
            ></div>
          )}
        </Col>
        {next && (
          <div className={styles["arrow-placement"]}>
            <div className="arrow-wrapper bg-black" onClick={scrollNext} />
          </div>
        )}
      </div>
    </>
  );
});

export default OurTeamCard;
