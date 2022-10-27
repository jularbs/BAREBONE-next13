import styles from "./HeroBeforeAfter.module.scss";

import { forwardRef, useState } from "react";
import { getLink } from "actions/media";

import CustomArrow from "components/Frontend/CustomArrow";

const HeroBeforeAfter = forwardRef(({ next, then, now }, myRef) => {
  const [width, setWidth] = useState(95);

  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className={styles["hero-beforeafter-container"]} ref={myRef}>
        <div className={`${styles["hero-ba-item"]} ${styles["background"]}`}>
          <div
            className={styles["img-container"]}
            style={{ backgroundImage: `url("${getLink(now.media)}")` }}
          >
            <div className={styles["content"]}>
              <div className={styles["header"]}>NOW</div>
              <div className={styles["excerpt"]}>{now.value}</div>
            </div>
            <div className="black-gradient-overlay-to-left"></div>
          </div>
        </div>
        <div className={`${styles["hero-ba-item"]} ${styles["foreground"]}`} style={{ width: `${width}%` }}>
          <div
            className={styles["img-container"]}
            style={{
              backgroundImage: `url("${getLink(then.media)}")`,
            }}
          >
            <div className={styles["content"]}>
              <div className={styles["header"]}>THEN</div>
              <div className={styles["excerpt"]}>{then.value}</div>
            </div>
            <div className="black-gradient-overlay-to-left"></div>
          </div>

          <div className={styles["label"]}>
            <div>
              swipe <strong>now</strong>
            </div>
            <CustomArrow className="mt-1" width={"120px"} />
          </div>
        </div>
        <input
          type="range"
          min=".01"
          max="100"
          step=".01"
          value={width}
          onChange={(e) => {
            setWidth(e.target.value);
          }}
          className={styles["slider-ba"]}
        />
        <div className={styles["arrow-placement"]}>
          <div className="arrow-wrapper" onClick={scrollNext} />
        </div>
      </div>
    </>
  );
});

export default HeroBeforeAfter;
