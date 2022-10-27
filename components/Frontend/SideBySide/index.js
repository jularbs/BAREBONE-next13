import styles from "./SideBySide.module.scss";
import { forwardRef } from "react";
import Link from "next/link";
import { Col, Row } from "reactstrap";
import CustomArrow from "components/Frontend/CustomArrow";

const SideBySide = forwardRef(({ next, data, reverse }, myRef) => {
  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div
        className={`${styles["side-by-side-container"]} ${
          reverse ? styles.reverse : ""
        }`}
        ref={myRef}
      >
        <Col
          lg={6}
          sm={12}
          className="px-0 d-flex justify-content-center align-items-center"
        >
          <div className={styles["content-container"]}>
            {data && data.logoLocation && (
              <img src={data.logoLocation} className={styles["logo"]} />
            )}
            {data && data.title && (
              <div className={styles["title"]}>{data.title}</div>
            )}
            {data && data.content && (
              <div
                className={styles["content"]}
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            )}
            {data && data.ctaLabel && data.ctaLink && (
              <Link href={data.ctaLink}>
                <button className={`btn ${styles["btn-cta"]} py-3`}>
                  {data.ctaLabel}
                  <CustomArrow className="navy reverse ml-3" width="20px" />
                </button>
              </Link>
            )}
          </div>
        </Col>
        <Col lg={6} sm={12} className="px-0">
          {data && data.imgLocation && (
            <div
              className={styles["img-container"]}
              style={{ backgroundImage: `url("${data.imgLocation}")` }}
            ></div>
          )}
        </Col>
        {next && (
          <div className={styles["arrow-placement"]}>
            <div className="arrow-wrapper bg-black" onClick={scrollNext} />
          </div>
        )}
      </div>
    </>
  );
});

export default SideBySide;
