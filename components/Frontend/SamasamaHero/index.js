import "./styles.scss";

import { forwardRef } from "react";

const SamasamaHero = forwardRef(({ data, next, withLogo }, myRef) => {
  const { imgLocation, content } = data;

  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className="sama-sama-container" ref={myRef}>
        {next && (
          <div className="arrow-placement">
            <div className="arrow-wrapper" onClick={scrollNext} />
          </div>
        )}
        <div className="content">
          {imgLocation && (
            <img src={imgLocation} width="100%" className="logo-img" alt="" />
          )}

          {content && <div className="excerpt">{content}</div>}
        </div>
        <img
          src={
            withLogo
              ? "/bg/sama-sama-desktop-logo.svg"
              : "/bg/sama-sama-desktop.svg"
          }
          width="100%"
          className="desktop-bg"
          alt=""
        />
        <img
          src={
            withLogo
              ? "/bg/sama-sama-mobile-logo.svg"
              : "/bg/sama-sama-mobile.svg"
          }
          width="100%"
          className="mobile-bg"
          alt=""
        />
      </div>
    </>
  );
});

export default SamasamaHero;
