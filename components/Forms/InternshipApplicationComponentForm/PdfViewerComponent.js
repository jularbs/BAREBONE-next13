import styles from "./PdfViewerComponent.module.scss";
import { useEffect, useState } from "react";

import { Modal, ModalBody, ModalHeader } from "reactstrap";

import { IoCloseSharp } from "react-icons/io5";
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "react-pdf/dist/esm/pdf.worker.entry";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const PdfViewerComponent = ({ isOpen, setIsOpen, url, label }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(null);
  const [activeFile, setActiveFile] = useState("");

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPageNumber(1);
    setNumPages(numPages);
  };

  useEffect(() => {
    if (isOpen) {
      setActiveFile(url);
    } else {
      setActiveFile("");
      setNumPages(null);
      setPageNumber(null);
    }
  }, [isOpen]);

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
          <div className={styles.title}>{label}</div>
          <div
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <IoCloseSharp className={styles.closeIcon} />
          </div>
        </div>
        <ModalBody>
          <Document file={activeFile} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.apply(null, Array(numPages))
              .map((x, i) => i + 1)
              .map((page, key) => (
                <Page pageNumber={page} key={key} />
              ))}
          </Document>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PdfViewerComponent;
