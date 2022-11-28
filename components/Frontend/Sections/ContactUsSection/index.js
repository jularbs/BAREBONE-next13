//TO DOS: show messages, add recaptcha
import styles from "./ContactUsSection.module.scss";

import { useState, useEffect, useRef } from "react";

import { Row, Col, FormGroup, Input, Button } from "reactstrap";
import { IoCall, IoLocationSharp } from "react-icons/io5";

import { getRecipientList } from "actions/inquiryRecipient";

import { createInquiry } from "actions/inquiry";

import { Spinner, UncontrolledAlert } from "reactstrap";
import ReCaptchaV2 from "react-google-recaptcha";

const ContactUsSection = () => {
  const recaptchaRef = useRef(null);
  const [recipients, setRecipients] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState({
    success: "",
    error: "",
  });

  useEffect(() => {
    getRecipientList().then((data) => {
      setRecipients(data.data);
    });
  }, []);

  const showRecipientList = () => {
    return recipients.map((item, key) => (
      <option key={key} value={item._id}>
        {item.name}
      </option>
    ));
  };

  const handleFormChange = (name) => (e) => {
    setFormValues({ ...formValues, [name]: e.target.value });
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

    createInquiry("", formValues)
      .then((data) => {
        setLoading(false);
        setMessages({
          success: "Your inquiry has be sent",
        });
        setFormValues({
          sendTo: "",
          companyName: "",
          emailAddress: "",
          companyURL: "",
          fullName: "",
          mobileNumber: "",
          landlineNumber: "",
          industry: "",
          isAdvertiser: "",
          role: "",
          message: "",
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
              "There was a problem sending your inquiry. Please try again later or you may contact ...",
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
        <span className="alert-icon">
          <i className="ni ni-like-2" />
        </span>
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
      <div className={styles["contactus-section-container"]}>
        <Row noGutters>
          <Col lg={6} sm={12}>
            <div className={styles["form-container"]}>
              <h2 className="mb-4">Need to reach us?</h2>
              {showSuccessMessage()}
              {showErrorMessage()}
              <Row>
                <Col lg={12} sm={12}>
                  <FormGroup>
                    <Input
                      type="select"
                      className={styles["form-control"]}
                      onChange={handleFormChange("sendTo")}
                      value={formValues.sendTo}
                    >
                      <option value="">
                        Choose the department you would like to contact
                      </option>
                      {showRecipientList()}
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg={4} sm={12}>
                  <FormGroup>
                    <label htmlFor="companyName">* Company Name</label>
                    <Input
                      type="text"
                      className={styles["form-control"]}
                      onChange={handleFormChange("companyName")}
                      value={formValues.companyName}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg={4} sm={6} xs={6}>
                  <FormGroup>
                    <label htmlFor="companyName">* Email Address</label>
                    <Input
                      type="text"
                      className={styles["form-control"]}
                      onChange={handleFormChange("emailAddress")}
                      value={formValues.emailAddress}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg={4} sm={6} xs={6}>
                  <FormGroup>
                    <label htmlFor="companyName">* Website/ Company URL</label>
                    <Input
                      type="text"
                      className={styles["form-control"]}
                      onChange={handleFormChange("companyURL")}
                      value={formValues.companyURL}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg={4} sm={12}>
                  <FormGroup>
                    <label htmlFor="companyName">* Full Name</label>
                    <Input
                      type="text"
                      className={styles["form-control"]}
                      onChange={handleFormChange("fullName")}
                      value={formValues.fullName}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg={4} sm={6} xs={6}>
                  <FormGroup>
                    <label htmlFor="companyName">* Mobile Number</label>
                    <Input
                      type="text"
                      className={styles["form-control"]}
                      onChange={handleFormChange("mobileNumber")}
                      value={formValues.mobileNumber}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg={4} sm={6} xs={6}>
                  <FormGroup>
                    <label htmlFor="companyName">Landline Number</label>
                    <Input
                      type="text"
                      className={styles["form-control"]}
                      onChange={handleFormChange("landlineNumber")}
                      value={formValues.landlineNumber}
                    ></Input>
                  </FormGroup>
                </Col>

                <Col lg={4} sm={6} xs={6}>
                  <FormGroup>
                    <label htmlFor="companyName">* Industry</label>
                    <Input
                      type="text"
                      className={styles["form-control"]}
                      onChange={handleFormChange("industry")}
                      value={formValues.industry}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg={4} sm={6} xs={6}>
                  <FormGroup>
                    <label htmlFor="companyName">* Advertiser or Agency?</label>
                    <Input
                      type="text"
                      className={styles["form-control"]}
                      onChange={handleFormChange("isAdvertiser")}
                      value={formValues.isAdvertiser}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg={4} sm={12}>
                  <FormGroup>
                    <label htmlFor="companyName">
                      *What Best Describes Your Role
                    </label>
                    <Input
                      type="text"
                      className={styles["form-control"]}
                      onChange={handleFormChange("role")}
                      value={formValues.role}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg={12} sm={12} xs={12}>
                  <FormGroup>
                    <label htmlFor="companyName">Message *</label>
                    <Input
                      type="textarea"
                      rows={6}
                      className={styles["form-control"]}
                      onChange={handleFormChange("message")}
                      value={formValues.message}
                    ></Input>
                  </FormGroup>
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
                <Button
                  color="primary"
                  className={styles["custom-submit"]}
                  onClick={handleSubmit}
                >
                  {loading && (
                    <Spinner size="sm" color="white" className="mr-2" />
                  )}
                  Submit
                </Button>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={12}>
            <div className={styles["map-container"]}>
              <div className={styles["details"]}>
                <h3 className={styles["label"]}>You may also reach us at: </h3>
                <div className={styles["contact-details"]}>
                  <IoLocationSharp className={styles["icon"]} />
                  <div className={styles["content"]}>
                    MBC Media Group, MBC Building, Vicente Sotto Street, Pasay
                    City, 1308 Metro Manila
                  </div>
                </div>
                <div className={styles["contact-details"]}>
                  <IoCall className={styles["icon"]} />
                  <div className={styles["content"]}>
                    (02) 555-3413 | (02) 555-3530
                  </div>
                </div>
              </div>
              <div className={"map-script"}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11247.160729161205!2d120.97600021282183!3d14.558249809499188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cbd85bf67635%3A0x27e5bb9eddf2d86f!2sMBC%20Marketing%20Services%20Inc!5e0!3m2!1sen!2sph!4v1637062094768!5m2!1sen!2sph"
                  width="100%"
                  height="600px"
                  allowFullScreen=""
                  loading="lazy"
                  className="map"
                ></iframe>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ContactUsSection;
