import "./styles.scss";
import { forwardRef } from "react";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const CarouselHero = forwardRef(({ next }, myRef) => {
  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const AutoplaySlider = withAutoplay(AwesomeSlider);

  const media = [
    {
      source: "/bg/poster-talents.png   ",
    },
    {
      source:
        "https://images.unsplash.com/photo-1644182182291-84252293c61b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3131&q=80",
    },
    {
      source:
        "https://images.unsplash.com/photo-1644209525011-55f6591af14f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3132&q=80",
    },
  ];

  return (
    <>
      <div className="carousel-hero-container" ref={myRef}>
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={6000}
        >
          {media.map((item, i) => (
            <div
              className="slider-item"
              key={i}
              style={{
                backgroundImage: `url(${item.source})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          ))}
        </AutoplaySlider>
        <div className="arrow-placement">
          <div className="arrow-wrapper bg-black" onClick={scrollNext} />
        </div>
      </div>
    </>
  );
});

export default CarouselHero;
