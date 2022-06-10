import styles from "./InternshipApplicationSection.module.scss";

const InternshipApplicationSection = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.requirements}>RequireMents</div>
        <div className={styles.form}>Form</div>
      </div>
    </>
  );
};

export default InternshipApplicationSection;
