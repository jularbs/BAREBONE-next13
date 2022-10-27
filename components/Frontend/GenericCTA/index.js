import styles from "./GenericCTA.module.scss";
import Link from "next/link";
import { forwardRef } from "react";
import { getLink } from "actions/media";
import CustomArrow from "components/Frontend/CustomArrow";
const GenericCTA = forwardRef(({ data }, myRef) => {
  return (
    <>
      <div
        className={styles["generic-cta-container"]}
        style={{ backgroundImage: `url(${getLink(data.background)})` }}
        ref={myRef}
      >
        <div className="bg-overlay-black"></div>

        <div className={styles["content"]}>
          <div className={styles["title"]}>{data.title}</div>
          <div className={styles["subtitle"]}>{data.content}</div>
          <Link href={data.ctaLink}>
            <button className={`btn ${styles["btn-cta"]}`}>
              {data.ctaText}
              <CustomArrow className={`${styles["arrow"]} reverse`} />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
});

export default GenericCTA;
