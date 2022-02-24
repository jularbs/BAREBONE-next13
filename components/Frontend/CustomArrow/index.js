import "./styles.scss";

const CustomArrow = ({ className, width }) => {
  return (
    <div
      className={`arrow-down ${className}`}
      style={{ "--arrow-width": `${width ? width : "60px"}` }}
    />
  );
};

export default CustomArrow;
