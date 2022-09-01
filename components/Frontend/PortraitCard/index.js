import "./styles.scss";

import { Modal, ModalBody } from "reactstrap";
import { useState } from "react";
import { Row, Col } from "reactstrap";
import { getLink } from "actions/media";
import {
  IoLogoTiktok,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoYoutube,
} from "react-icons/io5";

const PortraitCard = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [portraitData, setPortraitData] = useState({
    imgLocation: getLink(data.image),
    name: data.name,
    position: data.position,
    description: data.description,
    facebookURL: data.facebookURL,
    twitterURL: data.twitterURL,
    instagramURL: data.instagramURL,
    youtubeURL: data.youtubeURL,
    tiktokURL: data.tiktokURL,
    bigoLiveURL: data.bigoLiveURL,
  });

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
                  style={{
                    backgroundImage: `url(${portraitData.imgLocation})`,
                  }}
                  className="img-details"
                  alt=""
                />
              </Col>
              <Col lg={8} className="px-0">
                <div className="content">
                  <div className="name">{portraitData.name}</div>
                  <div className="position">{portraitData.position}</div>
                  <div className="writeup">{portraitData.description}</div>
                  <div className="socmed-icons">
                    {portraitData.facebookURL && (
                      <a href={portraitData.facebookURL} target="_blank">
                        <IoLogoFacebook className="socmed-item" />
                      </a>
                    )}
                    {portraitData.tiktokURL && (
                      <a href={portraitData.tiktokURL} target="_blank">
                        <IoLogoTiktok className="socmed-item" />
                      </a>
                    )}
                    {portraitData.instagramURL && (
                      <a href={portraitData.instagramURL} target="_blank">
                        <IoLogoInstagram className="socmed-item" />
                      </a>
                    )}
                    {portraitData.twitterURL && (
                      <a href={portraitData.twitterURL} target="_blank">
                        <IoLogoTwitter className="socmed-item" />
                      </a>
                    )}
                    {portraitData.youtubeURL && (
                      <a href={portraitData.youtubeURL} target="_blank">
                        <IoLogoYoutube className="socmed-item" />
                      </a>
                    )}
                  </div>
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
          style={{ backgroundImage: `url(${portraitData.imgLocation}` }}
          onClick={() => {
            setModalOpen(true);
          }}
        />
        <div className="name">{portraitData.name}</div>
        <div className="position">{portraitData.position}</div>
      </div>
    </>
  );
};

export default PortraitCard;
