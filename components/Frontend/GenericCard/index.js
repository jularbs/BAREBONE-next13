import styles from "./GenericCard.module.scss";

import { getLink } from "actions/media";

const GenericCard = ({ data }) => {
  return (
    <>
      <div className={styles["generic-card-container"]}>
        <div
          className={styles["img-wrapper"]}
          style={{ backgroundImage: `url(${getLink(data.displayImage)})` }}
        />
        <div className={styles["title"]}>{data.title}</div>
        <div className={styles["excerpt"]}>{data.content}</div>
      </div>
    </>
  );
};

export default GenericCard;
