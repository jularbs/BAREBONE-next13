import {
  Container,
  Row,
  Table,
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledTooltip,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { useState, useEffect } from "react";
import { listAuditTrail, getCookie } from "actions/auth";
import ShowDateTime from "asset/vendor/moment/ShowDateTime";

function SalesManagement() {
  const token = getCookie("token");
  const [auditTrailList, setAuditTrailList] = useState([]);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [payloadModalOpen, setPayloadModalOpen] = useState(false);
  const [payloadDetails, setPayloadDetails] = useState({});

  useEffect(() => {
    listAuditTrail(token, { skip, limit }).then((data) => {
      setAuditTrailList(data.result);
      setCount(data.count);
      setTotalPages(Math.ceil(data.count / limit));
    });
  }, [skip, currentPage]);

  const showList = () => {
    return auditTrailList.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.userName}</td>
          <td>{item.action}</td>
          <td>
            <ShowDateTime data={item.createdAt} />
          </td>
          <td>{item.ipAddress}</td>

          <td>
            {item.payload && (
              <>
                <span
                  className="table-action mr-2"
                  id={`info-${index}`}
                  onClick={() => {
                    setPayloadDetails(item.payload);
                    setPayloadModalOpen(true);
                  }}
                >
                  <i className="fas fa-info-circle" />
                </span>
                <UncontrolledTooltip delay={0} target={`info-${index}`}>
                  View Payload
                </UncontrolledTooltip>
              </>
            )}
          </td>
        </tr>
      );
    });
  };

  const showEditModal = () => {
    return (
      <Modal
        toggle={() => setPayloadModalOpen(!payloadModalOpen)}
        isOpen={payloadModalOpen}
      >
        <div className=" modal-header">
          <h5 className="modal-title">Payload</h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setPayloadModalOpen(!payloadModalOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody className="py-0"></ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => setPayloadModalOpen(!modalEditOpen)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  const altShowPages = () => {
    return (
      <>
        <PaginationItem className={`${currentPage == 1 ? "disabled" : ""}`}>
          {/* SHOW PREVIOUS BUTTON */}
          <PaginationLink
            onClick={() => {
              setCurrentPage(currentPage - 1);
              setSkip(skip - limit);
            }}
          >
            <i className="fas fa-angle-left" />
            <span className="sr-only">Previous</span>
          </PaginationLink>
        </PaginationItem>

        {/* SHOW FIRST PAGE */}
        {currentPage > 4 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                setCurrentPage(1);
                setSkip(0);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {/* SHOW ELLIPSES */}
        {currentPage > 4 && totalPages > 4 && (
          <PaginationItem className="disabled">
            <PaginationLink>
              <i className="fas fa-ellipsis-h" />
              <span className="sr-only">More</span>
            </PaginationLink>
          </PaginationItem>
        )}

        {/* SHOW PREVIOUS 2 PAGES   */}
        {currentPage == totalPages && totalPages > 3 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                setCurrentPage(currentPage - 2);
                setSkip(skip - limit * 2);
              }}
            >
              {currentPage - 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* SHOW PREVIOUS PAGE */}
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                setCurrentPage(currentPage - 1);
                setSkip(skip - limit);
              }}
            >
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* SHOW CURRENT PAGE */}
        <PaginationItem className="active">
          <PaginationLink>{currentPage}</PaginationLink>
        </PaginationItem>

        {/* SHOW NEXT PAGE */}
        {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                setCurrentPage(currentPage + 1);
                setSkip(skip + limit);
              }}
            >
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* SHOW NEXT 2 PAGES */}
        {currentPage == 1 && totalPages > 2 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                setCurrentPage(currentPage + 2);
                setSkip(skip + limit * 2);
              }}
            >
              {currentPage + 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* SHOW ELLIPSES */}
        {currentPage < totalPages - 2 && totalPages > 4 && (
          <PaginationItem className="disabled">
            <PaginationLink>
              <i className="fas fa-ellipsis-h" />
              <span className="sr-only">More</span>
            </PaginationLink>
          </PaginationItem>
        )}

        {/* SHOW LAST PAGE */}
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                setCurrentPage(totalPages);
                setSkip(limit * (totalPages - 1));
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* SHOW NEXT BUTTON */}
        <PaginationItem
          className={`${currentPage == totalPages ? "disabled" : ""}`}
        >
          <PaginationLink
            onClick={() => {
              setCurrentPage(currentPage + 1);
              setSkip(skip + limit);
            }}
          >
            <i className="fas fa-angle-right" />
            <span className="sr-only">Next</span>
          </PaginationLink>
        </PaginationItem>
      </>
    );
  };

  return (
    <>
      {showEditModal()}
      <SimpleHeader name="" parentName="Activity Monitor" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col col-lg-12">
            <Card>
              <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                <div className="mb-0">Activity</div>
                <div className="text-xs d-flex align-items-center">
                  <div className="mr-2">Go to page: </div>
                  <Input
                    className="form-group mb-0"
                    style={{ width: "80px" }}
                    type="number"
                    size="sm"
                    min="1"
                    max={totalPages}
                  ></Input>
                  <Button size="sm" color="primary" className="ml-2">
                    Go
                  </Button>
                </div>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">User name</th>
                    <th scope="col">Action</th>
                    <th scope="col">Date time</th>
                    <th scope="col">IP Address</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody className="list">{showList()}</tbody>
              </Table>

              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    {altShowPages()}
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

SalesManagement.layout = Admin;

export default SalesManagement;
