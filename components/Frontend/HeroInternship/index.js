import "./styles.scss";

import { forwardRef } from "react";
import { IoHappy, IoPeople, IoRibbon, IoBook } from "react-icons/io5";
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
            <span>apply for internship</span>{" "}
            <img src="/common/arrow-white.svg" />
          </div>
        </div>
        <div className="hero-column">
          <div className="showcase">
            <div className="showcase-item">
              <div className="title">
                <IoRibbon className="icon" />
                Gain Experience
              </div>
              <div className="description">
                Having an internship with us allows you to experience firsthand
                how the media industry operates. It provides you the necessary
                knowledge and experience to prepare you in your chosen
                profession.
              </div>
            </div>
            <div className="showcase-item">
              <div className="title">
                <IoBook className="icon" />
                Learn from the Best in the Industry
              </div>
              <div className="description">
                Having an internship with us gives you the opportunity to learn
                from the best in the industry. Learn from established
                personalities in both AM and FM station.
              </div>
            </div>
            <div className="showcase-item">
              <div className="title">
                <IoPeople className="icon" />
                Opportunity to be Part of the Team
              </div>
              <div className="description">
                We give priority to our former interns whenever we have a job
                vacancy. A significant number of our employees are former
                interns.
              </div>
            </div>
            <div className="showcase-item">
              <div className="title">
                <IoHappy className="icon" />
                Have Fun While Working
              </div>
              <div className="description">
                We make sure that you are also enjoying while you are working
                and learning with us.
              </div>
            </div>
          </div>
        </div>

        <div className="arrow-placement">
          <div className="arrow-wrapper" onClick={scrollNext} />
        </div>
      </div>
    </>
  );
});

export default HeroInternship;
