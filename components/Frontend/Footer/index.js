import "./styles.scss";

import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
} from "react-icons/io5";
const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="copyright">Copyright 2021 MBC MEDIA GROUP</div>
        <div className="link-wrapper">
          <div className="pages">
            <div className="page-item">Privacy Policy</div>
            <div className="page-item">Terms and Condition</div>
            <div className="page-item"></div>
          </div>
          <div className="socmed">
            <div className="socmed-item">
              <IoLogoFacebook />
            </div>
            <div className="socmed-item">
              <IoLogoTwitter />
            </div>
            <div className="socmed-item">
              <IoLogoInstagram />
            </div>
            <div className="socmed-item">
              <IoLogoYoutube />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
