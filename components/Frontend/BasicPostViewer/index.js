import styles from "./BasicPostViewer.module.scss";

import { Row, Col } from "reactstrap";
import GenericCard from "components/Frontend/GenericCard";

import { useState, useEffect } from "react";

import { getBasicPostByLocation } from "actions/basicPost";

const BasicPostViewer = ({ data, location, header, xl, lg, md, sm }) => {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    if (location) {
      getBasicPostByLocation(location).then((data) => {
        setPostsList(data.data);
      });
    } else if (data) {
      setPostsList(data);
    }
  }, [data, location]);

  const showPosts = () => {
    return postsList.map((item, key) => {
      return (
        <Col xl={xl} lg={lg} md={md} sm={sm} key={key}>
          <GenericCard data={item} />
        </Col>
      );
    });
  };
  return (
    <>
      {postsList.length > 0 && (
        <div className={styles["basic-post-viewer-container"]}>
          {postsList.length > 0 && header && (
            <div className={styles["header"]}>{header}</div>
          )}
          <Row>{showPosts()}</Row>
        </div>
      )}
    </>
  );
};

export default BasicPostViewer;
