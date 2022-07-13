import "./InternshipApplicationSection.module.scss";

import { Row, Col } from "reactstrap";
const InternshipApplicationSection = () => {
  return (
    <>
      <div className="InternshipApplicationSectionContainer">
        <div className="requirements">
          <div className="header">requirements</div>
          <div className="content">
            <h2>For Communitations students</h2>
            <p>who will undergo OJT in any of the stations</p>

            <ol>
              <li>College Student</li>
              <p>Must be currently enrolled and is a college student</p>
              <li>Curriculum Vitae</li>
              <p>Provide us an updated copy of your Curriculum Vitae</p>
              <li>Endorsement Letter</li>
              <p>Provide us 2 endorsement letters:</p>
              <ol>
                <li>from the KBP</li>
                <li>
                  from the School, duly signed by the Dean of College/University
                  of Head of Faculty
                </li>
              </ol>
            </ol>
            <br />
            <h2>For Communitations students</h2>
            <p></p>

            <ol>
              <li>College Student</li>
              <p>Lorem Ipsum Blah Blah Blah</p>
              <li>Curriculum Vitae</li>
              <p>Lorem Ipsum Blah Blah Blah</p>
              <li>Endorsement Letter</li>
              <p>Lorem Ipsum Blah Blah Blah</p>
            </ol>
          </div>
        </div>

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
