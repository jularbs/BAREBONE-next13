import "./InternshipApplicationSection.module.scss";

import { Row, Col } from "reactstrap";
const InternshipApplicationSection = ({ requirements }) => {
  return (
    <>
      <div className="InternshipApplicationSectionContainer">
        <div
          className="requirements"
          dangerouslySetInnerHTML={{ __html: requirements }}
        ></div>

        <div className="internshipForm">
          <div className="header">Apply for internship</div>
          <div className="formContainer">
            <Row>
              <Col>
                <label>* First Name</label>
                <input type="text" className="textInputWrapper"></input>
              </Col>
              <Col>
                <label>* Last Name</label>
                <input type="text" className="textInputWrapper"></input>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>* Email Address</label>
                <input type="text" className="textInputWrapper"></input>
              </Col>
              <Col>
                <label>* Mobile Number</label>
                <input type="text" className="textInputWrapper"></input>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>* School/University</label>
                <input type="text" className="textInputWrapper"></input>
              </Col>
              <Col>
                <label>* Degree</label>
                <input type="text" className="textInputWrapper"></input>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>* Curriculum Vitae</label>
                <input type="text" className="textInputWrapper"></input>
              </Col>
              <Col>
                <label>* Endorsement Letter from School</label>
                <input type="text" className="textInputWrapper"></input>
              </Col>
              <Col>
                <label>* Endorsement Letter from KBP</label>
                <input type="text" className="textInputWrapper"></input>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>* Cover Letter</label>
                <textarea rows="8" className="textInputWrapper"></textarea>
              </Col>
            </Row>
            <div className="submitBtn">Submit</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternshipApplicationSection;
