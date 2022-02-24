import "./styles.scss";

import { forwardRef, useState } from "react";
import CustomArrow from "components/Frontend/CustomArrow";
const HeroBeforeAfter = forwardRef(({ next }, myRef) => {
  const afterLocation =
    "https://images.unsplash.com/photo-1501890664351-4ef399c1524f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3132&q=80";
  const beforeLocation =
    "https://images.unsplash.com/photo-1496116013258-67a0855f9f82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80";

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
            style={{ backgroundImage: `url(${afterLocation})` }}
          >
            <div className="content">
              <div className="header">NOW</div>
              <div className="excerpt">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </div>
            </div>
          </div>
        </div>
        <div className="hero-ba-item foreground" style={{ width: `${width}%` }}>
          <div
            className="img-container"
            style={{
              backgroundImage: `url(${beforeLocation})`,
            }}
          >
            <div className="content">
              <div className="header">THEN</div>
              <div className="excerpt">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
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
