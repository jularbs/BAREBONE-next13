import "./styles.scss";

import Link from "next/link";
import { useState } from "react";

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState("");
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className="navigation-container">
        <Link href="/">
          <img
            src="/logos/main-color.png"
            height="50px"
            className="logo-wrapper"
            alt=""
          />
        </Link>
        {/* DESKTOP NAVIGATION */}
        <nav className="desktop-nav-wrapper">
          <Link href="/our-story">
            <div className="nav-item">OUR STORY</div>
          </Link>
          <div className="nav-item">
            OUR COMPANY
            <div className="dropdown-wrapper">
              <Link href="/our-company">
                <div className="dropdown-item">HISTORY</div>
              </Link>
              <Link href="/our-company/vision-and-culture">
                <div className="dropdown-item">VISION AND CULTURE</div>
              </Link>
              <Link href="/our-company/leadership">
                <div className="dropdown-item">LEADERSHIP</div>
              </Link>
              <Link href="/our-company/csr">
                <div className="dropdown-item">
                  CORPORATE SOCIAL RESPONSIBILITY
                </div>
              </Link>
              <Link href="investor-relations">
                <div className="dropdown-item">INVESTOR RELATIONS</div>
              </Link>
            </div>
          </div>
          <div className="nav-item">
            OUR BUSINESS
            <div className="dropdown-wrapper">
              <Link href="/our-businesses/radio">
                <div className="dropdown-item">RADIO</div>
              </Link>
              <Link href="/our-businesses/tv">
                <div className="dropdown-item">TV</div>
              </Link>
              <Link href="/our-businesses/digital">
                <div className="dropdown-item">DIGITAL</div>
              </Link>
              <Link href="/our-businesses/events">
                <div className="dropdown-item">EVENTS</div>
              </Link>
              <Link href="/our-businesses/promos">
                <div className="dropdown-item">PROMOS</div>
              </Link>
              <Link href="/our-businesses/talents">
                <div className="dropdown-item">TALENTS</div>
              </Link>
            </div>
          </div>
          <Link href="/collaborate-with-us">
            <div className="nav-item">COLLABORATE WITH US</div>
          </Link>
          <Link href="/contact-us">
            <div className="nav-item">CONTACT US</div>
          </Link>
        </nav>

        {/* MOBILE NAVIGATION */}
        <div
          className={`close-wrapper ${visible ? "open" : ""}`}
          onClick={() => {
            setVisible(!visible);
          }}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>

        <nav className={`nav-wrapper ${visible ? "visible" : ""}`}>
          <Link href="/our-story">
            <div className="nav-item">Our Story</div>
          </Link>
          <div
            className={`dropdown-nav ${
              activeDropdown == "our-company" ? "active" : ""
            }`}
            onClick={() => {
              setActiveDropdown(
                `${activeDropdown == "our-company" ? "" : "our-company"}`
              );
            }}
          >
            <div className="nav-item">Our Company</div>
            <div className="dropdown-nav-wrapper">
              <Link href="/our-company">
                <div className="dropdown-item">History</div>
              </Link>
              <Link href="/our-company/vision-and-culture">
                <div className="dropdown-item">Vision and Culture</div>
              </Link>
              <Link href="/our-company/leadership">
                <div className="dropdown-item">Leadership</div>
              </Link>
              <Link href="/our-company/csr">
                <div className="dropdown-item">
                  Corporate Social Responsibility
                </div>
              </Link>
              <Link href="/our-company/investor-relations">
                <div className="dropdown-item">Investor Relations</div>
              </Link>
            </div>
          </div>
          <div
            className={`dropdown-nav ${
              activeDropdown == "our-business" ? "active" : ""
            }`}
            onClick={() => {
              setActiveDropdown(
                `${activeDropdown == "our-business" ? "" : "our-business"}`
              );
            }}
          >
            <div className="nav-item">Our Business</div>
            <div className="dropdown-nav-wrapper">
              <Link href="/our-businesses/radio">
                <div className="dropdown-item">RADIO</div>
              </Link>
              <Link href="/our-businesses/tv">
                <div className="dropdown-item">TV</div>
              </Link>
              <Link href="/our-businesses/digital">
                <div className="dropdown-item">DIGITAL</div>
              </Link>
              <Link href="/our-businesses/events">
                <div className="dropdown-item">EVENTS</div>
              </Link>
              <Link href="/our-businesses/promos">
                <div className="dropdown-item">PROMOS</div>
              </Link>
              <Link href="/our-businesses/talents">
                <div className="dropdown-item">TALENTS</div>
              </Link>
            </div>
          </div>
          <Link href="/collaborate-with-us">
            <div className="nav-item">Collaborate With Us</div>
          </Link>
          <Link href="/contact-us">
            <div className="nav-item">Contact Us</div>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
