import "./styles.scss";
import Link from "next/link";
import { forwardRef } from "react";
import { getLink } from "actions/media";
import CustomArrow from "components/Frontend/CustomArrow";
const GenericCTA = forwardRef(({ data }, myRef) => {
  return (
    <>
      <div
        className="generic-cta-container"
        style={{ backgroundImage: `url(${getLink(data.background)})` }}
        ref={myRef}
      >
        <div className="bg-overlay-black"></div>

        <div className="content">
          <div className="title">{data.title}</div>
          <div className="subtitle">{data.content}</div>
          <Link href={data.ctaLink}>
            <button className="btn btn-cta">
              {data.ctaText} <CustomArrow className="arrow reverse" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
});

export default GenericCTA;
