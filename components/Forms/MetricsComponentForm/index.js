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
  getMetricList,
  createMetric,
  updateMetric,
  removeMetric,
} from "actions/metric";

import { createOption, readOption } from "actions/option";

import _ from "lodash";

import { HERO_METRIC_HEADER, HERO_METRIC_SUBTEXT } from "constants.js";
const MetricsComponentForm = () => {
  //Component States
  const [loading, setLoading] = useState({
    fetch: false,
    create: false,
    update: false,
    delete: false,
    update: false,
    headertext: false,
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

  const [formValues, setFormValues] = useState({
    order: "",
    label: "",
    figures: "",
    URL: "",
  });

  const [headerText, setHeaderText] = useState("");
  const [headerSubtext, setHeaderSubtext] = useState("");

  const [addFormModalOpen, setAddFormModalOpen] = useState(false);

  const [metricList, setMetricList] = useState([]);

  //Component Lifecycles
  useEffect(() => {
    setLoading({ ...loading, fetch: true });
    getMetricList().then((data) => {
      setLoading({ ...loading, fetch: false });
      setMetricList(data.data);
    });

    readOption(HERO_METRIC_HEADER).then((data) => {
      if (data.data) setHeaderText(data.data.value);
    });

    readOption(HERO_METRIC_SUBTEXT).then((data) => {
      if (data.data) setHeaderSubtext(data.data.value);
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

    createMetric("", formValues)
      .then((data) => {
        console.log("THEN: ", data);
        setLoading({
          ...loading,
          create: false,
        });
        setAddFormModalOpen(false);
        setResponseMessage({ success: data.message, error: "" });
        setFormValues({
          order: "",
          label: "",
          figures: "",
          suffix: "",
        });
        setMetricList([...metricList, data.data]);
      })
      .catch((e) => {
        console.log("CATCH: ", e);
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
        // className="add-portrait-modal"
      >
        <ModalHeader>Add Metric</ModalHeader>
        <ModalBody className="py-4">
          {showErrorMessage()}
          <Row>
            <Col>
              <h3>Metric Details</h3>
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
              <Row>
                <Col sm="6" lg="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="title">
                      Figures
                    </label>
                    <Input
                      value={formValues.figures}
                      onChange={handleTextChange("figures")}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" lg="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="title">
                      Suffix
                    </label>
                    <Input
                      value={formValues.suffix}
                      onChange={handleTextChange("suffix")}
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
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
            Add Metric
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
    figures: "",
    suffix: "",
  });

  const handleUpdate = () => {
    setLoading({ ...loading, update: true });

    updateMetric("", updateValues)
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
          figures: "",
          suffix: "",
          slug: "",
        });

        //remove old
        let newList = metricList.filter((item) => item.slug !== data.data.slug);
        //Add new
        setMetricList([data.data, ...newList]);
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
        setUpdateValues({
          order: "",
          label: "",
          suffix: "",
          figures: "",
          slug: "",
        });
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
            figures: "",
            suffix: "",
          });
        }}
        isOpen={updateFormModalOpen}
      >
        <ModalHeader>Update Metric</ModalHeader>
        <ModalBody className="py-4">
          {showUpdateErrorMessage()}
          <Row>
            <Col>
              <h3>Metric Details</h3>
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
              <Row>
                <Col sm="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="title">
                      Figures
                    </label>
                    <Input
                      value={updateValues.figures}
                      onChange={handleUpdateTextChange("figures")}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="title">
                      Suffix
                    </label>
                    <Input
                      value={updateValues.suffix}
                      onChange={handleUpdateTextChange("suffix")}
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            outline
            className="px-5"
            onClick={() => {
              setUpdateFormModalOpen(false);
              setUpdateValues({
                order: "",
                label: "",
                figures: "",
                suffix: "",
              });
            }}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={handleUpdate}>
            {loading.update && (
              <Spinner color="white" size="sm" className="mr-2" />
            )}
            Update Metric
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

    removeMetric("", key)
      .then((data) => {
        setLoading({ ...loading, delete: false });
        if (data.status && data.status == "200") {
          //portrait is deleted
          setResponseMessage({
            ...responseMessage,
            deleteSuccess: data.message,
          });
          const newList = metricList.filter(
            (item) => item.slug !== deleteHandler.key
          );
          setMetricList(newList);
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
  const showMetricList = () => {
    return (
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Order</th>
            <th cope="col">Label</th>
            <th scope="col">Figures</th>
            <th scope="col">Suffix</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="list">{showMetricData()}</tbody>
      </Table>
    );
  };

  const showMetricData = () => {
    const sorted = metricList.sort((a, b) => {
      return a.order - b.order;
    });
    return sorted.map((item, index) => (
      <tr key={index}>
        <td>{item.order}</td>
        <td>{item.label}</td>
        <td>{item.figures}</td>
        <td>{item.suffix}</td>
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
    if (index == HERO_METRIC_HEADER) {
      setLoading({ ...loading, headerText: true });
    } else if (index == HERO_METRIC_SUBTEXT) {
      setLoading({ ...loading, headerSubtext: true });
    }

    //init FormValues to form data;
    const data = new FormData();

    //set form fields
    data.set("index", index);

    if (index == HERO_METRIC_HEADER) {
      data.set("value", headerText);
    } else if (index == HERO_METRIC_SUBTEXT) {
      data.set("value", headerSubtext);
    }

    createOption("", data)
      .then((data) => {
        if (index == HERO_METRIC_HEADER) {
          setLoading({ ...loading, headerText: false });
        } else if (index == HERO_METRIC_SUBTEXT) {
          setLoading({ ...loading, headerSubtext: false });
        }

        setResponseMessage({ success: data.message, error: "" });
      })
      .catch((e) => {
        if (index == HERO_METRIC_HEADER) {
          setLoading({ ...loading, headerText: false });
        } else if (index == HERO_METRIC_SUBTEXT) {
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
          <h2 className="mb-0 d-inline-block">Metrics Component</h2>
          <Button
            size="sm"
            color="primary"
            onClick={() => {
              setAddFormModalOpen(true);
            }}
            style={{ float: "right" }}
          >
            + Add Metric
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
                  onClick={handleHeaderSubmit(HERO_METRIC_HEADER)}
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
                value={headerSubtext}
                onChange={(e) => {
                  setHeaderSubtext(e.target.value);
                }}
              />
              <div class="input-group-append">
                <button
                  class="btn btn-primary"
                  type="button"
                  onClick={handleHeaderSubmit(HERO_METRIC_SUBTEXT)}
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
          {metricList.length > 0 ? (
            showMetricList()
          ) : (
            <div className="mx-auto text-center">No metrics found</div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default MetricsComponentForm;
