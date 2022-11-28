import React, { useState, useEffect } from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Input,
  Spinner,
} from "reactstrap";

import { removeInquiry } from "actions/inquiry";

const DeleteComponent = ({ isOpen, setIsOpen, values }) => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormValues({
        ...values,
      });
    } else {
      setFormValues({});
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (deleteConfirmation === "DANGER") {
      removeInquiry("", formValues._id)
        .then((data) => {
          setLoading(false);
          setIsOpen(false);
          //update station list
        })
        .catch((e) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Modal
        toggle={() => {
          setIsOpen(!isOpen);
          setFormValues({});
        }}
        isOpen={isOpen}
      >
        <ModalHeader>Deleting Inquiry from {values.companyName}</ModalHeader>
        <ModalBody className="py-0">
          <FormGroup className="mb-0">
            <label className="form-control-label" htmlFor="title">
              Confirm delete by typing "DANGER"
            </label>
            <Input
              onChange={(e) => {
                setDeleteConfirmation(e.target.value);
              }}
              type="text"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <div>
            <Button
              outline
              className="px-5"
              onClick={() => {
                setIsOpen(false);
                setFormValues({});
              }}
            >
              Cancel
            </Button>
            <Button color="danger" onClick={handleSubmit} className="px-5">
              {loading && <Spinner color="white" size="sm" className="mr-2" />}
              Delete Station
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteComponent;
