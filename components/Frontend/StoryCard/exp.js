import "./exp.scss";

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
            className={`timeline-item ${index == labelIndex ? "active" : ""} ${
              index == labelIndex + 1 ? "arrow-wrapper" : ""
            }`}
            onClick={() => {
              if (index == labelIndex + 1) scrollNext();
            }}
          >
            <div className="label">{item}</div>
          </div>
          <div className="timeline-line" key={index}></div>
        </>
      );
    });
  };

  return (
    <>
      <div
        className="storycard-container"
        style={{ backgroundImage: `url('${getLink(data.background)}')` }}
        ref={myRef}
      >
        <div className="black-gradient-overlay" />

        <div className="content">
          <Row>
            <Col lg={6} sm={12} xs={12}>
              <div className="img-container">
                {data.image && (
                  <img className="img-wrapper" src={getLink(data.image)} />
                )}
              </div>
            </Col>
            <Col lg={6} sm={12} xs={12}>
              <div className="details-card">
                <div className="label">{data.label}</div>
                <div className="title">{data.title}</div>
                <div className="excerpt">{data.excerpt}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="timeline-container">
                <div className="timeline-wrapper">
                  <IoChevronBackOutline className="icon" />
                  <div className="timeline-line"></div>

                  {showTimeline(timeline)}

                  <IoChevronForwardOutline className="icon" />

                  {before && (
                    <>
                      <IoChevronBackOutline className="icon" />
                      <div className="timeline-line"></div>
                      {showTimeline(before)}
                    </>
                  )}

                  {/* next */}
                  {current && (
                    <>
                      <div className="timeline-item active">
                        <div className="label">{current}</div>
                      </div>
                      <div className="timeline-line"></div>
                    </>
                  )}

                  {nextLabel && (
                    <>
                      <div
                        className="timeline-item arrow-wrapper"
                        onClick={scrollNext}
                      >
                        <div className="label">{nextLabel}</div>
                      </div>
                      <div className="timeline-line"></div>
                    </>
                  )}

                  {/* futures */}
                  {futures && (
                    <>
                      {showTimeline(futures)}
                      <IoChevronForwardOutline className="icon" />
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
