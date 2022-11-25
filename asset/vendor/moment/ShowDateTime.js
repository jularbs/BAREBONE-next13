import moment from "moment";

const ShowDateTime = ({ data, className }) => {
  const time = (t) => {
    if (!t) {
      return <div className={`${className}`}>Date not available</div>;
    }

    return (
      <div className={`${className}`}>
        {moment(t).format("DD MMMM YYYY hh:mm A")}
      </div>
    );
  };

  return time(data);
};

export default ShowDateTime;
