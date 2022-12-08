import styles from "./PdfViewerComponent.module.scss";

import { IoCloseSharp } from "react-icons/io5";
import { Modal, ModalBody } from "reactstrap";

const CoverLetterComponent = ({ isOpen, setIsOpen, content }) => {
  return (
    <>
      <Modal
        toggle={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
        style={{ maxWidth: "98vw", width: "1000px" }}
      >
        <div className="p-3 d-flex justify-content-between">
          <div className={styles.title}>Cover Letter</div>
          <div
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <IoCloseSharp className={styles.closeIcon} />
          </div>
        </div>
        <ModalBody style={{ whiteSpace: "pre-line" }}>{content}</ModalBody>
      </Modal>
    </>
  );
};

export default CoverLetterComponent;
