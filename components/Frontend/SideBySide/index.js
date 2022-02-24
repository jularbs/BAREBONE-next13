import "./styles.scss";
import { forwardRef } from "react";
import Link from "next/link";
import { Col, Row } from "reactstrap";

const SideBySide = forwardRef(({ next, data, reverse }, myRef) => {
  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <>
      <div
        className={`side-by-side-container ${reverse ? "reverse" : ""}`}
        ref={myRef}
      >
        <Col lg={6} sm={12} className="px-0 d-flex justify-content-center align-items-center">
          <div className="content-container">
            {data && data.logoLocation && (
              <img src={data.logoLocation} className="logo" />
            )}
            {data && data.title && <div className="title">{data.title}</div>}
            {data && data.content && (
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            )}
            {data && data.ctaLabel && data.ctaLink && (
              <Link href={data.ctaLink}>
                <button className="btn btn-cta py-3">{data.ctaLabel}</button>
              </Link>
            )}
          </div>
        </Col>
        <Col lg={6} sm={12} className="px-0">
          {data && data.imgLocation && (
            <div
              className="img-container"
              style={{ backgroundImage: `url(${data.imgLocation})` }}
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

export default SideBySide;
