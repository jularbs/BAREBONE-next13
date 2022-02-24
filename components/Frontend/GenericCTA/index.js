import "./styles.scss";
import Link from "next/link";
import { forwardRef } from "react";

const GenericCTA = forwardRef(({}, myRef) => {
  const data = {
    bgLocation:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
    title: "Ready to Stand Out?",
    subtitle:
      "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    ctaLabel: "Collaborate with us",
    ctaLink: "/",
  };

  return (
    <>
      <div
        className="generic-cta-container"
        style={{ backgroundImage: `url(${data.bgLocation})` }}
        ref={myRef}
      >
        <div className="bg-overlay-black"></div>

        <div className="content">
          <div className="title">{data.title}</div>
          <div className="subtitle">{data.subtitle}</div>
          <Link href={data.ctaLink}>
            <button className="btn btn-cta">{data.ctaLabel}</button>
          </Link>
        </div>
      </div>
    </>
  );
});

export default GenericCTA;
