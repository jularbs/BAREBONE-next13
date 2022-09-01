import "./styles.scss";

import { getLink } from "actions/media";

const GenericCard = ({ data }) => {
  return (
    <>
      <div className="generic-card-container">
        <div
          className="img-wrapper"
          style={{ backgroundImage: `url(${getLink(data.displayImage)})` }}
        />
        <div className="title">{data.title}</div>
        <div className="excerpt">{data.content}</div>
      </div>
    </>
  );
};

export default GenericCard;
