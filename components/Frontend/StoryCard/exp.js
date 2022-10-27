import styles from "./StoryCard.module.scss";

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { forwardRef } from "react";
import { Row, Col } from "reactstrap";

import { getLink } from "actions/media";

const StoryCard = forwardRef(({ next, data, timeline }, myRef) => {
  const { before, nextLabel, futures, current } = timeline;

  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const showTimeline = (timeArray) => {
    const labelIndex = timeArray.indexOf(data.label);
    return timeArray.map((item, index) => {
      console.log(
        `Label: ${item}, Index: ${index}, IndexOf: ${timeArray.indexOf(
          data.label
        )}`
      );
      return (
        <>
          <div
            className={`${styles["timeline-item"]} ${index == labelIndex ? styles.active : ""} ${
              index == labelIndex + 1 ? "arrow-wrapper" : ""
            }`}
            onClick={() => {
              if (index == labelIndex + 1) scrollNext();
            }}
          >
            <div className={styles["label"]}>{item}</div>
          </div>
          <div className={styles["timeline-line"]} key={index}></div>
        </>
      );
    });
  };

  return (
    <>
      <div
        className={styles["storycard-container"]}
        style={{ backgroundImage: `url('${getLink(data.background)}')` }}
        ref={myRef}
      >
        <div className="black-gradient-overlay" />

        <div className={styles["content"]}>
          <Row>
            <Col lg={6} sm={12} xs={12}>
              <div className={styles["img-container"]}>
                {data.image && (
                  <img className={styles["img-wrapper"]} src={getLink(data.image)} />
                )}
              </div>
            </Col>
            <Col lg={6} sm={12} xs={12}>
              <div className={styles["details-card"]}>
                <div className={styles["label"]}>{data.label}</div>
                <div className={styles["title"]}>{data.title}</div>
                <div className={styles["excerpt"]}>{data.excerpt}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles["timeline-container"]}>
                <div className={styles["timeline-wrapper"]}>
                  <IoChevronBackOutline className={styles["icon"]} />
                  <div className={styles["timeline-line"]}></div>

                  {showTimeline(timeline)}

                  <IoChevronForwardOutline className={styles["icon"]} />

                  {before && (
                    <>
                      <IoChevronBackOutline className={styles["icon"]} />
                      <div className={styles["timeline-line"]}></div>
                      {showTimeline(before)}
                    </>
                  )}

                  {/* next */}
                  {current && (
                    <>
                      <div className={`${styles["timeline-item"]} ${styles.active}`}>
                        <div className={styles["label"]}>{current}</div>
                      </div>
                      <div className={styles["timeline-line"]}></div>
                    </>
                  )}

                  {nextLabel && (
                    <>
                      <div
                        className={`${styles["timeline-item"]} arrow-wrapper`}
                        onClick={scrollNext}
                      >
                        <div className={styles["label"]}>{nextLabel}</div>
                      </div>
                      <div className={styles["timeline-line"]}></div>
                    </>
                  )}

                  {/* futures */}
                  {futures && (
                    <>
                      {showTimeline(futures)}
                      <IoChevronForwardOutline className={styles["icon"]} />
                    </>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
});

export default StoryCard;
