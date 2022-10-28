import styles from "./Navigation.module.scss";

import Link from "next/link";
import { useState } from "react";

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState("");
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className={styles["navigation-container"]}>
        <Link href="/">
          <img
            src="/logos/main-color.png"
            height="50px"
            className={styles["logo-wrapper"]}
            alt=""
          />
        </Link>
        {/* DESKTOP NAVIGATION */}
        <nav className={styles["desktop-nav-wrapper"]}>
          <Link href="/our-story" className={styles["nav-item"]}>
            <div>OUR STORY</div>
          </Link>
          <div className={styles["nav-item"]}>
            OUR COMPANY
            <div className={styles["dropdown-wrapper"]}>
              <Link href="/our-company">
                <div className={styles["dropdown-item"]}>HISTORY</div>
              </Link>
              <Link href="/our-company/vision-and-culture">
                <div className={styles["dropdown-item"]}>
                  VISION AND CULTURE
                </div>
              </Link>
              <Link href="/our-company/leadership">
                <div className={styles["dropdown-item"]}>LEADERSHIP</div>
              </Link>
              <Link href="/our-company/our-teams">
                <div className={styles["dropdown-item"]}>OUR TEAMS</div>
              </Link>
              <Link href="/our-company/csr">
                <div className={styles["dropdown-item"]}>
                  CORPORATE SOCIAL RESPONSIBILITY
                </div>
              </Link>
              <Link href="/investor-relations">
                <div className={styles["dropdown-item"]}>
                  INVESTOR RELATIONS
                </div>
              </Link>
            </div>
          </div>
          <div className={styles["nav-item"]}>
            OUR BUSINESS
            <div className={styles["dropdown-wrapper"]}>
              <Link href="/our-businesses/radio">
                <div className={styles["dropdown-item"]}>RADIO</div>
              </Link>
              <Link href="/our-businesses/tv">
                <div className={styles["dropdown-item"]}>TV</div>
              </Link>
              <Link href="/our-businesses/digital">
                <div className={styles["dropdown-item"]}>DIGITAL</div>
              </Link>
              <Link href="/our-businesses/events">
                <div className={styles["dropdown-item"]}>EVENTS</div>
              </Link>
              <Link href="/our-businesses/promos">
                <div className={styles["dropdown-item"]}>PROMOS</div>
              </Link>
              <Link href="/our-businesses/talents">
                <div className={styles["dropdown-item"]}>TALENTS</div>
              </Link>
            </div>
          </div>
          <Link href="/collaborate-with-us" className={styles["nav-item"]}>
            <div>COLLABORATE WITH US</div>
          </Link>
          <div className={styles["nav-item"]}>
            WORK WITH US
            <div className={styles["dropdown-wrapper"]}>
              <Link href="/work-with-us">
                <div className={styles["dropdown-item"]}>WHY MBC?</div>
              </Link>
              <Link href="/work-with-us/internship">
                <div className={styles["dropdown-item"]}>
                  INTERNSHIP PROGRAM
                </div>
              </Link>
              <Link href="/work-with-us/careers">
                <div className={styles["dropdown-item"]}>
                  CAREER OPPORTUNITIES
                </div>
              </Link>
            </div>
          </div>
          <Link href="/contact-us" className={styles["nav-item"]}>
            <div>CONTACT US</div>
          </Link>
        </nav>

        {/* MOBILE NAVIGATION */}
        <div
          className={`${styles["close-wrapper"]} ${visible ? styles.open : ""}`}
          onClick={() => {
            setVisible(!visible);
          }}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>

        <nav
          className={`${styles["nav-wrapper"]} ${
            visible ? styles.visible : ""
          }`}
        >
          <Link href="/our-story">
            <div className={styles["nav-item"]}>Our Story</div>
          </Link>
          <div
            className={`${styles["dropdown-nav"]} ${
              activeDropdown == "our-company" ? styles.active : ""
            }`}
            onClick={() => {
              setActiveDropdown(
                `${activeDropdown == "our-company" ? "" : "our-company"}`
              );
            }}
          >
            <div className={styles["nav-item"]}>Our Company</div>
            <div className={styles["dropdown-nav-wrapper"]}>
              <Link href="/our-company">
                <div className={styles["dropdown-item"]}>History</div>
              </Link>
              <Link href="/our-company/vision-and-culture">
                <div className={styles["dropdown-item"]}>
                  Vision and Culture
                </div>
              </Link>
              <Link href="/our-company/leadership">
                <div className={styles["dropdown-item"]}>Leadership</div>
              </Link>
              <Link href="/our-company/csr">
                <div className={styles["dropdown-item"]}>
                  Corporate Social Responsibility
                </div>
              </Link>
              <Link href="/investor-relations">
                <div className={styles["dropdown-item"]}>
                  Investor Relations
                </div>
              </Link>
            </div>
          </div>
          <div
            className={`${styles["dropdown-nav"]} ${
              activeDropdown == "our-business" ? styles.active : ""
            }`}
            onClick={() => {
              setActiveDropdown(
                `${activeDropdown == "our-business" ? "" : "our-business"}`
              );
            }}
          >
            <div className={styles["nav-item"]}>Our Business</div>
            <div className={styles["dropdown-nav-wrapper"]}>
              <Link href="/our-businesses/radio">
                <div className={styles["dropdown-item"]}>RADIO</div>
              </Link>
              <Link href="/our-businesses/tv">
                <div className={styles["dropdown-item"]}>TV</div>
              </Link>
              <Link href="/our-businesses/digital">
                <div className={styles["dropdown-item"]}>DIGITAL</div>
              </Link>
              <Link href="/our-businesses/events">
                <div className={styles["dropdown-item"]}>EVENTS</div>
              </Link>
              <Link href="/our-businesses/promos">
                <div className={styles["dropdown-item"]}>PROMOS</div>
              </Link>
              <Link href="/our-businesses/talents">
                <div className={styles["dropdown-item"]}>TALENTS</div>
              </Link>
            </div>
          </div>
          <Link href="/collaborate-with-us">
            <div className={styles["nav-item"]}>Collaborate With Us</div>
          </Link>
          <Link href="/work-with-us">
            <div className={styles["nav-item"]}>Work With Us</div>
          </Link>
          <Link href="/contact-us">
            <div className={styles["nav-item"]}>Contact Us</div>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
