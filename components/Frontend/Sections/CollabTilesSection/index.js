import "./styles.scss";

import { forwardRef, useState, useEffect } from "react";
import { Modal, ModalBody, Row, Col } from "reactstrap";
import ReactPlayer from "react-player/lazy";
import { getCollaborationList } from "actions/collaboration";
import { getLink } from "actions/media";

const CollabTilesSection = forwardRef(({ data, next }, myRef) => {
  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [collaborationList, setCollaborationList] = useState([]);
  const [activeCollabData, setActiveCollabData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getCollaborationList().then((data) => {
      if (data.data) setCollaborationList(data.data);
    });
  }, []);

  const showModal = () => {
    return (
      <Modal
        toggle={() => setModalOpen(!modalOpen)}
        isOpen={modalOpen}
        className="portait-modal"
      >
        <ModalBody>
          <div className="collab-details-container">
            <button
              type="button"
              class="close-button-circle"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <span class="icon-x"></span>
            </button>
            <Row>
              <Col lg={6}>
                <div className="content-container">
                  <div className="company-wrapper">
                    {activeCollabData.company}
                  </div>
                  <div className="campaign-wrapper">
                    {activeCollabData.campaign}
                  </div>
                  <div className="content-wrapper">
                    {activeCollabData.content}
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="video-container">
                  <div className="embed-responsive embed-responsive-16by9">
                    <ReactPlayer
                      url={activeCollabData.videoSource}
                      className="player"
                      width="100%"
                      height="100%"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    );
  };

  const showCollabList = () => {
    return collaborationList.map((item, key) => {
      return (
        <div
          className="tile-item"
          key={key}
          style={{
            backgroundImage: `url("${getLink(item.cover)}")`,
          }}
          onClick={() => {
            setModalOpen(true);
            setActiveCollabData(item);
          }}
        >
          <div className="tile-content">
            <div className="company-wrapper">{item.company}</div>
            <div className="campaign-wrapper">{item.campaign}</div>
          </div>
        </div>
      );
    });
  };
  return (
    <>
      {showModal()}
      <div className="collab-tiles-section" ref={myRef}>
        <Col lg={4} md={12} className="px-0">
          <div className="content-wrapper">
            <div className="header">collaborations</div>
            <div className="description">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </div>
          </div>
        </Col>
        <Col lg={8} md={12} className="px-0">
          <div className="tiles-grid-wrapper">{showCollabList()}</div>
        </Col>

        {next && (
          <div className="arrow-placement">
            <div className="arrow-wrapper" onClick={scrollNext} />
          </div>
        )}
      </div>
    </>
  );
});

export default CollabTilesSection;
