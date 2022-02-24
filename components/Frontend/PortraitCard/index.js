import "./styles.scss";

import { Modal, ModalBody } from "reactstrap";
import { useState } from "react";
import { Row, Col } from "reactstrap";

import {
  IoLogoTiktok,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoYoutube,
} from "react-icons/io5";

const PortraitCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const testData = {
    imgLocation:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1287&q=80",
    name: "Juan M. Dela Cruz",
    position: "Chairman",
    writeup:
      "So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book. It's difficult to find examples of lorem ipsum in use before Letraset made it popular as a dummy text in the 1960s, although McClintock says he remembers coming across the lorem ipsum passage in a book of old metal type samples. So far he hasn't relocated where he once saw the passage, but the popularity of Cicero in the 15th century supports the theory that the filler text has been used for centuries. And anyways, as Cecil Adams reasoned, “[Do you really] think graphic arts supply houses were hiring classics scholars in the 1960s?” Perhaps. But it seems reasonable to imagine that there was a version in use far before the age of Letraset.",
    socMed: {
      tiktok: "https://tiktok.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      youtube: "https://youtube.com",
    },
  };

  const modalDetails = () => {
    return (
      <Modal
        toggle={() => setModalOpen(!modalOpen)}
        isOpen={modalOpen}
        className="portait-modal"
      >
        <ModalBody>
          <div className="portrait-details-container">
            <button
              type="button"
              class="close-button-circle"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <span class="icon-x"></span>
            </button>
            <Row className="">
              <Col lg={4} className="">
                <div
                  style={{ backgroundImage: `url(${testData.imgLocation})` }}
                  className="img-details"
                  alt=""
                />
              </Col>
              <Col lg={8} className="px-0">
                <div className="content">
                  <div className="name">{testData.name}</div>
                  <div className="position">{testData.position}</div>
                  <div className="writeup">{testData.writeup}</div>
                  {testData.socMed && (
                    <div className="socmed-icons">
                      {testData.socMed.facebook && (
                        <a href={testData.socMed.facebook} target="_blank">
                          <IoLogoFacebook className="socmed-item" />
                        </a>
                      )}
                      {testData.socMed.tiktok && (
                        <a href={testData.socMed.tiktok} target="_blank">
                          <IoLogoTiktok className="socmed-item" />
                        </a>
                      )}
                      {testData.socMed.instagram && (
                        <a href={testData.socMed.instagram} target="_blank">
                          <IoLogoInstagram className="socmed-item" />
                        </a>
                      )}
                      {testData.socMed.twitter && (
                        <a href={testData.socMed.twitter} target="_blank">
                          <IoLogoTwitter className="socmed-item" />
                        </a>
                      )}
                      {testData.socMed.youtube && (
                        <a href={testData.socMed.youtube} target="_blank">
                          <IoLogoYoutube className="socmed-item" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    );
  };
  return (
    <>
      <div className="portrait-card-container">
        {modalDetails()}

        <div
          className="portrait-img"
          style={{ backgroundImage: `url(${testData.imgLocation}` }}
          onClick={() => {
            setModalOpen(true);
          }}
        />
        <div className="name">{testData.name}</div>
        <div className="position">{testData.position}</div>
      </div>
    </>
  );
};

export default PortraitCard;
