import { forwardRef, useState } from "react";
import "./styles.scss";

import VisibilitySensor from "react-visibility-sensor";
import { forEach } from "lodash";

const HeroMetrics = forwardRef(({ next, data }, myRef) => {
  const [metrics, setMetrics] = useState([
    {
      figures: "0",
      suffix: "",
      label: "Number of Years",
      id: "number-of-years-odo",
    },
    {
      figures: "0",
      suffix: "K",
      label: "Awards",
      id: "awards-odo",
    },
    {
      figures: "0",
      suffix: "M",
      label: "Stations Reach",
      id: "stations-reach-odo",
    },
    {
      figures: "0",
      suffix: "M",
      label: "Facebook",
      id: "fb-odo",
    },
    {
      figures: "0",
      suffix: "M",
      label: "Twitter",
      id: "twitter-odo",
    },
    {
      figures: "0",
      suffix: "M",
      label: "Youtube",
      id: "yt-odo",
    },
  ]);

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
          <div className="title">Measuring Impact</div>
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
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
