import styles from "./HeroWhyMBC.module.scss";

import { forwardRef } from "react";
import Link from "next/link";
import { getLink } from "actions/media";

const HeroWhyMBC = forwardRef(({ data, black, blue, next }, myRef) => {
  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div
        className={styles["hero-why-mbc-container"]}
        style={{ backgroundImage: `url(${getLink(data.background)})` }}
        ref={myRef}
      >
        {black && <div className="bg-overlay-black" />}
        {blue && <div className="bg-overlay-blue" />}
        <div className={styles["title"]}>{data.title}</div>
        <div className={styles["content"]}>{data.content}</div>
        <div className={styles["cta-container"]}>
          <Link href={data.ctaLink}>
            <div className={styles["cta-button"]}>{data.ctaText}</div>
          </Link>
          <Link href={data.secondaryCtaLink}>
            <div className={styles["cta-button"]}>{data.secondaryCtaText}</div>
          </Link>
        </div>
        <div className={styles["arrow-placement"]}>
          <div className="arrow-wrapper" onClick={scrollNext} />
        </div>
      </div>
    </>
  );
});

export default HeroWhyMBC;
