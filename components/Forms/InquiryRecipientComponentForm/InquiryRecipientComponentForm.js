import { Button, Card, CardHeader, CardBody, Table } from "reactstrap";
import { useState, useEffect } from "react";

import { getRecipientList } from "actions/inquiryRecipient";
import dynamic from "next/dynamic";
const AddComponent = dynamic(() => import("./AddComponent"));

const InquiryRecipientComponentForm = () => {
  const [recipientList, setRecipientList] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    getRecipientList().then((data) => {
      if (data.data) {
        setRecipientList(data.data);
      }
    });
  }, []);

  const showRecipientListData = () => {
    return recipientList.map((item, index) => (
      <tr key={index}>
        <td>
          <div>{item.name}</div>
          <div>{item.email}</div>
        </td>
        <td className="d-flex justify-content-end">
          <Button size="sm" color="danger" outline onClick={() => {}}>
            Delete
          </Button>
          <Button size="sm" color="primary" className="px-3" onClick={() => {}}>
            Edit
          </Button>
        </td>
      </tr>
    ));
  };

  const showRecipientListTable = () => {
    return (
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Recipient</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="list">{showRecipientListData()}</tbody>
      </Table>
    );
  };

  return (
    <>
      <AddComponent
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        values={recipientList}
        setValues={setRecipientList}
      />
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0 d-inline-block">Recipients</h2>
          <Button
            size="sm"
            color="primary"
            onClick={() => {
              setIsAddModalOpen(true);
            }}
          >
            + Add Recipient Option
          </Button>
        </CardHeader>
        <CardBody className="p-0">{showRecipientListTable()}</CardBody>
      </Card>
    </>
  );
};

export default InquiryRecipientComponentForm;
