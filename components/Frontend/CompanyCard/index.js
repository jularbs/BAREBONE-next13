import styles from "./CompanyCard.module.scss";
const CompanyCard = ({ logoLocation, title, content, ctaLabel, ctaLink }) => {
  return (
    <>
      <div className={styles["company-card-container"]}>
        <div>
          <div className={styles["logo-wrapper"]}>
            <img src={logoLocation} alt="" className={styles["logo-img"]} />
          </div>
          <div className={styles["title"]}>{title}</div>
          <div className={styles["content"]}>{content}</div>
        </div>

        <a href={ctaLink} target="_blank" className={styles["cta-button"]}>
          <span className={styles["label"]}>{ctaLabel}</span>
          <span className={styles["arrow"]}>
            <img src="/common/arrow-black.svg" />
          </span>
        </a>
      </div>
    </>
  );
};

export default CompanyCard;
