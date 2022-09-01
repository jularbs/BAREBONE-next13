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

import { createOption, readOption } from "actions/option";
import { COLLAB_HEADER_TEXT, COLLAB_SUB_TEXT } from "constants.js";

import {
  createCollaboration,
  updateCollaboration,
  getCollaborationList,
  removeCollaboration,
} from "actions/collaboration";

import { getLink } from "actions/media";
import _ from "lodash";

const CollaborationComponentForm = () => {
  //Component States
  const [loading, setLoading] = useState({
    fetch: false,
    create: false,
    update: false,
    delete: false,
    update: false,
    headerText: false,
    headerSubtext: false,
  });
  const [responseMessage, setResponseMessage] = useState({
    error: "",
    success: "",
    deleteError: "",
    deleteSuccess: "",
    updateError: "",
    updateSuccess: "",
  });

  const [previewImage, setPreviewImage] = useState({});

  const [formValues, setFormValues] = useState({});

  const [addFormModalOpen, setAddFormModalOpen] = useState(false);

  const [collaborationList, setCollaborationList] = useState([]);

  const [headerText, setHeaderText] = useState("");
  const [subText, setSubText] = useState("");

  //Component Lifecycles
  useEffect(() => {
    setLoading({ ...loading, fetch: true });
    getCollaborationList().then((data) => {
      setLoading({ ...loading, fetch: false });
      setCollaborationList(data.data);
    });

    readOption(COLLAB_HEADER_TEXT).then((data) => {
      if (data.data) setHeaderText(data.data.value);
    });

    readOption(COLLAB_SUB_TEXT).then((data) => {
      if (data.data) setSubText(data.data.value);
    });
  }, []);

  //Input Handlers
  const handleTextChange = (name) => (e) => {
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (name) => (e) => {
    if (e.target.files[0]) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage({ ...previewImage, [name]: reader.result });
        setFormValues({
          ...formValues,
          [name]: e.target.files[0],
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  //Create Handlers
  const handleSubmit = () => {
    setLoading({
      ...loading,
      create: true,
    });

    //destructure input
    const { order, company, campaign, content, videoSource, cover } =
      formValues;

    const data = new FormData();
    //set form fields

    //basic fields
    data.set("order", order);
    data.set("company", company);
    data.set("campaign", campaign);
    data.set("content", content);
    if (videoSource) data.set("videoSource", videoSource);
    if (cover) data.set("cover", cover);

    createCollaboration("", data)
      .then((data) => {
        setLoading({
          ...loading,
          create: false,
        });
        setAddFormModalOpen(false);
        setResponseMessage({ success: data.message, error: "" });
        setFormValues({});
        setPreviewImage({});
        setCollaborationList([...collaborationList, data.data]);
      })
      .catch((e) => {
        setLoading({
          ...loading,
          create: false,
        });
        setResponseMessage({ success: "", error: e.response.data.message });
      });
  };

  const handleHeaderSubmit = (index) => (e) => {
    e.preventDefault();
    if (index == COLLAB_HEADER_TEXT) {
      setLoading({ ...loading, headerText: true });
    } else if (index == COLLAB_SUB_TEXT) {
      setLoading({ ...loading, headerSubtext: true });
    }

    //init FormValues to form data;
    const data = new FormData();

    //set form fields
    data.set("index", index);

    if (index == COLLAB_HEADER_TEXT) {
      data.set("value", headerText);
    } else if (index == COLLAB_SUB_TEXT) {
      data.set("value", subText);
    }

    createOption("", data)
      .then((data) => {
        if (index == COLLAB_HEADER_TEXT) {
          setLoading({ ...loading, headerText: false });
        } else if (index == COLLAB_SUB_TEXT) {
          setLoading({ ...loading, headerSubtext: false });
        }

        setResponseMessage({ success: data.message, error: "" });
      })
      .catch((e) => {
        if (index == COLLAB_HEADER_TEXT) {
          setLoading({ ...loading, headerText: false });
        } else if (index == COLLAB_SUB_TEXT) {
          setLoading({ ...loading, headerSubtext: false });
        }
        setResponseMessage({ success: "", error: e.response.data.message });
      });
  };

  const showAddForm = () => {
    return (
      <Modal
        toggle={() => setAddFormModalOpen(!addFormModalOpen)}
        isOpen={addFormModalOpen}
      >
        <ModalHeader>Add Collaboration</ModalHeader>
        <ModalBody className="py-4">
          {showErrorMessage()}
          <Row>
            <Col>
              <h3>Collaboration Details</h3>
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
                  Company Name
                </label>
                <Input
                  value={formValues.company}
                  onChange={handleTextChange("company")}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Campaign Name
                </label>
                <Input
                  value={formValues.campaign}
                  onChange={handleTextChange("campaign")}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Content
                </label>
                <Input
                  value={formValues.content}
                  onChange={handleTextChange("content")}
                  type="textarea"
                  rows="10"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Video Source URL
                </label>
                <Input
                  value={formValues.videoSource}
                  onChange={handleTextChange("videoSource")}
                  type="text"
                />
              </FormGroup>
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex justify-content-between w-100">
                  <h3 className="d-inline ">Cover Image</h3>
                  <label className="btn btn-default btn-sm">
                    Choose file...
                    <Input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange("cover")}
                    />
                  </label>
                </div>
                <img
                  src={
                    previewImage.cover
                      ? previewImage.cover
                      : formValues.cover
                      ? getLink(formValues.cover)
                      : ""
                  }
                  style={{
                    maxWidth: "200px",
                    width: "100%",
                    margin: "2rem 0",
                    backgroundColor: "#ECECEC",
                  }}
                />
              </div>
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
            Add Collaboration
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

  const [updateValues, setUpdateValues] = useState({});

  const [updatePreviewImage, setUpdatePreviewImage] = useState({});

  const handleUpdate = () => {
    setLoading({ ...loading, update: true });

    const data = new FormData();
    const { slug, order, company, campaign, content, cover, videoSource } =
      updateValues;

    //set form fields
    data.set("slug", slug);

    //basic fields
    data.set("order", order);
    data.set("company", company);
    data.set("campaign", campaign);
    data.set("content", content);
    data.set("videoSource", videoSource);

    //set form files
    //if there is preview image, user added new image so add in formdata
    if (updatePreviewImage.cover) data.set("cover", updateValues.cover);

    updateCollaboration("", data)
      .then((data) => {
        setLoading({ ...loading, update: false });
        setResponseMessage({
          ...responseMessage,
          updateSuccess: data.message,
        });
        setUpdateFormModalOpen(false);

        //reset form
        setUpdatePreviewImage({});
        setUpdateValues({});

        //remove old
        let newList = collaborationList.filter(
          (item) => item.slug !== data.data.slug
        );
        //Add new
        setCollaborationList([data.data, ...newList]);
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

        //reset form
        setUpdatePreviewImage({});
        setUpdateValues({});
      });
  };

  const handleUpdateTextChange = (name) => (e) => {
    const value = e.target.value;
    setUpdateValues({ ...updateValues, [name]: value });
  };

  const handleUpdateFileChange = (name) => (e) => {
    if (e.target.files[0]) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setUpdatePreviewImage({
          ...updatePreviewImage,
          [name]: reader.result,
        });
        setUpdateValues({
          ...updateValues,
          [name]: e.target.files[0],
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const showUpdateForm = () => {
    return (
      <Modal
        toggle={() => {
          setUpdateFormModalOpen(!updateFormModalOpen);
          setUpdateValues({});
          setUpdatePreviewImage({});
        }}
        isOpen={updateFormModalOpen}
      >
        <ModalHeader>Update Collaboration</ModalHeader>
        <ModalBody className="py-4">
          {showUpdateErrorMessage()}
          <Row>
            <Col>
              <h3>Collaboration Details</h3>
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
                  Company Name
                </label>
                <Input
                  value={updateValues.company}
                  onChange={handleUpdateTextChange("company")}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Campaign Name
                </label>
                <Input
                  value={updateValues.campaign}
                  onChange={handleUpdateTextChange("campaign")}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Content
                </label>
                <Input
                  value={updateValues.content}
                  onChange={handleUpdateTextChange("content")}
                  type="textarea"
                  rows="10"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Video Source URL
                </label>
                <Input
                  value={updateValues.videoSource}
                  onChange={handleUpdateTextChange("videoSource")}
                  type="text"
                />
              </FormGroup>
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex justify-content-between w-100">
                  <h3 className="d-inline ">Cover Image</h3>
                  <label className="btn btn-default btn-sm">
                    Choose file...
                    <Input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleUpdateFileChange("cover")}
                    />
                  </label>
                </div>
                <img
                  src={
                    updatePreviewImage.cover
                      ? updatePreviewImage.cover
                      : updateValues.cover
                      ? getLink(updateValues.cover)
                      : ""
                  }
                  style={{
                    maxWidth: "200px",
                    width: "100%",
                    margin: "2rem 0",
                    backgroundColor: "#ECECEC",
                  }}
                />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            outline
            className="px-5"
            onClick={() => {
              setUpdateFormModalOpen(false);
              setUpdatePreviewImage({});
              setUpdateValues({});
            }}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={handleUpdate}>
            {loading.update && (
              <Spinner color="white" size="sm" className="mr-2" />
            )}
            Update Collaboration
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
          <h5 className="modal-title">Delete Collaboration</h5>
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
              Type "DANGER" to permanently delete Collaboration.
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

    removeCollaboration("", key)
      .then((data) => {
        setLoading({ ...loading, delete: false });
        if (data.status && data.status == "200") {
          //portrait is deleted
          setResponseMessage({
            ...responseMessage,
            deleteSuccess: data.message,
          });
          const newList = collaborationList.filter(
            (item) => item.slug !== deleteHandler.key
          );
          setCollaborationList(newList);
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

  //Component Views
  const showCollaborationList = () => {
    return (
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Order</th>
            <th cope="col">Company</th>
            <th cope="col">Campaign Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="list">{showCollaborationListData()}</tbody>
      </Table>
    );
  };

  const showCollaborationListData = () => {
    const sorted = collaborationList.sort((a, b) => {
      return a.order - b.order;
    });
    return sorted.map((item, index) => (
      <tr key={index}>
        <td>{item.order}</td>
        <td>{item.company}</td>
        <td>{item.campaign}</td>
        <td className="text-right">
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
        </td>
      </tr>
    ));
  };

  return (
    <>
      {showAddForm()}
      {showUpdateForm()}
      {showDeleteConfirmation()}
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0 d-inline-block">Collaborations Showcase</h2>
          <Button
            size="sm"
            color="primary"
            onClick={() => {
              setAddFormModalOpen(true);
            }}
          >
            + Add Collaboration
          </Button>
        </CardHeader>
        <CardBody>
          {showSuccessMessage()}
          {showDeleteSuccessMessage()}
          {showUpdateSuccessMessage()}
          <div className="mb-4">
            <label className="form-control-label" htmlFor="title">
              Header Text
            </label>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Metric Header"
                value={headerText}
                onChange={(e) => {
                  setHeaderText(e.target.value);
                }}
              />
              <div class="input-group-append">
                <button
                  class="btn btn-primary"
                  type="button"
                  onClick={handleHeaderSubmit(COLLAB_HEADER_TEXT)}
                >
                  {loading.headerText && (
                    <Spinner color="white" size="sm" className="mr-2" />
                  )}
                  Update
                </button>
              </div>
            </div>
            <label className="form-control-label" htmlFor="title">
              Header Subtext
            </label>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Content"
                value={subText}
                onChange={(e) => {
                  setSubText(e.target.value);
                }}
              />
              <div class="input-group-append">
                <button
                  class="btn btn-primary"
                  type="button"
                  onClick={handleHeaderSubmit(COLLAB_SUB_TEXT)}
                >
                  {loading.headerSubtext && (
                    <Spinner color="white" size="sm" className="mr-2" />
                  )}
                  Update
                </button>
              </div>
            </div>
          </div>
          <label className="form-control-label" htmlFor="title">
            Data
          </label>
          {collaborationList.length > 0 ? (
            showCollaborationList()
          ) : (
            <div className="mx-auto text-center">No collaborations found</div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default CollaborationComponentForm;
