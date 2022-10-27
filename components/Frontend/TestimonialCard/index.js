import styles from "./TestimonialCard.module.scss";

import { forwardRef } from "react";
import { getLink } from "actions/media";
const TestimonialCard = forwardRef(({ data }, myRef) => {
  return (
    <>
      <div className={styles["testimonial-wrapper"]} ref={myRef}>
        <div className={styles["profile-wrapper"]}>
          <div className={styles["image-wrapper"]}>
            <img src={getLink(data.image)} alt="" />
          </div>
          <div className={styles["profile-details"]}>
            <div className={styles["name"]}>{data.name}</div>
            <div className={styles["position"]}>{data.position}</div>
          </div>
        </div>
        <div className={styles["blurb"]}>{data.blurb}</div>
      </div>
    </>
  );
});

export default TestimonialCard;
