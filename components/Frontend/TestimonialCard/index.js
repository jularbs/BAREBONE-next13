import "./styles.scss";

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { forwardRef } from "react";
import { Row, Col } from "reactstrap";
import { getLink } from "actions/media";
const TestimonialCard = forwardRef(({ data }, myRef) => {
  return (
    <>
      <div className="testimonial-wrapper" ref={myRef}>
        <div className="profile-wrapper">
          <div className="image-wrapper">
            <img src={getLink(data.image)} alt="" />
          </div>
          <div className="profile-details">
            <div className="name">{data.name}</div>
            <div className="position">{data.position}</div>
          </div>
        </div>
        <div className="blurb">{data.blurb}</div>
      </div>
    </>
  );
});

export default TestimonialCard;
