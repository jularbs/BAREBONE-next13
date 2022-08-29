import "./styles.scss";

import { forwardRef } from "react";
import Link from "next/link";

const HeroBasic = forwardRef(({ data, black, blue, next }, myRef) => {
  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div
        className="hero-basic-container"
        style={{
          backgroundImage: `url('${data.bgLocation}')`,
        }}
        ref={myRef}
      >
        {black && <div className="bg-overlay-black" />}
        {blue && <div className="bg-overlay-blue" />}
        <div className="title">{data.title}</div>
        <div className="content">{data.content}</div>
        
        {data.ctaText && data.ctaLink && (
          <Link href={data.ctaLink}>
            <button className="cta-button btn btn-block">
              <span>{data.ctaText}</span> <img src="/common/arrow-white.svg" />
            </button>
          </Link>
        )}
        <div className="arrow-placement">
          <div className="arrow-wrapper" onClick={scrollNext} />
        </div>
      </div>
    </>
  );
});

export default HeroBasic;
