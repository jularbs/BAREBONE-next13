import styles from "./FrontendHeader.module.scss";

const FrontendHeader = () => {
  return (
    <>
      <div className={styles["frontend-header-container"]}>
        <img src="/logos/main-color.png" className={styles["logo"]} height="50px" />

        {/* Desktop Navigation */}
        <nav className={styles["desktop-nav"]}>
          <ul>
            <li>Our Story</li>
            <li>Our Company</li>
            <li>Our Business</li>
            <li>Collaborate With Us</li>
            <li>Contact Us</li>
          </ul>
        </nav>
        {/* Mobile Navigation */}
      </div>
    </>
  );
};

export default FrontendHeader;
