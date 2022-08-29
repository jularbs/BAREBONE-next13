import { forwardRef, useState, useEffect } from "react";
import "./styles.scss";
import { readOption } from "actions/option";
import { HERO_METRIC_HEADER, HERO_METRIC_SUBTEXT } from "constants.js";

import VisibilitySensor from "react-visibility-sensor";

const HeroMetrics = forwardRef(({ next, data }, myRef) => {
  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onMetricsVisibility = (isVisible) => {
    if (isVisible) {
      data.forEach((item) => {
        document.getElementById(`${item.slug}-odo`).innerHTML = item.figures;
      });
    }
  };

  const [headerText, setHeaderText] = useState("");
  const [headerSubtext, setHeaderSubtext] = useState("");

  useEffect(() => {
    readOption(HERO_METRIC_HEADER).then((data) => {
      if (data.data) setHeaderText(data.data.value);
    });

    readOption(HERO_METRIC_SUBTEXT).then((data) => {
      if (data.data) setHeaderSubtext(data.data.value);
    });
  }, []);

  const showMetrics = () => {
    return data.map((item, key) => {
      return (
        <div className="metric-item" key={key}>
          <div className="d-flex justify-content-center">
            <span className="odometer figures" id={`${item.slug}-odo`}>
              {/* {item.figures} */}0
            </span>
            <div className="figures" style={{ paddingTop: "3px" }}>
              {item.suffix}
            </div>
          </div>

          <div className="label">{item.label}</div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="hero-metrics-container" ref={myRef}>
        <div className="header-container">
          <div className="title">{headerText}</div>
          <div className="content">{headerSubtext}</div>
        </div>
        <VisibilitySensor onChange={onMetricsVisibility}>
          <div className="metrics-container">{showMetrics()}</div>
        </VisibilitySensor>
        <div className="arrow-placement">
          <div className="arrow-wrapper" onClick={scrollNext} />
        </div>
      </div>
    </>
  );
});

export default HeroMetrics;
