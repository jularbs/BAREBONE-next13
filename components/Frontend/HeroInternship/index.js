import "./styles.scss";

import { forwardRef } from "react";
import Link from "next/link";

const HeroInternship = forwardRef(({ data, black, blue, next }, myRef) => {
  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div
        className="hero-internship-container"
        style={{ backgroundImage: `url(${data.bgLocation})` }}
        ref={myRef}
      >
        {black && <div className="bg-overlay-black" />}
        {blue && <div className="bg-overlay-blue" />}

        <div className="hero-column main-content">
          <div className="pre-title">MBC</div>
          <div className="title">Internship Program</div>
          <div className="content">Not all internships are created equal.</div>
          <div className="cta-button">
            <span>apply for internship</span> <img src="/common/arrow-white.svg" />
          </div>
        </div>
        <div className="hero-column">
     
        </div>

        <div className="arrow-placement">
          <div className="arrow-wrapper" onClick={scrollNext} />
        </div>
      </div>
    </>
  );
});

export default HeroInternship;
