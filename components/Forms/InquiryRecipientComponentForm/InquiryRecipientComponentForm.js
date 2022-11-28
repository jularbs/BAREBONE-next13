import { Button, Card, CardHeader, CardBody } from "reactstrap";
import { useState, useEffect } from "react";

const InquiryRecipientComponentForm = () => {
  const [recipientList, setRecipientList] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  return (
    <>
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0 d-inline-block">Recipients</h2>
          <Button size="sm" color="primary" onClick={() => {}}>
            + Add Recipient Option
          </Button>
        </CardHeader>
        <CardBody></CardBody>
      </Card>
    </>
  );
};

export default InquiryRecipientComponentForm;
