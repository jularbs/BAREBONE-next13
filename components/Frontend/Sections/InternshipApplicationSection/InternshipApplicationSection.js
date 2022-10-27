import styles from "./InternshipApplicationSection.module.scss";

import { Row, Col, Input } from "reactstrap";
const InternshipApplicationSection = ({ requirements }) => {
  return (
    <>
      <div className={styles["InternshipApplicationSectionContainer"]}>
        <div
          className={styles["requirements"]}
          dangerouslySetInnerHTML={{ __html: requirements }}
        ></div>

        <div className={styles["internshipForm"]}>
          <div className={styles["header"]}>Apply for internship</div>
          <div className={styles["formContainer"]}>
            <Row>
              <Col>
                <label>* First Name</label>
                <input
                  type="text"
                  className={styles["textInputWrapper"]}
                ></input>
              </Col>
              <Col>
                <label>* Last Name</label>
                <input
                  type="text"
                  className={styles["textInputWrapper"]}
                ></input>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>* Email Address</label>
                <input
                  type="text"
                  className={styles["textInputWrapper"]}
                ></input>
              </Col>
              <Col>
                <label>* Mobile Number</label>
                <input
                  type="text"
                  className={styles["textInputWrapper"]}
                ></input>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>* School/University</label>
                <input
                  type="text"
                  className={styles["textInputWrapper"]}
                ></input>
              </Col>
              <Col>
                <label>* Degree</label>
                <input
                  type="text"
                  className={styles["textInputWrapper"]}
                ></input>
              </Col>
            </Row>
            <Row>
              <Col sm="12" xs="12" md="12" lg="12" xl="4" className="px-1">
                <label>* Curriculum Vitae</label>
                <label
                  className={`d-block btn btn-outline-primary ${styles["btnUpload"]}`}
                >
                  Choose File...
                  <Input type="file" hidden />
                </label>
              </Col>
              <Col sm="6" xs="12" md="6" lg="6" xl="4" className="px-1">
                <label>* School Endorsement Letter</label>
                <label
                  className={`d-block btn btn-outline-primary ${styles["btnUpload"]}`}
                >
                  Choose File...
                  <Input type="file" hidden />
                </label>
              </Col>
              <Col sm="6" xs="12" md="6" lg="6" xl="4" className="px-1">
                <label>* KBP Endorsement Letter</label>
                <label
                  className={`d-block btn btn-outline-primary ${styles["btnUpload"]}`}
                >
                  Choose File...
                  <Input type="file" hidden />
                </label>
                <label className={styles["subtext"]}>
                  For Communication Students Only
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>* Cover Letter</label>
                <textarea
                  rows="8"
                  className={styles["textInputWrapper"]}
                ></textarea>
              </Col>
            </Row>
            <div className={styles["btn submitBtn"]}>Submit</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternshipApplicationSection;
