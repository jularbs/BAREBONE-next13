import { useState, useEffect } from "react";
import { updateRecipient } from "actions/inquiryRecipient";
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
import withNotifications from "hoc/withNotifications";

const UpdateComponent = ({
  isOpen,
  setIsOpen,
  list,
  setList,
  values,
  notify,
}) => {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [messages, setMessage] = useState({
    error: "",
    success: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormValues(values);
    }
  }, [isOpen]);

  const handleTextChange = (name) => (e) => {
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    delete formValues.createAt;
    updateRecipient("", formValues)
      .then((data) => {
        setLoading(false);
        setFormValues({
          order: "",
          name: "",
          email: "",
          _id: "",
          slug: "",
          updatedAt: "",
          createdAt: "",
        });
        setIsOpen(false);

        if (data.data) {
          const oldList = list.filter((item) => item._id !== values._id);
          setList([data.data, ...oldList]);
        }

        notify({
          type: "success",
          message: "Recipient updated successfully",
        });
      })
      .catch((e) => {
        setLoading(false);
        notify({
          type: "danger",
          message: "There was a problem updating the recipient.",
        });
      });
  };

  return (
    <>
      <Modal toggle={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        <ModalHeader>Update Recipient</ModalHeader>
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
            Update Recipient
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default withNotifications(UpdateComponent);
