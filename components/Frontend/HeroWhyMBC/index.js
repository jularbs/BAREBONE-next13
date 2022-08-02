import "./styles.scss";

import { forwardRef } from "react";
import Link from "next/link";

const HeroWhyMBC = forwardRef(({ data, black, blue, next }, myRef) => {
  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div
        className="hero-why-mbc-container"
        style={{ backgroundImage: `url(${data.bgLocation})` }}
        ref={myRef}
      >
        {black && <div className="bg-overlay-black" />}
        {blue && <div className="bg-overlay-blue" />}
        <div className="pre-title">Together We Build Dreams</div>
        <div className="title">{data.title}</div>
        <div className="content">{data.content}</div>
        <div className="cta-container">
          <Link href="/work-with-us/careers">
            <div className="cta-button">Search Job Postings</div>
          </Link>
          <Link href="/work-with-us/internship">
            <div className="cta-button">Apply for Internship</div>
          </Link>
        </div>
        <div className="arrow-placement">
          <div className="arrow-wrapper" onClick={scrollNext} />
        </div>
      </div>
    </>
  );
});

export default HeroWhyMBC;
