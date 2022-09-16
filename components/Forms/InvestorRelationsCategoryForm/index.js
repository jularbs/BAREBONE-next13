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

import {
  createCategory,
  getCategoryList,
  updateCategory,
  removeCategory,
} from "actions/categoryIR";

import { createFile } from "actions/fileIR";

import _ from "lodash";
import FilesHandler from "./FilesHandler";
const InvestorRelationsCategoryForm = () => {
  //Component States
  const [loading, setLoading] = useState({
    fetch: false,
    create: false,
    update: false,
    delete: false,
    update: false,
    upload: false,
  });

  const [responseMessage, setResponseMessage] = useState({
    error: "",
    success: "",
    deleteError: "",
    deleteSuccess: "",
    updateError: "",
    updateSuccess: "",
    uploadSuccess: "",
    uploadErorr: "",
  });

  const [formValues, setFormValues] = useState({
    order: "",
    label: "",
  });

  const [addFormModalOpen, setAddFormModalOpen] = useState(false);

  const [categoryList, setCategoryList] = useState([]);

  //Component Lifecycles
  useEffect(() => {
    setLoading({ ...loading, fetch: true });
    getCategoryList().then((data) => {
      setLoading({ ...loading, fetch: false });
      setCategoryList(data.data);
    });
  }, []);

  //Input Handlers
  const handleTextChange = (name) => (e) => {
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };

  //Create Handlers
  const handleSubmit = () => {
    setLoading({
      ...loading,
      create: true,
    });

    createCategory("", formValues)
      .then((data) => {
        setLoading({
          ...loading,
          create: false,
        });
        setAddFormModalOpen(false);
        setResponseMessage({ success: data.message, error: "" });
        setFormValues({});
        setCategoryList([...categoryList, data.data]);
      })
      .catch((e) => {
        setLoading({
          ...loading,
          create: false,
        });
        setResponseMessage({ success: "", error: e.response.data.message });
      });
  };

  const showPossibleParents = () => {
    return categoryList
      .filter((item) => item.parent == null)
      .map((item, key) => (
        <option key={key} value={item._id}>
          {item.label}
        </option>
      ));
  };

  const showAddForm = () => {
    return (
      <Modal
        toggle={() => setAddFormModalOpen(!addFormModalOpen)}
        isOpen={addFormModalOpen}
        // className="add-portrait-modal"
      >
        <ModalHeader>Add Category</ModalHeader>
        <ModalBody className="py-4">
          {showErrorMessage()}
          <Row>
            <Col>
              <h3>Category Details</h3>
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
                  Label
                </label>
                <Input
                  value={formValues.label}
                  onChange={handleTextChange("label")}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Parent Category
                </label>
                <Input
                  value={formValues.parent}
                  onChange={handleTextChange("parent")}
                  type="select"
                >
                  <option value={undefined}>No Parent</option>
                  {showPossibleParents()}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            outline
            className="px-5"
            onClick={() => {
              setAddFormModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            {loading.create && (
              <Spinner color="white" size="sm" className="mr-2" />
            )}
            Add Category
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  const showSuccessMessage = () =>
    responseMessage.success && (
      <UncontrolledAlert
        color="primary"
        onClick={() => {
          setResponseMessage({ success: "", error: "" });
        }}
      >
        <span className="alert-icon">
          <i className="ni ni-like-2" />
        </span>
        <span className="alert-text ml-1"> {responseMessage.success}</span>
      </UncontrolledAlert>
    );

  const showErrorMessage = () =>
    responseMessage.error && (
      <UncontrolledAlert
        color="danger"
        onClick={() => {
          setResponseMessage({ success: "", error: "" });
        }}
      >
        <span className="alert-icon">
          <i className="ni ni-like-2" />
        </span>
        <span className="alert-text ml-1">{responseMessage.error}</span>
      </UncontrolledAlert>
    );

  //UpdateHandlers
  const [updateFormModalOpen, setUpdateFormModalOpen] = useState(false);

  const [updateValues, setUpdateValues] = useState({
    order: "",
    label: "",
    parent: "",
  });

  const handleUpdate = () => {
    setLoading({ ...loading, update: true });
    console.log("UPDATE: ", updateValues);
    updateCategory("", updateValues)
      .then((data) => {
        setLoading({ ...loading, update: false });
        setResponseMessage({
          ...responseMessage,
          updateSuccess: data.message,
        });
        setUpdateFormModalOpen(false);

        //reset form
        setUpdateValues({
          order: "",
          label: "",
          parent: "",
          slug: "",
        });

        //remove old
        let newList = categoryList.filter(
          (item) => item.slug !== data.data.slug
        );
        //Add new
        setCategoryList([data.data, ...newList]);
      })
      .catch((e) => {
        setLoading({
          ...loading,
          update: false,
        });
        setResponseMessage({
          ...responseMessage,
          updateError: e.response.data.message,
        });

        //reset formx
      });
  };

  const handleUpdateTextChange = (name) => (e) => {
    const value = e.target.value;
    setUpdateValues({ ...updateValues, [name]: value });
  };

  const showUpdateForm = () => {
    return (
      <Modal
        toggle={() => {
          setUpdateFormModalOpen(!updateFormModalOpen);
          setUpdateValues({
            order: "",
            label: "",
            parent: "",
          });
        }}
        isOpen={updateFormModalOpen}
      >
        <ModalHeader>Update Category</ModalHeader>
        <ModalBody className="py-4">
          {showUpdateErrorMessage()}
          <Row>
            <Col>
              <h3>Category Details</h3>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Order
                </label>
                <Input
                  value={updateValues.order}
                  onChange={handleUpdateTextChange("order")}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Label
                </label>
                <Input
                  value={updateValues.label}
                  onChange={handleUpdateTextChange("label")}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Parent Category
                </label>
                <Input
                  value={updateValues.parent}
                  onChange={handleUpdateTextChange("parent")}
                  type="select"
                >
                  <option value="">No Parent</option>
                  {showPossibleParents()}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            outline
            className="px-5"
            onClick={() => {
              setUpdateFormModalOpen(false);
              setUpdateValues({});
            }}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={handleUpdate}>
            {loading.update && (
              <Spinner color="white" size="sm" className="mr-2" />
            )}
            Update Category
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  const showUpdateSuccessMessage = () =>
    responseMessage.updateSuccess && (
      <UncontrolledAlert
        color="primary"
        onClick={() => {
          setResponseMessage({ ...responseMessage, updateSuccess: "" });
        }}
      >
        <span className="alert-icon">
          <i className="ni ni-like-2" />
        </span>
        <span className="alert-text ml-1">{responseMessage.updateSuccess}</span>
      </UncontrolledAlert>
    );

  const showUpdateErrorMessage = () =>
    responseMessage.updateError && (
      <UncontrolledAlert
        color="danger"
        onClick={() => {
          setResponseMessage({ ...responseMessage, updateError: "" });
        }}
      >
        <span className="alert-icon">
          <i className="ni ni-like-2" />
        </span>
        <span className="alert-text ml-1">{responseMessage.updateError}</span>
      </UncontrolledAlert>
    );

  //Delete Handlers
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
          <h5 className="modal-title">Delete Metric</h5>
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
              Type "DANGER" to permanently delete metric.
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

    removeCategory("", key)
      .then((data) => {
        setLoading({ ...loading, delete: false });
        if (data.status && data.status == "200") {
          //portrait is deleted
          setResponseMessage({
            ...responseMessage,
            deleteSuccess: data.message,
          });
          const newList = categoryList.filter(
            (item) => item.slug !== deleteHandler.key
          );
          setCategoryList(newList);
          setDeleteHandler({
            key: "",
            input: "",
          });
          setDeleteModalOpen(false);
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

  const [fileUploadModalOpen, setFileUploadModalOpen] = useState(false);
  const [fileUploadCategoryDisplay, setFileUploadCategoryDisplay] =
    useState("");

  const [fileUploadValues, setFileUploadValues] = useState({
    file: "",
    category: "",
    asOf: "",
  });

  const handleUpload = () => {
    setLoading({ ...loading, upload: true });

    const { asOf, category, file } = fileUploadValues;

    const data = new FormData();
    //set form fields

    //basic fields
    data.set("asOf", asOf);
    data.set("category", category);
    data.set("file", file);

    //set form files
    createFile("", data)
      .then((data) => {
        setLoading({ ...loading, upload: false });
        setResponseMessage({
          ...responseMessage,
          uploadSuccess: data.message,
        });
        setFileUploadModalOpen(false);

        //reset form
        setFileUploadValues({
          file: "",
          category: "",
          asOf: "",
        });
      })
      .catch((e) => {
        setLoading({
          ...loading,
          upload: false,
        });
        setResponseMessage({
          ...responseMessage,
          uploadError: e.response.data.message,
        });

        //reset formx
      });
  };

  const handleFileUploadTextChange = (name) => (e) => {
    const value = e.target.value;
    setFileUploadValues({ ...fileUploadValues, [name]: value });
  };

  const handleFileUploadFileChange = (name) => (e) => {
    if (e.target.files[0]) {
      setFileUploadValues({
        ...fileUploadValues,
        [name]: e.target.files[0],
      });
    }
  };

  const showFileUploadingForm = () => {
    return (
      <Modal
        toggle={() => {
          setFileUploadModalOpen(!fileUploadModalOpen);
          setFileUploadValues({
            file: "",
            category: "",
            asOf: "",
          });
        }}
        isOpen={fileUploadModalOpen}
      >
        <ModalHeader>Upload File</ModalHeader>
        <ModalBody className="py-4">
          {showUploadErrorMessage()}
          <Row>
            <Col>
              <h3>Uploading file for {fileUploadCategoryDisplay}</h3>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  As of
                </label>
                <Input
                  value={fileUploadValues.asOf}
                  onChange={handleFileUploadTextChange("asOf")}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  onChange={handleFileUploadFileChange("file")}
                  type="file"
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
              setFileUploadModalOpen(false);
              setFileUploadValues({});
            }}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={handleUpload}>
            {loading.upload && (
              <Spinner color="white" size="sm" className="mr-2" />
            )}
            Upload File
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  const showUploadSuccessMessage = () =>
    responseMessage.uploadSuccess && (
      <UncontrolledAlert
        color="primary"
        onClick={() => {
          setResponseMessage({ ...responseMessage, uploadSuccess: "" });
        }}
      >
        <span className="alert-icon">
          <i className="ni ni-like-2" />
        </span>
        <span className="alert-text ml-1">{responseMessage.uploadSuccess}</span>
      </UncontrolledAlert>
    );

  const showUploadErrorMessage = () =>
    responseMessage.uploadError && (
      <UncontrolledAlert
        color="danger"
        onClick={() => {
          setResponseMessage({ ...responseMessage, uploadError: "" });
        }}
      >
        <span className="alert-icon">
          <i className="ni ni-like-2" />
        </span>
        <span className="alert-text ml-1">{responseMessage.uploadError}</span>
      </UncontrolledAlert>
    );

  //Component Views
  const showCategoryList = () => {
    return (
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th cope="col">Label</th>
            <th className="d-flex justify-content-end">Actions</th>
          </tr>
        </thead>
        <tbody className="list">{showParentsData()}</tbody>
      </Table>
    );
  };

  const showChildrenData = (id) => {
    const sorted = categoryList
      .filter((item) => item.parent == id)
      .sort((a, b) => {
        return a.order - b.order;
      });
    return sorted.map((item, index) => (
      <>
        <tr key={index}>
          <td
            style={{ paddingLeft: "45px", cursor: "pointer" }}
            onClick={() => {
              setFilesModalOpen(true);
              setFilesCatPicker(item._id);
            }}
          >
            {item.label}
          </td>
          <td className="d-flex justify-content-end">
            <Button
              size="sm"
              color="dark"
              onClick={() => {
                setFileUploadModalOpen(true);
                setFileUploadCategoryDisplay(item.label);
                setFileUploadValues({
                  ...fileUploadValues,
                  category: item._id,
                  asOf: new Date().toISOString().split("T")[0],
                });
              }}
            >
              Upload
            </Button>
            <Button
              size="sm"
              color="primary"
              className="px-3"
              onClick={() => {
                setUpdateFormModalOpen(true);
                const toUpdate = _.merge(updateValues, item);
                setUpdateValues(toUpdate);
              }}
            >
              Edit
            </Button>
            <Button
              size="sm"
              color="danger"
              outline
              onClick={() => {
                //TODOS: change key to slug for delete handler
                setDeleteHandler({ key: item.slug, input: "" });
                setDeleteModalOpen(true);
              }}
            >
              Delete
            </Button>
          </td>
        </tr>
      </>
    ));
  };

  const showParentsData = () => {
    const sorted = categoryList
      .filter((item) => item.parent == null)
      .sort((a, b) => {
        return a.order - b.order;
      });
    return sorted.map((item, index) => (
      <>
        <tr key={index}>
          <td
            style={{
              textTransform: "uppercase",
              fontWeight: "700",
              fontSize: "1rem",
            }}
          >
            {item.label}
          </td>
          <td className="d-flex justify-content-end">
            <Button
              size="sm"
              color="secondary"
              onClick={() => {
                setAddFormModalOpen(true);
                setFormValues({ ...formValues, parent: item._id });
              }}
            >
              Add child
            </Button>
            <Button
              size="sm"
              color="primary"
              className="px-3"
              onClick={() => {
                setUpdateFormModalOpen(true);
                const toUpdate = _.merge(updateValues, item);
                setUpdateValues(toUpdate);
              }}
            >
              Edit
            </Button>
            <Button
              size="sm"
              color="danger"
              outline
              onClick={() => {
                //TODOS: change key to slug for delete handler
                setDeleteHandler({ key: item.slug, input: "" });
                setDeleteModalOpen(true);
              }}
            >
              Delete
            </Button>
          </td>
        </tr>
        {showChildrenData(item._id)}
      </>
    ));
  };

  const [filesModalOpen, setFilesModalOpen] = useState(false);
  const [filesCatPicker, setFilesCatPicker] = useState("");
  
  return (
    <>
      {showAddForm()}
      {showUpdateForm()}
      {showDeleteConfirmation()}
      {showFileUploadingForm()}
      <FilesHandler
        isOpen={filesModalOpen}
        setIsOpen={setFilesModalOpen}
        category={filesCatPicker}
      />
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0 d-inline-block">Categories</h2>
          <Button
            size="sm"
            color="primary"
            onClick={() => {
              setAddFormModalOpen(true);
              setFormValues({});
            }}
          >
            + Add Category
          </Button>
        </CardHeader>
        <CardBody>
          {showSuccessMessage()}
          {showDeleteSuccessMessage()}
          {showUpdateSuccessMessage()}
          {showUploadSuccessMessage()}
          {categoryList.length > 0 ? (
            showCategoryList()
          ) : (
            <div className="mx-auto text-center">No categories found</div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default InvestorRelationsCategoryForm;
