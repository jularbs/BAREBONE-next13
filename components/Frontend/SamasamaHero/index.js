import styles from "./SamasamaHero.module.scss";

import { forwardRef } from "react";
import Link from "next/link";
import CustomArrow from "../CustomArrow";
const SamasamaHero = forwardRef(({ data, next, withLogo }, myRef) => {
  const { imgLocation, content, ctaLink, ctaText } = data;

  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className={styles["sama-sama-container"]} ref={myRef}>
        {next && (
          <div className={styles["arrow-placement"]}>
            <div className="arrow-wrapper" onClick={scrollNext} />
          </div>
        )}
        <div className={styles["content"]}>
          {imgLocation && (
            <img
              src={imgLocation}
              width="100%"
              className={styles["logo-img"]}
              alt=""
            />
          )}

          {content && <div className={styles["excerpt"]}>{content}</div>}
          {ctaLink && ctaText && (
            <Link
              href={data.ctaLink}
              className={`btn ${styles["btn-cta"]} py-3`}
            >
              {data.ctaText}{" "}
              <img src="/common/arrow-black.svg" className="ml-3" />
            </Link>
          )}
        </div>
        <img
          src={
            withLogo
              ? "/bg/sama-sama-desktop-logo.svg"
              : "/bg/sama-sama-desktop.svg"
          }
          width="100%"
          className={styles["desktop-bg"]}
          alt=""
        />
        <img
          src={
            withLogo
              ? "/bg/sama-sama-mobile-logo.svg"
              : "/bg/sama-sama-mobile.svg"
          }
          width="100%"
          className={styles["mobile-bg"]}
          alt=""
        />
      </div>
    </>
  );
});

export default SamasamaHero;
