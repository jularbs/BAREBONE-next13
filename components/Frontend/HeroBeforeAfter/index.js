import "./styles.scss";

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
      <div className="hero-beforeafter-container" ref={myRef}>
        <div className="hero-ba-item background">
          <div
            className="img-container"
            style={{ backgroundImage: `url("${getLink(now.media)}")` }}
          >
            <div className="content">
              <div className="header">NOW</div>
              <div className="excerpt">{now.value}</div>
            </div>
            <div className="black-gradient-overlay-to-left"></div>
          </div>
        </div>
        <div className="hero-ba-item foreground" style={{ width: `${width}%` }}>
          <div
            className="img-container"
            style={{
              backgroundImage: `url("${getLink(then.media)}")`,
            }}
          >
            <div className="content">
              <div className="header">THEN</div>
              <div className="excerpt">{then.value}</div>
            </div>
            <div className="black-gradient-overlay-to-left"></div>
          </div>

          <div className="label">
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
          className="slider-ba"
        />
        <div className="arrow-placement">
          <div className="arrow-wrapper" onClick={scrollNext} />
        </div>
      </div>
    </>
  );
});

export default HeroBeforeAfter;
