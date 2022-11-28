import { useState, useEffect } from "react";
import { createRecipient } from "actions/inquiryRecipient";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  FormGroup,
  Input,
  ModalFooter,
  Button,
  Spinner,
} from "reactstrap";

const AddComponent = ({ isOpen, setIsOpen, setValues, values }) => {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [messages, setMessage] = useState({
    error: "",
    success: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormValues({ ...formValues, order: values.length + 1});
    }
  }, [isOpen]);
  const handleTextChange = (name) => (e) => {
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    createRecipient("", formValues)
      .then((data) => {
        setLoading(false);
        setFormValues({
          order: "",
          name: "",
          email: "",
        });
        setIsOpen(false);
        setValues([...values, data.data]);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal toggle={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        <ModalHeader>Add Recipient</ModalHeader>
        <ModalBody className="py-4">
          <Row>
            <Col>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Order
                </label>
                <Input
                  value={formValues.order}
                  onChange={handleTextChange("order")}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Name
                </label>
                <Input
                  value={formValues.name}
                  onChange={handleTextChange("name")}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Email Address
                </label>
                <Input
                  value={formValues.email}
                  onChange={handleTextChange("email")}
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            outline
            className="px-5"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            {loading && <Spinner color="white" size="sm" className="mr-2" />}
            Add Recipient
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddComponent;
