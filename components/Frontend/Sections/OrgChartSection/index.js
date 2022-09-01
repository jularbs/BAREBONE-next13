import "./styles.scss";
import { forwardRef, useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import PortraitCard from "components/Frontend/PortraitCard";

import { getPortraitListByLocation } from "actions/portrait";

import {
  OUR_LEADERSHIP_BOARD_OF_DIRECTORS,
  OUR_LEADERSHIP_KEY_OFFICERS,
} from "constants.js";
const OrgChartSection = forwardRef(({}, myRef) => {
  const [boardList, setBoardList] = useState([]);
  const [officersList, setOfficersList] = useState([]);

  useEffect(() => {
    getPortraitListByLocation(OUR_LEADERSHIP_BOARD_OF_DIRECTORS).then(
      (data) => {
        console.log(data.data);
        setBoardList(data.data);
      }
    );

    getPortraitListByLocation(OUR_LEADERSHIP_KEY_OFFICERS).then((data) => {
      setOfficersList(data.data);
    });
  }, []);

  const showMembers = (list, lg, def) => {
    return list.map((item, key) => {
      return (
        <Col lg={lg} sm={def} xs={def} className="px-0" key={key}>
          <PortraitCard data={item} />
        </Col>
      );
    });
  };
  return (
    <>
      <div className="orgchart-section" ref={myRef}>
        <div
          className="org-chart"
          style={{ maxWidth: "1300px", margin: "0 auto", padding: "5rem 1rem" }}
        >
          <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
            board of directors
          </h2>
          <Row className="justify-content-center">
            {showMembers(boardList, 4, 6)}
          </Row>
        </div>
        <div
          className="org-chart"
          style={{ maxWidth: "1300px", margin: "0 auto", padding: "5rem 1rem" }}
        >
          <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
            Key officers
          </h2>
          <Row className="justify-content-center">
            {showMembers(officersList, 3, 4)}
          </Row>
        </div>
      </div>
    </>
  );
});

export default OrgChartSection;
