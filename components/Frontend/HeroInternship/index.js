import styles from "./HeroInternship.module.scss";

import { forwardRef } from "react";
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
          <div className={styles["showcase-item"]} key={key}>
            <img
              src={getLink(item.media)}
              alt=""
              className={styles["showcase-icon"]}
            />
            <div className={styles["title"]}>{item.value}</div>
            <div className={styles["description"]}>{item.meta}</div>
          </div>
        );
      });
    };

    return (
      <>
        <div
          className={styles["hero-internship-container"]}
          style={{ backgroundImage: `url(${getLink(hero.background)})` }}
          ref={myRef}
        >
          {black && <div className="bg-overlay-black" />}
          {blue && <div className="bg-overlay-blue" />}

          <div className={styles["content-container"]}>
            <div
              className={`${styles["hero-column"]} ${styles["main-content"]}`}
            >
              <div className={styles["title"]}>{hero.title}</div>
              <div className={styles["content"]}>{hero.content}</div>
              <div className={styles["cta-button"]}>
                <span>{hero.ctaText}</span>{" "}
                <img src="/common/arrow-white.svg" />
              </div>
            </div>
            <div className={styles["hero-column"]}>
              <div className={styles["showcase"]}>{showShowcaseTiles()}</div>
            </div>
          </div>

          <div className={styles["arrow-placement"]}>
            <div className="arrow-wrapper" onClick={scrollNext} />
          </div>
        </div>
      </>
    );
  }
);

export default HeroInternship;
