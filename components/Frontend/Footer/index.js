import styles from "./Footer.module.scss";

import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
} from "react-icons/io5";
const Footer = () => {
  return (
    <>
      <div className={styles["footer-container"]}>
        <div className={styles["copyright"]}>Copyright 2021 MBC MEDIA GROUP</div>
        <div className={styles["link-wrapper"]}>
          <div className={styles["pages"]}>
            <div className={styles["page-item"]}>Privacy Policy</div>
            <div className={styles["page-item"]}>Terms and Condition</div>
            <div className={styles["page-item"]}></div>
          </div>
          <div className={styles["socmed"]}>
            <div className={styles["socmed-item"]}>
              <IoLogoFacebook />
            </div>
            <div className={styles["socmed-item"]}>
              <IoLogoTwitter />
            </div>
            <div className={styles["socmed-item"]}>
              <IoLogoInstagram />
            </div>
            <div className={styles["socmed-item"]}>
              <IoLogoYoutube />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
