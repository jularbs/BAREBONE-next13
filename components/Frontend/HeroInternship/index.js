import "./styles.scss";

import { forwardRef } from "react";
import { IoHappy, IoPeople, IoRibbon, IoBook } from "react-icons/io5";

import { getLink } from "actions/media";

const HeroInternship = forwardRef(
  ({ hero, showcaseList, black, blue, next }, myRef) => {
    const scrollNext = () => {
      if (next && next.current) {
        next.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const showShowcaseTiles = () => {
      return showcaseList.map((item, key) => {
        return (
          <div className="showcase-item" key={key}>
            <img src={getLink(item.media)} alt="" className="showcase-icon" />
            <div className="title">{item.value}</div>
            <div className="description">{item.meta}</div>
          </div>
        );
      });
    };

    return (
      <>
        <div
          className="hero-internship-container"
          style={{ backgroundImage: `url(${getLink(hero.background)})` }}
          ref={myRef}
        >
          {black && <div className="bg-overlay-black" />}
          {blue && <div className="bg-overlay-blue" />}

          <div className="content-container">
            <div className="hero-column main-content">
              <div className="title">{hero.title}</div>
              <div className="content">{hero.content}</div>
              <div className="cta-button">
                <span>{hero.ctaText}</span>{" "}
                <img src="/common/arrow-white.svg" />
              </div>
            </div>
            <div className="hero-column">
              <div className="showcase">{showShowcaseTiles()}</div>
            </div>
          </div>

          <div className="arrow-placement">
            <div className="arrow-wrapper" onClick={scrollNext} />
          </div>
        </div>
      </>
    );
  }
);

export default HeroInternship;
