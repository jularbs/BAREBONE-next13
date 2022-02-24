import "./styles.scss";

import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { IoCall, IoLocationSharp } from "react-icons/io5";
const ContactUsSection = () => {
  return (
    <>
      <div className="contactus-section-container">
        <Row noGutters>
          <Col lg={6} sm={12}>
            <div className="form-container">
              <h2 className="mb-4">Need to reach us?</h2>
              <Row>
                <Col lg={12} sm={12} >
                  <FormGroup>
                    <Input type="select">
                      <option>
                        Choose the department you would like to contact
                      </option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg={12} sm={12} >
                  <FormGroup>
                    <Input type="select">
                      <option>Please select from our business</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg={4} sm={12} >
                  <FormGroup>
                    <label htmlFor="companyName">* Company Name</label>
                    <Input type="text"></Input>
                  </FormGroup>
                </Col>
                <Col lg={4} sm={6} xs={6} >
                  <FormGroup>
                    <label htmlFor="companyName">* Email Address</label>
                    <Input type="text"></Input>
                  </FormGroup>
                </Col>
                <Col lg={4} sm={6} xs={6} >
                  <FormGroup>
                    <label htmlFor="companyName">* Website/ Company URL</label>
                    <Input type="text"></Input>
                  </FormGroup>
                </Col>
                <Col lg={4} sm={12}>
                  <FormGroup>
                    <label htmlFor="companyName">* Full Name</label>
                    <Input type="text"></Input>
                  </FormGroup>
                </Col>
                <Col lg={4} sm={6} xs={6} >
                  <FormGroup>
                    <label htmlFor="companyName">* Mobile Number</label>
                    <Input type="text"></Input>
                  </FormGroup>
                </Col>
                <Col lg={4} sm={6} xs={6} >
                  <FormGroup>
                    <label htmlFor="companyName">Landline Number</label>
                    <Input type="text"></Input>
                  </FormGroup>
                </Col>

                <Col lg={4} sm={6} xs={6} >
                  <FormGroup>
                    <label htmlFor="companyName">* Industry</label>
                    <Input type="text"></Input>
                  </FormGroup>
                </Col>
                <Col lg={4} sm={6} xs={6} >
                  <FormGroup>
                    <label htmlFor="companyName">* Advertiser or Agency?</label>
                    <Input type="text"></Input>
                  </FormGroup>
                </Col>
                <Col lg={4} sm={12} >
                  <FormGroup>
                    <label htmlFor="companyName">
                      *What Best Describes Your Role
                    </label>
                    <Input type="text"></Input>
                  </FormGroup>
                </Col>
                <Col lg={12} sm={12} xs={12} >
                  <FormGroup>
                    <label htmlFor="companyName">Message *</label>
                    <Input type="textarea" rows={6}></Input>
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-center">
                <Button color="primary" className="custom-submit">
                  Submit
                </Button>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={12}>
            <div className="map-container">
              <div className="details">
                <h3 className="label">You may also reach us at: </h3>
                <div className="contact-details">
                  <IoLocationSharp className="icon" />
                  <div className="content">
                    MBC Media Group, MBC Building, Vicente Sotto Street, Pasay
                    City, 1308 Metro Manila
                  </div>
                </div>
                <div className="contact-details">
                  <IoCall className="icon" />
                  <div className="content">(02) 555-3413 | (02) 555-3530</div>
                </div>
              </div>
              <div className="map-script">
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
