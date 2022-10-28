import { forwardRef, useState, useEffect, createRef } from "react";
import styles from "./HeroMetrics.module.scss";
import { readOption } from "actions/option";
import { HERO_METRIC_HEADER, HERO_METRIC_SUBTEXT } from "constants.js";

import VisibilitySensor from "react-visibility-sensor";
import dynamic from "next/dynamic";

const Odometer = dynamic(import("react-odometerjs"), {
  ssr: false,
  loading: () => 0,
});

const HeroMetrics = forwardRef(({ next, data }, myRef) => {
  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onMetricsVisibility = (isVisible) => {
    if (isVisible) {
      console.log("Is visible");
      setDisplayOdo(data);
      data.map((item, key) => {
        // console.log(refs[key]);
        // if (refs[key].current) {
        //   refs[key].current.update(item.figures);
        // }
      });
    }
  };

  const [headerText, setHeaderText] = useState("");
  const [headerSubtext, setHeaderSubtext] = useState("");
  const [displayOdo, setDisplayOdo] = useState(
    data.map((item) => {
      return { ...item, figures: 0 };
    })
  );
  useEffect(() => {
    readOption(HERO_METRIC_HEADER).then((data) => {
      if (data.data) setHeaderText(data.data.value);
    });

    readOption(HERO_METRIC_SUBTEXT).then((data) => {
      if (data.data) setHeaderSubtext(data.data.value);
    });
  }, []);

  const showMetrics = () => {
    return displayOdo.map((item, key) => {
      return (
        <div className={styles["metric-item"]} key={key}>
          <div className="d-flex justify-content-center">
            <Odometer value={item.figures} format="(.ddd),dd" />
            <div className={styles["figures"]} style={{ paddingTop: "3px" }}>
              {item.suffix}
            </div>
          </div>

          <div className={styles["label"]}>{item.label}</div>
        </div>
      );
    });
  };

  return (
    <>
      <div className={styles["hero-metrics-container"]} ref={myRef}>
        <img className={styles.mapOverlay} src="/bg/map.png" />
        <div className={styles["header-container"]}>
          <div className={styles["title"]}>{headerText}</div>
          <div className={styles["content"]}>{headerSubtext}</div>
        </div>
        <VisibilitySensor onChange={onMetricsVisibility}>
          <div className={styles["metrics-container"]}>{showMetrics()}</div>
        </VisibilitySensor>
        <div className={styles["arrow-placement"]}>
          <div className="arrow-wrapper" onClick={scrollNext} />
        </div>
      </div>
    </>
  );
});

export default HeroMetrics;
