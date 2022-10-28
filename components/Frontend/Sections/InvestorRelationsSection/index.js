//TODOS: pick category with file then empty category then with file returns error

import styles from "./InvestorRelationsSection.module.scss";

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
          className={`${styles["tab-item"]} ${
            activeHeading == head.slug ? styles.active : ""
          }`}
          key={index}
        >
          <div
            className={styles["heading"]}
            onClick={() => {
              if (activeHeading == head.slug) {
                setActiveHeading(null);
              } else {
                setActiveHeading(head.slug);
              }
            }}
          >
            <span>{head.label}</span>
            <IoChevronForwardOutline className={styles["chevron"]} />
          </div>
          <div className={styles["children"]}>{showChildren(head._id)}</div>
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
            className={`${styles["childItem"]} ${
              activeChild == child._id ? styles.active : ""
            }`}
            onClick={() => {
              setActiveChild(child._id);
            }}
            key={key}
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

  return (
    <>
      <div className={styles["investorRelationsSectionContainer"]}>
        <Row noGutters>
          <Col className={styles["tabsRow"]}>
            <div className={styles["tabsContainer"]}>
              <div className={styles["header"]}>
                <div className={styles["title"]}>
                  <span>Investor</span> Relations
                </div>
                <div className={styles["subtitle"]}>SEC and PSE FILINGS</div>
              </div>
              <div className={styles["tabsWrapper"]}>{showHeadings()}</div>
            </div>
          </Col>
          <Col className={styles["pdfRow"]}>
            <div
              className={`${styles["pdfViewerContainer"]} ${
                activeChild ? styles.show : ""
              }`}
            >
              <div className={styles["pdfNavigator"]}>
                <div className={styles["pdfSelector"]}>
                  <select onChange={handleFileChange}>{showFiles()}</select>
                  <div
                    className={`btn btn-default ml-2 ${styles["close-control"]}`}
                    onClick={() => {
                      setActiveChild("");
                    }}
                  >
                    CLOSE
                  </div>
                </div>
                {activePdfNav && (
                  <>
                    <div className={styles["pdfPagination"]}>
                      {pageNumber} / {numPages}
                    </div>
                    <div className={styles["tools"]}>
                      <a
                        className={styles["download"]}
                        target="_blank"
                        href={activeFile}
                      >
                        <IoDownloadOutline className={styles["icon"]} />
                      </a>
                      <span
                        className={styles["print"]}
                        onClick={() => {
                          window.open(
                            activeFile,
                            "PRINT",
                            "height=400,width=600"
                          );
                        }}
                      >
                        <IoPrintOutline className={styles["icon"]} />
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div className={styles["pdfWindow"]}>
                <Document
                  file={activeFile}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className={styles["pdfWrapper"]}
                >
                  {Array.apply(null, Array(numPages))
                    .map((x, i) => i + 1)
                    .map((page, key) => (
                      <Page pageNumber={page} key={key} />
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
