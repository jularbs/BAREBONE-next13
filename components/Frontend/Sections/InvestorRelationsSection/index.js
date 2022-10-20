//TODOS: pick category with file then empty category then with file returns error

import "./styles.scss";

import { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import {
  IoCaretBackOutline,
  IoCaretForwardOutline,
  IoChevronForwardOutline,
  IoDownloadOutline,
  IoPrintOutline,
  IoDownloadSharp,
  IoPrintSharp,
} from "react-icons/io5";

import { getCategoryList } from "actions/categoryIR";
import { getFileListByCategory } from "actions/fileIR";
import { getLink } from "actions/media";

import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "react-pdf/dist/esm/pdf.worker.entry";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const InvestorRelationsSection = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(null);
  const [activeHeading, setActiveHeading] = useState(null);
  const [activeChild, setActiveChild] = useState(null);
  const [activeFile, setActiveFile] = useState("");
  const [activePdfNav, setActivePdfNav] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setPageNumber(1);
    setActivePdfNav(true);
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
    if (activeChild) {
      setActiveFile("");
      getFileListByCategory(activeChild).then((data) => {
        setFiles(data.data);
      });
      setActivePdfNav(false);
    }
  }, [activeChild]);

  useEffect(() => {
    if (files.length !== 0) {
      setActiveFile(getLink(files[0].file));
    }
  }, [files]);

  useEffect(() => {
    setNumPages(null);
    setPageNumber(null);
  }, [activeFile]);

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
          {item.asOf}
        </option>
      );
    });
  };

  const handleFileChange = (e) => {
    setActivePdfNav(false);
    let item = JSON.parse(e.target.value);
    setActiveFile(getLink(item.file));
  };

  const handlePageChange = (direction) => () => {
    if (pageNumber + direction > 0 && pageNumber + direction <= numPages)
      setPageNumber(pageNumber + direction);
  };

  return (
    <>
      <div className="investorRelationsSectionContainer">
        <Row noGutters>
          <Col className="tabsRow">
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
          <Col className="pdfRow">
            <div className={`pdfViewerContainer ${activeChild ? "show" : ""}`}>
              {/* {activePdfNav && (
                <>
                  <button
                    onClick={handlePageChange(-1)}
                    className="btn-pdfNav prev"
                  >
                    <IoCaretBackOutline className="__icon" />
                  </button>
                  <button
                    onClick={handlePageChange(1)}
                    className="btn-pdfNav next"
                  >
                    <IoCaretForwardOutline className="__icon" />
                  </button>
                </>
              )} */}

              <div className="pdfNavigator">
                <div className="pdfSelector">
                  <select onChange={handleFileChange}>{showFiles()}</select>
                  <div
                    className="btn btn-default ml-2 close-control"
                    onClick={() => {
                      setActiveChild("");
                    }}
                  >
                    CLOSE
                  </div>
                </div>
                {activePdfNav && (
                  <>
                    <div className="pdfPagination">
                      {pageNumber} / {numPages}
                    </div>
                    {/* <div className="magnifyer">100%</div> */}
                    <div className="tools">
                      <a className="download" target="_blank" href={activeFile}>
                        <IoDownloadOutline className="icon" />
                      </a>
                      <span
                        className="print"
                        onClick={() => {
                          window.open(
                            activeFile,
                            "PRINT",
                            "height=400,width=600"
                          );
                        }}
                      >
                        <IoPrintOutline className="icon" />
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div className="pdfWindow">
                <Document
                  file={activeFile}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="pdfWrapper"
                >
                  {/* <Page pageNumber={pageNumber} /> */}
                  {Array.apply(null, Array(numPages))
                    .map((x, i) => i + 1)
                    .map((page) => (
                      <Page pageNumber={page} />
                    ))}
                </Document>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InvestorRelationsSection;
