import styles from "./CollabTilesSection.module.scss";

import { forwardRef, useState, useEffect } from "react";
import { Modal, ModalBody, Row, Col } from "reactstrap";
import ReactPlayer from "react-player/lazy";
import { getCollaborationList } from "actions/collaboration";
import { getLink } from "actions/media";

import { readOption } from "actions/option";
import { COLLAB_HEADER_TEXT, COLLAB_SUB_TEXT } from "constants.js";

const CollabTilesSection = forwardRef(({ next }, myRef) => {
  const scrollNext = () => {
    if (next && next.current) {
      next.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [collaborationList, setCollaborationList] = useState([]);
  const [activeCollabData, setActiveCollabData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const [headerText, setHeaderText] = useState("");
  const [subText, setSubText] = useState("");

  useEffect(() => {
    getCollaborationList().then((data) => {
      if (data.data) setCollaborationList(data.data);
    });

    readOption(COLLAB_HEADER_TEXT).then((data) => {
      if (data.data) setHeaderText(data.data.value);
    });

    readOption(COLLAB_SUB_TEXT).then((data) => {
      if (data.data) setSubText(data.data.value);
    });
  }, []);

  const showModal = () => {
    return (
      <Modal
        toggle={() => setModalOpen(!modalOpen)}
        isOpen={modalOpen}
        className={styles["collab-modal"]}
      >
        <ModalBody>
          <div className={styles["collab-details-container"]}>
            <button
              type="button"
              className="close-button-circle"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <span className="icon-x"></span>
            </button>
            <Row>
              <Col lg={6}>
                <div className={styles["content-container"]}>
                  <div className={styles["company-wrapper"]}>
                    {activeCollabData.company}
                  </div>
                  <div className={styles["campaign-wrapper"]}>
                    {activeCollabData.campaign}
                  </div>
                  <div className={styles["content-wrapper"]}>
                    {activeCollabData.content}
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles["video-container"]}>
                  <div className="embed-responsive embed-responsive-16by9">
                    <ReactPlayer
                      url={activeCollabData.videoSource}
                      className={styles["player"]}
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
          className={styles["tile-item"]}
          key={key}
          style={{
            backgroundImage: `url("${getLink(item.cover)}")`,
          }}
          onClick={() => {
            setModalOpen(true);
            setActiveCollabData(item);
          }}
        >
          <div className={styles["tile-content"]}>
            <div className={styles["company-wrapper"]}>{item.company}</div>
            <div className={styles["campaign-wrapper"]}>{item.campaign}</div>
          </div>
        </div>
      );
    });
  };
  return (
    <>
      {showModal()}
      <div className={styles["collab-tiles-section"]} ref={myRef}>
        <Col lg={4} md={12} className="px-0">
          <div className={styles["content-wrapper"]}>
            <div className={styles["header"]}>{headerText}</div>
            <div className={styles["description"]}>{subText}</div>
          </div>
        </Col>
        <Col lg={8} md={12} className="px-0">
          <div className={styles["tiles-grid-wrapper"]}>{showCollabList()}</div>
        </Col>

        {next && (
          <div className={styles["arrow-placement"]}>
            <div className="arrow-wrapper" onClick={scrollNext} />
          </div>
        )}
      </div>
    </>
  );
});

export default CollabTilesSection;
