import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import { getApplicationList } from "actions/internshipApplication";
import { format } from "date-fns";
import { getLink } from "actions/media";

import dynamic from "next/dynamic";
const PdfViewerComponent = dynamic(() => import("./PdfViewerComponent"));
const CoverLetterComponent = dynamic(() => import("./CoverLetterComponent"));
const DeleteComponent = dynamic(() => import("./DeleteComponent"));

const InternshipApplicationComponentForm = () => {
  const [loading, setLoading] = useState(false);
  const [applicationList, setApplicationList] = useState([]);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [pdfDetails, setPdfDetails] = useState({
    label: "",
    url: "",
  });
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const [coverLetterContent, setCoverLetterContent] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteValues, setDeleteValues] = useState({});

  useEffect(() => {
    getApplicationList().then((data) => {
      if (data.data) {
        console.log(data.data);
        setApplicationList(data.data);
      }
    });
  }, []);

  const showApplicationListData = () => {
    return applicationList.map((item, index) => (
      <tr key={index}>
        <td>
          <div>
            {item.firstName} {item.lastName}
          </div>
        </td>
        <td>
          <div>{item.emailAddress}</div>
          <div>{item.mobileNumber}</div>
        </td>
        <td>
          <div>{item.schoolUniversity}</div>
          <div>{item.degree}</div>
        </td>
        <td className="d-flex">
          <div className="mr-2">
            <Button
              size="md"
              id={`coverletter${index}`}
              color="primary"
              block
              onClick={() => {
                setIsCoverLetterOpen(true);
                setCoverLetterContent(item.coverLetter);
              }}
            >
              CL
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="top"
              target={`coverletter${index}`}
            >
              Cover Letter
            </UncontrolledTooltip>
          </div>
          <div className="mr-2">
            <Button
              size="md"
              id={`curriculumvitae${index}`}
              color="primary"
              block
              onClick={() => {
                setIsPdfViewerOpen(true);
                setPdfDetails({
                  label: "Curriculum Vitae",
                  url: getLink(item.curriculumVitae),
                });
              }}
            >
              CV
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="top"
              target={`curriculumvitae${index}`}
            >
              Curriculum Vitae
            </UncontrolledTooltip>
          </div>
          <div className="mr-2">
            <Button
              size="md"
              id={`schoolendorsementletter${index}`}
              color="primary"
              block
              onClick={() => {
                setIsPdfViewerOpen(true);
                setPdfDetails({
                  label: "School Endorsement Letter",
                  url: getLink(item.schoolEndorsementLetter),
                });
              }}
            >
              SEL
            </Button>
            <UncontrolledTooltip
              delay={0}
              placement="top"
              target={`schoolendorsementletter${index}`}
            >
              School Endorsement Letter
            </UncontrolledTooltip>
          </div>
          {item.kbpEndorsementLetter && (
            <div>
              <Button
                size="md"
                id={`kbpendorsementletter${index}`}
                color="primary"
                block
                onClick={() => {
                  setIsPdfViewerOpen(true);
                  setPdfDetails({
                    label: "KBP Endorsement Letter",
                    url: getLink(item.kbpEndorsementLetter),
                  });
                }}
              >
                KEL
              </Button>
              <UncontrolledTooltip
                delay={0}
                placement="top"
                target={`kbpendorsementletter${index}`}
              >
                KBP Endorsement Letter
              </UncontrolledTooltip>
            </div>
          )}
        </td>
        <td>{format(new Date(item.createdAt), "PPpp")}</td>

        <td>
          <Button
            size="md"
            color="danger"
            block
            outline
            onClick={() => {
              setIsDeleteModalOpen(true);
              setDeleteValues(item);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));
  };

  const showApplicationListTable = () => {
    return (
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Applicant Name</th>
            <th scope="col">Contact Details</th>
            <th scope="col">School/University</th>
            <th scope="col">Files</th>
            <th scope="col">Application Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="list">{showApplicationListData()}</tbody>
      </Table>
    );
  };
  return (
    <>
      <PdfViewerComponent
        isOpen={isPdfViewerOpen}
        setIsOpen={setIsPdfViewerOpen}
        label={pdfDetails.label}
        url={pdfDetails.url}
      />
      <CoverLetterComponent
        isOpen={isCoverLetterOpen}
        setIsOpen={setIsCoverLetterOpen}
        content={coverLetterContent}
      />
      <DeleteComponent
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        values={deleteValues}
        list={applicationList}
        setList={setApplicationList}
      />
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0 d-inline-block">Internship Applications</h2>
        </CardHeader>
        <CardBody className="p-0">
          {applicationList.length > 0 ? (
            showApplicationListTable()
          ) : (
            <div className="mx-auto text-center p-4">No applications found</div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default InternshipApplicationComponentForm;
