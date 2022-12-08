//TODOS: Pagination. Filtering by recipient. Messages/Notifs
import { useEffect, useState } from "react";
import { getRecipientList } from "actions/inquiryRecipient";
import { getInquiryList } from "actions/inquiry";
import { Button, Table, Card, CardHeader, CardBody } from "reactstrap";
import { format } from "date-fns";

import dynamic from "next/dynamic";
const DeleteComponent = dynamic(() => import("./DeleteComponent"));
const ViewComponent = dynamic(() => import("./ViewComponent"));

const InquiryComponentForm = () => {
  const [loading, setLoading] = useState({
    fetch: false,
    fetchRecipients: false,
    delete: false,
  });

  const [responseMessage, setResponseMessage] = useState({
    error: "",
    success: "",
  });

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewValues, setViewValues] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteValues, setDeleteValues] = useState({});
  const [inquiryList, setInquiryList] = useState([]);
  const [recipientList, setRecipientList] = useState([]);

  useEffect(() => {
    setLoading({ ...loading, fetchRecipients: true });
    getRecipientList().then((data) => {
      setLoading({ ...loading, fetchRecipients: false });
      setRecipientList(data.data);
    });

    getInquiryList().then((data) => {
      setInquiryList(data.data);
    });
  }, []);

  const showInquiryListTable = () => {
    return (
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Company Name</th>
            <th scope="col">Recipient</th>
            <th scope="col">Contact Details</th>
            <th scope="col">Type</th>
            <th scope="col">Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="list">{showInquiryListData()}</tbody>
      </Table>
    );
  };

  const showInquiryListData = () => {
    return inquiryList.map((item, index) => (
      <tr key={index}>
        <td>
          <div>{item.companyName}</div>
        </td>
        <td>{item.sendTo.name}</td>
        <td>
          <div>{item.fullName}</div>
          <div>{item.emailAddress}</div>
        </td>
        <td>{item.isAdvertiser}</td>
        <td>{format(new Date(item.createdAt), "PPpp")}</td>

        <td className="d-flex justify-content-end">
          <Button
            size="sm"
            color="danger"
            outline
            onClick={() => {
              setDeleteModalOpen(true);
              setDeleteValues(item);
            }}
          >
            Delete
          </Button>
          <Button
            size="sm"
            color="primary"
            className="px-3"
            onClick={() => {
              setViewModalOpen(true);
              setViewValues(item);
            }}
          >
            View
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <DeleteComponent
        isOpen={deleteModalOpen}
        setIsOpen={setDeleteModalOpen}
        values={deleteValues}
        list={inquiryList}
        setList={setInquiryList}
      />
      <ViewComponent
        isOpen={viewModalOpen}
        setIsOpen={setViewModalOpen}
        values={viewValues}
      />
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0 d-inline-block">Inquiries</h2>
        </CardHeader>
        <CardBody className="p-0">
          {inquiryList.length > 0 ? (
            showInquiryListTable()
          ) : (
            <div className="mx-auto text-center p-4">No inquiries found</div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default InquiryComponentForm;
