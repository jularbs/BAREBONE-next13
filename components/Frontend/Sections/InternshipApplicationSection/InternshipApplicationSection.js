//TO DOS: Convert Success message to a modal success
import styles from "./InternshipApplicationSection.module.scss";

import { Row, Col, Input, UncontrolledAlert, Spinner } from "reactstrap";
import { useState, useEffect, useRef } from "react";

import ReCaptchaV2 from "react-google-recaptcha";
import { submitApplication } from "actions/internshipApplication";
const InternshipApplicationSection = ({ requirements }) => {
  const recaptchaRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [previewFile, setPreviewFile] = useState({});
  const [messages, setMessages] = useState({
    success: "",
    error: "",
  });

  const handleFormChange = (name) => (e) => {
    setFormValues({ ...formValues, [name]: e.target.value });
  };

  const handleFileChange = (name) => (e) => {
    if (e.target.files[0]) {
      setFormValues({
        ...formValues,
        [name]: e.target.files[0],
      });
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    if (formValues.token == null) {
      setLoading(false);
      setMessages({
        ...messages,
        error:
          "Please prove you are not a robot by clicking the checkbox below",
        success: "",
      });
      return;
    }

    const formData = new FormData();
    for (var key in formValues) {
      formData.set(key, formValues[key]);
    }

    submitApplication("", formData)
      .then((data) => {
        setLoading(false);
        setFormValues({
          firstName: "",
          lastName: "",
          emailAddress: "",
          mobileNumber: "",
          schoolUniversity: "",
          degree: "",
          coverLetter: "",
          curriculumVitae: "",
          schoolEndorsementLetter: "",
          kbpEndorsementLetter: "",
          token: "",
        });
        setMessages({
          ...messages,
          error: "",
          success:
            "Thank you! We have just received your application. We'll get back to you once we process it.",
        });
      })
      .catch((e) => {
        setLoading(false);
        if (e.response?.data?.message) {
          setMessages({
            error: e.response.data.message,
          });
        } else {
          setMessages({
            error:
              "There was a problem sending your application. Please try again later or you may contact ...",
          });
        }
      });
    if (recaptchaRef.current != null) {
      recaptchaRef.current.reset();
    }
  };

  const showSuccessMessage = () =>
    messages.success && (
      <UncontrolledAlert
        color="success"
        onClick={() => {
          setMessages({ success: "", error: "" });
        }}
      >
        <span className="alert-text ml-1"> {messages.success}</span>
      </UncontrolledAlert>
    );

  const showErrorMessage = () =>
    messages.error && (
      <UncontrolledAlert
        color="danger"
        onClick={() => {
          setMessages({ success: "", error: "" });
        }}
      >
        <span className="alert-text ml-1">{messages.error}</span>
      </UncontrolledAlert>
    );

  const handleToken = (token) => {
    setFormValues({ ...formValues, token });
  };

  const handleExpire = () => {
    setFormValues({ ...formValues, token: null });
  };

  return (
    <>
      <div className={styles["InternshipApplicationSectionContainer"]}>
        <div
          className={styles["requirements"]}
          dangerouslySetInnerHTML={{ __html: requirements }}
        ></div>

        <div className={styles["internshipForm"]}>
          <div className={styles["header"]}>Apply for internship</div>
          {showSuccessMessage()}
          {showErrorMessage()}
          <div className={styles["formContainer"]}>
            <Row>
              <Col>
                <label>* First Name</label>
                <input
                  type="text"
                  className={styles["textInputWrapper"]}
                  value={formValues.firstName}
                  onChange={handleFormChange("firstName")}
                ></input>
              </Col>
              <Col>
                <label>* Last Name</label>
                <input
                  type="text"
                  className={styles["textInputWrapper"]}
                  value={formValues.lastName}
                  onChange={handleFormChange("lastName")}
                ></input>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>* Email Address</label>
                <input
                  type="text"
                  className={styles["textInputWrapper"]}
                  value={formValues.emailAddress}
                  onChange={handleFormChange("emailAddress")}
                ></input>
              </Col>
              <Col>
                <label>* Mobile Number</label>
                <input
                  type="text"
                  className={styles["textInputWrapper"]}
                  value={formValues.mobileNumber}
                  onChange={handleFormChange("mobileNumber")}
                ></input>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>* School/University</label>
                <input
                  type="text"
                  className={styles["textInputWrapper"]}
                  value={formValues.schoolUniversity}
                  onChange={handleFormChange("schoolUniversity")}
                ></input>
              </Col>
              <Col>
                <label>* Degree</label>
                <input
                  type="text"
                  className={styles["textInputWrapper"]}
                  value={formValues.degree}
                  onChange={handleFormChange("degree")}
                ></input>
              </Col>
            </Row>
            <Row>
              <Col sm="12" xs="12" md="12" lg="12" xl="4">
                <label>* Curriculum Vitae</label>
                <label
                  className={`d-block btn btn-outline-primary ${styles["btnUpload"]}`}
                >
                  {formValues.curriculumVitae?.name
                    ? formValues.curriculumVitae?.name
                    : "Choose PDF File..."}

                  <Input
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={handleFileChange("curriculumVitae")}
                  />
                </label>
              </Col>
              <Col sm="6" xs="12" md="6" lg="6" xl="4">
                <label>* School Endorsement Letter</label>
                <label
                  className={`d-block btn btn-outline-primary ${styles["btnUpload"]}`}
                >
                  {formValues.schoolEndorsementLetter?.name
                    ? formValues.schoolEndorsementLetter?.name
                    : "Choose PDF File..."}
                  <Input
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={handleFileChange("schoolEndorsementLetter")}
                  />
                </label>
              </Col>
              <Col sm="6" xs="12" md="6" lg="6" xl="4">
                <label>* KBP Endorsement Letter</label>
                <label
                  className={`d-block btn btn-outline-primary ${styles["btnUpload"]}`}
                >
                  {formValues.kbpEndorsementLetter?.name
                    ? formValues.kbpEndorsementLetter?.name
                    : "Choose PDF File..."}
                  <Input
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={handleFileChange("kbpEndorsementLetter")}
                  />
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
                  value={formValues.coverLetter}
                  onChange={handleFormChange("coverLetter")}
                ></textarea>
              </Col>
            </Row>
            <div className="text-center">
              <ReCaptchaV2
                ref={recaptchaRef}
                style={{ display: "inline-block" }}
                onChange={handleToken}
                onExpire={handleExpire}
                sitekey={process.env.RECAPTCHA_SITEKEY}
              />
              <div
                className={`${styles["submitBtn"]} btn`}
                onClick={handleSubmit}
              >
                {loading && (
                  <Spinner size="sm" color="white" className="mr-2" />
                )}
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternshipApplicationSection;
