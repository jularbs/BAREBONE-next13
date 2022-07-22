import "./styles.scss";
import { forwardRef } from "react";
import Link from "next/link";
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
        className={`our-team-container ${reverse ? "reverse" : ""}`}
        ref={myRef}
      >
        <Col
          lg={6}
          sm={12}
          className="px-0 d-flex justify-content-center align-items-center"
        >
          <div
            className="content-container"
            style={{ backgroundImage: `url("${data.logoLocation}")` }}
          >
            <div className="bg-overlay"></div>
            <div className="content-wrapper">
              {data && data.title && <div className="title">{data.title}</div>}
              {data && data.content && (
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              )}
            </div>
          </div>
        </Col>
        <Col lg={6} sm={12} className="px-0">
          {data && data.imgLocation && (
            <div
              className="img-container"
              style={{ backgroundImage: `url("${data.imgLocation}")` }}
            ></div>
          )}
        </Col>
        {next && (
          <div className="arrow-placement">
            <div className="arrow-wrapper bg-black" onClick={scrollNext} />
          </div>
        )}
      </div>
    </>
  );
});

export default OurTeamCard;
