import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  FormGroup,
  Input,
  Spinner,
  UncontrolledAlert,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table,
} from "reactstrap";

import { useState, useEffect } from "react";

import { getFileListByCategory, removeFile } from "actions/fileIR";
const FilesHandler = ({ isOpen, setIsOpen, category }) => {
  const [loading, setLoading] = useState({
    fetch: false,
    delete: false,
  });

  const [filesList, setFilesList] = useState([]);
  const [responseMessage, setResponseMessage] = useState({});

  useEffect(() => {
    setLoading({ ...loading, fetch: true });
    getFileListByCategory(category).then((data) => {
      setLoading({ ...loading, fetch: false });
      if (data.data) setFilesList(data.data);
    });
  }, [category]);

  const showFilesData = () => {
    return filesList.map((item, index) => (
      <tr key={index}>
        <td>{item.asOf}</td>
        <td className="d-flex justify-content-end">
          <Button
            size="sm"
            color="default"
            onClick={() => {
              //TODOS: change key to slug for delete handler
            }}
            className="px-3"
          >
            View
          </Button>
          <Button
            size="sm"
            color="danger"
            outline
            onClick={() => {
              //TODOS: change key to slug for delete handler

              setDeleteModalOpen(true);
              setDeleteHandler({ key: item._id, input: "" });
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));
  };

  //DELETE HANDLER
  const [deleteHandler, setDeleteHandler] = useState({
    key: "",
    input: "",
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const showDeleteConfirmation = () => {
    return (
      <Modal
        toggle={() => setDeleteModalOpen(!deleteModalOpen)}
        isOpen={deleteModalOpen}
      >
        {showDeleteErrorMessage()}
        <div className=" modal-header">
          <h5 className="modal-title">Delete File</h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setDeleteModalOpen(!deleteModalOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody className="py-0">
          <FormGroup className="mb-0">
            <span className="text-sm">
              Type "DANGER" to permanently delete file.
            </span>
            <Input
              placeholder=""
              type="text"
              onChange={(e) => {
                setDeleteHandler({ ...deleteHandler, input: e.target.value });
              }}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            disabled={deleteHandler.input == "DANGER" ? false : true}
            onClick={handleRemove(deleteHandler.key)}
          >
            {loading.delete && (
              <Spinner color="white" size="sm" className="mr-2" />
            )}
            Permanently Delete
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setDeleteModalOpen(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  const handleRemove = (key) => (e) => {
    e.preventDefault();
    setLoading({
      ...loading,
      delete: true,
    });

    removeFile("", key)
      .then((data) => {
        setLoading({ ...loading, delete: false });
        if (data.status && data.status == "200") {
          //portrait is deleted
          setResponseMessage({
            ...responseMessage,
            deleteSuccess: data.message,
          });

          setDeleteHandler({
            key: "",
            input: "",
          });
          setDeleteModalOpen(false);
          setFilesList(filesList.filter((item) => item._id !== key));
        }
      })
      .catch((e) => {
        setLoading({
          ...loading,
          delete: false,
        });
        setResponseMessage({
          deleteError: e.response.data.message,
        });
      });
  };

  const showDeleteSuccessMessage = () =>
    responseMessage.deleteSuccess && (
      <UncontrolledAlert
        color="primary"
        onClick={() => {
          setResponseMessage({ ...responseMessage, deleteSuccess: "" });
        }}
      >
        <span className="alert-icon">
          <i className="ni ni-like-2" />
        </span>
        <span className="alert-text ml-1">{responseMessage.deleteSuccess}</span>
      </UncontrolledAlert>
    );

  const showDeleteErrorMessage = () =>
    responseMessage.deleteError && (
      <UncontrolledAlert
        color="danger"
        onClick={() => {
          setResponseMessage({ ...responseMessage, deleteError: "" });
        }}
      >
        <span className="alert-icon">
          <i className="ni ni-like-2" />
        </span>
        <span className="alert-text ml-1">{responseMessage.deleteError}</span>
      </UncontrolledAlert>
    );

  return (
    <>
      {showDeleteConfirmation()}
      <Modal
        toggle={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
      >
        <ModalHeader className="d-flex align-items justify-content-space-between">
          Files
        </ModalHeader>
        <ModalBody className="p-0">
          {showDeleteSuccessMessage()}
          {loading.fetch && (
            <div className="d-flex justify-content-center">
              <Spinner color="black" size="md" className="" />
            </div>
          )}
          {!loading.fetch && filesList.length < 1 ? (
            <div className="d-flex justify-content-center">No files found</div>
          ) : (
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th cope="col">As of</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="list">{showFilesData()}</tbody>
            </Table>
          )}
        </ModalBody>
        <ModalFooter className="p-2">
          <Button
            outline
            className="px-5"
            size="sm"
            color="primary"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default FilesHandler;
