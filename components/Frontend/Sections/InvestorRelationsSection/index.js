//TODOS: pick category with file then empty category then with file returns error

import "./styles.scss";

import { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import {
  IoChevronForwardOutline,
  IoDownloadOutline,
  IoPrintOutline,
} from "react-icons/io5";

import { getCategoryList } from "actions/categoryIR";
import { getFileListByCategory } from "actions/fileIR";
import { getLink } from "actions/media";

import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "react-pdf/dist/esm/pdf.worker.entry";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const InvestorRelationsSection = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(10);
  const [activeHeading, setActiveHeading] = useState(null);
  const [activeChild, setActiveChild] = useState(null);
  const [activeFile, setActiveFile] = useState("");

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoryList().then((data) => {
      setCategories(data.data);
    });
  }, []);

  const [files, setFiles] = useState([]);

  useEffect(() => {
    setActiveFile("");
    getFileListByCategory(activeChild).then((data) => {
      setFiles(data.data);
    });
  }, [activeChild]);

  useEffect(() => {
    if (files.length !== 0) {
      setActiveFile(getLink(files[0].file));
    }
  }, [files]);

  const showHeadings = () => {
    const sorted = categories
      .filter((item) => item.parent == null)
      .sort((a, b) => {
        return a.order - b.order;
      });

    return sorted.map((head, index) => {
      return (
        <div
          className={`tab-item ${activeHeading == head.slug ? "active" : ""}`}
          key={index}
        >
          <div
            className="heading"
            onClick={() => {
              if (activeHeading == head.slug) {
                setActiveHeading(null);
              } else {
                setActiveHeading(head.slug);
              }
            }}
          >
            <span>{head.label}</span>
            <IoChevronForwardOutline className="chevron" />
          </div>
          <div className="children">{showChildren(head._id)}</div>
        </div>
      );
    });
  };

  const showChildren = (id) => {
    return categories
      .filter((child) => child.parent == id)
      .map((child, key) => {
        return (
          <div
            className={`childItem ${activeChild == child._id ? "active" : ""}`}
            onClick={() => {
              setActiveChild(child._id);
            }}
          >
            {child.label}
          </div>
        );
      });
  };

  const showFiles = () => {
    if (files.length == 0) return <option value="">No files available</option>;
    return files.map((item, key) => {
      return (
        <option value={JSON.stringify(item)} key={key}>
          As of: {item.asOf}
        </option>
      );
    });
  };

  const handleFileChange = (e) => {
    let item = JSON.parse(e.target.value);
    setActiveFile(getLink(item.file));
    console.log(JSON.parse(e.target.value));
  };

  return (
    <>
      <div className="investorRelationsSectionContainer">
        <Row noGutters>
          <Col lg="4">
            <div className="tabsContainer">
              <div className="header">
                <div className="title">
                  <span>Investor</span> Relations
                </div>
                <div className="subtitle">SEC and PSE FILINGS</div>
              </div>
              <div className="tabsWrapper">{showHeadings()}</div>
            </div>
          </Col>
          <Col lg="8">
            <div className="pdfViewerContainer">
              <div className="pdfNavigator">
                <div className="pdfSelector">
                  <select onChange={handleFileChange}>{showFiles()}</select>
                </div>
                <div className="pdfPagination">
                  {pageNumber} / {numPages}
                </div>
                <div className="magnifyer">100%</div>
                <div className="tools">
                  <span className="download">
                    <IoDownloadOutline className="icon" />
                  </span>
                  <span className="print">
                    <IoPrintOutline className="icon" />
                  </span>
                </div>
              </div>
              <Document
                file={activeFile}
                onLoadSuccess={onDocumentLoadSuccess}
                className="pdfWrapper"
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InvestorRelationsSection;
