import styles from "./CustomArrow.module.scss";

const CustomArrow = ({ className, width }) => {
  return (
    <div
      className={`${styles["arrow-down"]} ${className}`}
      style={{ "--arrow-width": `${width ? width : "60px"}` }}
    />
  );
};

export default CustomArrow;
