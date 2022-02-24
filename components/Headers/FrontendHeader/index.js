import "./styles.scss";

const FrontendHeader = () => {
  return (
    <>
      <div className="frontend-header-container">
        <img src="/logos/main-color.png" className="logo" height="50px" />

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
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
