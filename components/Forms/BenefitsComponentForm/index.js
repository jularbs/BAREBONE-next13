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
  createBenefit,
  getBenefitList,
  updateBenefit,
  removeBenefit,
} from "actions/benefit";

import { createOption, readOption } from "actions/option";

import { getLink } from "actions/media";
import _ from "lodash";

import { BENEFIT_HEADER_TEXT, BENEFIT_SUB_TEXT } from "constants.js";

const BenefitsComponentForm = () => {
  //Component States
  const [loading, setLoading] = useState({
    fetch: false,
    create: false,
    update: false,
    delete: false,
    update: false,
  });

  const [responseMessage, setResponseMessage] = useState({
    error: "",
    success: "",
    deleteError: "",
    deleteSuccess: "",
    updateError: "",
    updateSuccess: "",
  });

  const [previewImage, setPreviewImage] = useState({
    icon: "",
  });

  const [formValues, setFormValues] = useState({
    order: "",
    title: "",
  });

  const [headerText, setHeaderText] = useState("");
  const [headerSubtext, setHeaderSubtext] = useState("");

  const [addFormModalOpen, setAddFormModalOpen] = useState(false);

  const [benefitList, setBenefitList] = useState([]);

  //Component Lifecycles
  useEffect(() => {
    setLoading({ ...loading, fetch: true });
    getBenefitList().then((data) => {
      setLoading({ ...loading, fetch: false });
      setBenefitList(data.data);
    });
    readOption(BENEFIT_HEADER_TEXT).then((data) => {
      if (data.data) setHeaderText(data.data.value);
    });

    readOption(BENEFIT_SUB_TEXT).then((data) => {
      if (data.data) setHeaderSubtext(data.data.value);
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
    const { order, title, icon } = formValues;

    const data = new FormData();
    //set form fields

    //basic fields
    data.set("order", order);
    data.set("title", title);

    //set form files
    if (icon) data.set("icon", icon);

    createBenefit("", data)
      .then((data) => {
        setLoading({
          ...loading,
          create: false,
        });
        setAddFormModalOpen(false);
        setResponseMessage({ success: data.message, error: "" });
        setFormValues({});
        setPreviewImage({});
        setBenefitList([...benefitList, data.data]);
      })
      .catch((e) => {
        setLoading({
          ...loading,
          create: false,
        });
        setResponseMessage({ success: "", error: e.response.data.message });
      });
  };

  const showAddForm = () => {
    return (
      <Modal
        toggle={() => setAddFormModalOpen(!addFormModalOpen)}
        isOpen={addFormModalOpen}
      >
        <ModalHeader>Add Benefit</ModalHeader>
        <ModalBody className="py-4">
          {showErrorMessage()}
          <Row>
            <Col lg="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="order">
                  Order
                </label>
                <Input
                  value={formValues.order}
                  onChange={handleTextChange("order")}
                  type="number"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Title
                </label>
                <Input
                  value={formValues.title}
                  onChange={handleTextChange("title")}
                  type="text"
                />
              </FormGroup>
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex justify-content-between w-100">
                  <h3 className="d-inline ">Icon</h3>
                  <label className="btn btn-default btn-sm">
                    Choose file...
                    <Input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange("icon")}
                    />
                  </label>
                </div>
                <img
                  src={
                    previewImage.icon
                      ? previewImage.icon
                      : formValues.icon
                      ? getLink(formValues.icon)
                      : ""
                  }
                  style={{
                    maxWidth: "40px",
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
            Add Benefit
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

  const [updatePreviewImage, setUpdatePreviewImage] = useState({
    icon: "",
  });

  const handleUpdate = () => {
    setLoading({ ...loading, update: true });

    const data = new FormData();
    const { order, title, slug, icon } = updateValues;

    //set form fields
    data.set("slug", slug);

    //basic fields
    data.set("order", order);
    data.set("title", title);

    //socialmedia fields

    //set form files
    //if there is preview image, user added new image so add in formdata
    if (updatePreviewImage.icon) data.set("icon", icon);

    updateBenefit("", data)
      .then((data) => {
        setLoading({ ...loading, update: false });
        setResponseMessage({
          ...responseMessage,
          updateSuccess: data.message,
        });
        setUpdateFormModalOpen(false);

        //reset form
        setUpdatePreviewImage({ icon: "" });
        setUpdateValues({
          order: "",
          title: "",
          icon: "",
        });

        //remove old
        let newList = benefitList.filter(
          (item) => item.slug !== data.data.slug
        );
        //Add new
        setBenefitList([data.data, ...newList]);
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
        setUpdatePreviewImage({ icon: "" });
        setUpdateValues({
          order: "",
          title: "",
          icon: "",
          slug: "",
        });
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
          setUpdateValues({
            order: "",
            title: "",
            icon: "",
          });
          setUpdatePreviewImage({ icon: "" });
        }}
        isOpen={updateFormModalOpen}
      >
        <ModalHeader>Update Benefit</ModalHeader>
        <ModalBody className="py-4">
          {showUpdateErrorMessage()}
          <Row>
            <Col lg="12">
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
                  Title
                </label>
                <Input
                  value={updateValues.title}
                  onChange={handleUpdateTextChange("title")}
                  type="text"
                />
              </FormGroup>
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex justify-content-between w-100">
                  <h3 className="d-inline ">Icon</h3>
                  <label className="btn btn-default btn-sm">
                    Choose file...
                    <Input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleUpdateFileChange("icon")}
                    />
                  </label>
                </div>
                <img
                  src={
                    updatePreviewImage.icon
                      ? updatePreviewImage.icon
                      : updateValues.icon
                      ? getLink(updateValues.icon)
                      : ""
                  }
                  style={{
                    maxWidth: "40px",
                    width: "100%",
                    margin: "2rem 0",
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
              setUpdatePreviewImage({ icon: "" });
              setUpdateValues({
                order: "",
                title: "",
                icon: "",
              });
            }}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={handleUpdate}>
            {loading.update && (
              <Spinner color="white" size="sm" className="mr-2" />
            )}
            Update Benefit
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
          <h5 className="modal-title">Delete Benefit</h5>
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
              Type "DANGER" to permanently delete business.
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

    removeBenefit("", key)
      .then((data) => {
        setLoading({ ...loading, delete: false });
        if (data.status && data.status == "200") {
          //portrait is deleted
          setResponseMessage({
            ...responseMessage,
            deleteSuccess: data.message,
          });
          const newList = benefitList.filter(
            (item) => item.slug !== deleteHandler.key
          );
          setBenefitList(newList);
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
  const showBenefitList = () => {
    return (
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Order</th>
            <th cope="col">Name</th>
            <th scope="col">Icon</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="list">{showBenefitListData()}</tbody>
      </Table>
    );
  };

  const showBenefitListData = () => {
    const sorted = benefitList.sort((a, b) => {
      return a.order - b.order;
    });
    return sorted.map((item, index) => (
      <tr key={index}>
        <td>{item.order}</td>
        <td>{item.title}</td>
        <td>
          <img width="20px" height="auto" src={getLink(item.icon)}></img>
        </td>
        <td className="d-flex justify-content-end">
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

  const handleHeaderSubmit = (index) => (e) => {
    e.preventDefault();
    if (index == BENEFIT_HEADER_TEXT) {
      setLoading({ ...loading, headerText: true });
    } else if (index == BENEFIT_SUB_TEXT) {
      setLoading({ ...loading, headerSubtext: true });
    }

    //init FormValues to form data;
    const data = new FormData();

    //set form fields
    data.set("index", index);

    if (index == BENEFIT_HEADER_TEXT) {
      data.set("value", headerText);
    } else if (index == BENEFIT_SUB_TEXT) {
      data.set("value", headerSubtext);
    }

    createOption("", data)
      .then((data) => {
        if (index == BENEFIT_HEADER_TEXT) {
          setLoading({ ...loading, headerText: false });
        } else if (index == BENEFIT_SUB_TEXT) {
          setLoading({ ...loading, headerSubtext: false });
        }

        setResponseMessage({ success: data.message, error: "" });
      })
      .catch((e) => {
        if (index == BENEFIT_HEADER_TEXT) {
          setLoading({ ...loading, headerText: false });
        } else if (index == BENEFIT_SUB_TEXT) {
          setLoading({ ...loading, headerSubtext: false });
        }
        setResponseMessage({ success: "", error: e.response.data.message });
      });
  };
  return (
    <>
      {showAddForm()}
      {showUpdateForm()}
      {showDeleteConfirmation()}
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0 d-inline-block">Benefits Component Form</h2>
          <Button
            size="sm"
            color="primary"
            onClick={() => {
              setAddFormModalOpen(true);
            }}
          >
            + Add Benefit
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
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Header Text"
                value={headerText}
                onChange={(e) => {
                  setHeaderText(e.target.value);
                }}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleHeaderSubmit(BENEFIT_HEADER_TEXT)}
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
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Content"
                value={headerSubtext}
                onChange={(e) => {
                  setHeaderSubtext(e.target.value);
                }}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleHeaderSubmit(BENEFIT_SUB_TEXT)}
                >
                  {loading.headerSubtext && (
                    <Spinner color="white" size="sm" className="mr-2" />
                  )}
                  Update
                </button>
              </div>
            </div>
          </div>
          {benefitList.length > 0 ? (
            showBenefitList()
          ) : (
            <div className="mx-auto text-center">No Benefits found</div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default BenefitsComponentForm;
