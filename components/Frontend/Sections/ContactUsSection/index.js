//TO DOS: show messages, add recaptcha
import styles from "./ContactUsSection.module.scss";

import { useState, useEffect } from "react";

import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { IoCall, IoLocationSharp } from "react-icons/io5";

import { getRecipientList } from "actions/inquiryRecipient";

import { createInquiry } from "actions/inquiry";

import { Spinner } from "reactstrap";

const ContactUsSection = () => {
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
    createInquiry("", formValues)
      .then((data) => {
        setLoading(false);
        setMessages({
          success: "Your inquiry has be sent",
        });
        setFormValues({});
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
  };
  return (
    <>
      <div className={styles["contactus-section-container"]}>
        <Row noGutters>
          <Col lg={6} sm={12}>
            <div className={styles["form-container"]}>
              <h2 className="mb-4">Need to reach us?</h2>
              <Row>
                <Col lg={12} sm={12}>
                  <FormGroup>
                    <Input
                      type="select"
                      className={styles["form-control"]}
                      onChange={handleFormChange("sendTo")}
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
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-center">
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
