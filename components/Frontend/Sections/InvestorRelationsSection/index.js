import "./styles.scss";

import { useState } from "react";
import { Row, Col } from "reactstrap";
import {
  IoChevronForwardOutline,
  IoDownloadOutline,
  IoPrintOutline,
} from "react-icons/io5";

import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "react-pdf/dist/esm/pdf.worker.entry";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const InvestorRelationsSection = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(3);
  const [activeHeading, setActiveHeading] = useState(null);
  const [activeChild, setActiveChild] = useState(null);
  const [fileHistory, setFileHistory] = useState([
    "Latest",
    "2022-01-01",
    "2021-01-01",
  ]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const header = [
    { name: "Articles of Incorporation and By-Laws", slug: "articles" },
    { name: "SEC FORM 17-A Annual Report", slug: "17-a" },
    { name: "SEC FORM 17-Q Quarterly Report", slug: "17-q" },
    { name: "SEC FORM 20-IS Information Sheet", slug: "20-is" },
  ];

  const children = [
    { name: "Articles of Incorporation", slug: "aoi", parent: "articles" },
    { name: "By-Laws", slug: "bl", parent: "articles" },
    { name: "SEC Form 17-a", slug: "sf17a", parent: "17-a" },
    { name: "MBC Quarterly Reports", slug: "mqr", parent: "17-q" },
  ];

  const showHeadings = () =>
    header.map((head, index) => {
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
            <span>{head.name}</span>
            <IoChevronForwardOutline className="chevron" />
          </div>
          <div className="children">{showChildren(head.slug)}</div>
        </div>
      );
    });

  const showChildren = (slug) => {
    return children
      .filter((child) => child.parent == slug)
      .map((child, key) => {
        return (
          <div
            className={`childItem ${activeChild == child.slug ? "active" : ""}`}
            onClick={() => {
              setActiveChild(child.slug);
            }}
          >
            {child.name}
          </div>
        );
      });
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
                  <select>
                    <option value="">Latest (06-22-2022)</option>
                    <option value="">As of 05-22-2022</option>
                    <option value="">As of 04-18-2022</option>
                    <option value="">As of 03-21-2022</option>
                    <option value="">As of 02-22-2022</option>
                    <option value="">As of 01-15-2022</option>
                  </select>
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
                file="samplepdf.pdf"
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
