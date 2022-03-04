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
  createPortrait,
  getPortraitListByGroupLocation,
  removePortrait,
  updatePortrait,
} from "actions/portrait";
import { getLink } from "actions/media";
import _ from "lodash";

const PortraitCardForm = ({ label, location, group }) => {
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
    image: "",
    logo: "",
  });

  const [formValues, setFormValues] = useState({
    location: location,
    group: group,
    order: "",
    name: "",
    description: "",
    facebookURL: "",
    twitterURL: "",
    instagramURL: "",
    youtubeURL: "",
    tiktokURL: "",
    bigoLiveURL: "",
  });

  const [addFormModalOpen, setAddFormModalOpen] = useState(false);

  const [portraitList, setPortraitList] = useState([
    {
      order: 1,
      name: "Fred Elizalde",
      position: "Chairman",
    },
    { order: 2, name: "Juan Elizadle", position: "VP-FM Operations" },
  ]);

  //Component Lifecycles
  useEffect(() => {
    setLoading({ ...loading, fetch: true });
    getPortraitListByGroupLocation({ group: group, location: location }).then(
      (data) => {
        setLoading({ ...loading, fetch: false });
        setPortraitList(data.data);
      }
    );
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
    const { location, group, order, name, position, description, logo, image } =
      formValues;

    const data = new FormData();
    //set form fields
    data.set("location", location);
    data.set("group", group);

    //basic fields
    data.set("order", order);
    data.set("name", name);
    data.set("position", position);
    data.set("description", description);

    //socialmedia fields
    const {
      facebookURL,
      twitterURL,
      instagramURL,
      youtubeURL,
      tiktokURL,
      bigoLiveURL,
    } = formValues;

    if (facebookURL) data.set("facebookURL", facebookURL);
    if (twitterURL) data.set("twitterURL", twitterURL);
    if (instagramURL) data.set("instagramURL", instagramURL);
    if (youtubeURL) data.set("youtubeURL", youtubeURL);
    if (tiktokURL) data.set("tiktokURL", tiktokURL);
    if (bigoLiveURL) data.set("bigoLiveURL", bigoLiveURL);

    //set form files
    if (logo) data.set("logo", logo);
    if (image) data.set("image", image);

    createPortrait("", data)
      .then((data) => {
        setLoading({
          ...loading,
          create: false,
        });
        setAddFormModalOpen(false);
        setResponseMessage({ success: data.message, error: "" });
        setFormValues({
          location: location,
          group: group,
          order: "",
          name: "",
          description: "",
          facebookURL: "",
          twitterURL: "",
          instagramURL: "",
          youtubeURL: "",
          tiktokURL: "",
          bigoLiveURL: "",
        });
        setPreviewImage({
          image: "",
          logo: "",
        });
        setPortraitList([...portraitList, data.data]);
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
        className="add-portrait-modal"
      >
        <ModalHeader>Add Portrait Card</ModalHeader>
        <ModalBody className="py-4">
          {showErrorMessage()}
          <Row>
            <Col lg="6">
              <h3>Portrait Details</h3>
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
              <Row>
                <Col>
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
                </Col>
                <Col>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="title">
                      Position
                    </label>
                    <Input
                      value={formValues.position}
                      onChange={handleTextChange("position")}
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Description
                </label>
                <Input
                  placeholder=""
                  type="textarea"
                  rows="5"
                  value={formValues.description}
                  onChange={handleTextChange("description")}
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex justify-content-between w-100">
                  <h3 className="d-inline ">Portrait Image</h3>
                  <label className="btn btn-default btn-sm">
                    Choose file...
                    <Input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange("image")}
                    />
                  </label>
                </div>
                <img
                  src={
                    previewImage.image
                      ? previewImage.image
                      : formValues.image
                      ? getLink(formValues.image)
                      : ""
                  }
                  style={{
                    maxWidth: "200px",
                    width: "100%",
                    margin: "2rem 0",
                    backgroundColor: "#ECECEC",
                  }}
                />
                <div className="d-flex justify-content-between w-100">
                  <h3 className="d-inline ">Logo Placement</h3>
                  <label className="btn btn-default btn-sm">
                    Choose file...
                    <Input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange("logo")}
                    />
                  </label>
                </div>
                <img
                  src={
                    previewImage.logo
                      ? previewImage.logo
                      : formValues.logo
                      ? getLink(formValues.logo)
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
          <h3>Social Media Links</h3>
          <Row>
            <Col lg="4" sm="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Facebook
                </label>
                <Input
                  value={formValues.facebook}
                  onChange={handleTextChange("facebookURL")}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Tiktok
                </label>
                <Input
                  value={formValues.tiktok}
                  onChange={handleTextChange("tiktokURL")}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col lg="4" sm="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Twitter
                </label>
                <Input
                  value={formValues.twitter}
                  onChange={handleTextChange("twitterURL")}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Instagram
                </label>
                <Input
                  value={formValues.instagram}
                  onChange={handleTextChange("instagramURL")}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col lg="4" sm="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Youtube
                </label>
                <Input
                  value={formValues.youtube}
                  onChange={handleTextChange("youtubeURL")}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Bigo Live
                </label>
                <Input
                  value={formValues.bigoLive}
                  onChange={handleTextChange("bigoLiveURL")}
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
              setAddFormModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            {loading.create && (
              <Spinner color="white" size="sm" className="mr-2" />
            )}
            Add Portrait
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
    location: "",
    group: "",
    order: "",
    name: "",
    description: "",
    facebookURL: "",
    twitterURL: "",
    instagramURL: "",
    youtubeURL: "",
    tiktokURL: "",
    bigoLiveURL: "",
    logo: "",
    image: "",
  });

  const [updatePreviewImage, setUpdatePreviewImage] = useState({
    image: "",
    logo: "",
  });

  const handleUpdate = () => {
    setLoading({ ...loading, update: true });

    const data = new FormData();
    const { slug, location, group, order, name, position, description } =
      updateValues;

    //set form fields
    data.set("slug", slug);
    data.set("location", location);
    data.set("group", group);

    //basic fields
    data.set("order", order);
    data.set("name", name);
    data.set("position", position);
    data.set("description", description);

    //socialmedia fields
    const {
      facebookURL,
      twitterURL,
      instagramURL,
      youtubeURL,
      tiktokURL,
      bigoLiveURL,
    } = updateValues;

    if (facebookURL) data.set("facebookURL", facebookURL);
    if (twitterURL) data.set("twitterURL", twitterURL);
    if (instagramURL) data.set("instagramURL", instagramURL);
    if (youtubeURL) data.set("youtubeURL", youtubeURL);
    if (tiktokURL) data.set("tiktokURL", tiktokURL);
    if (bigoLiveURL) data.set("bigoLiveURL", bigoLiveURL);

    //set form files
    //if there is preview image, user added new image so add in formdata
    const { image, logo } = updatePreviewImage;
    if (logo) data.set("logo", updateValues.logo);
    if (image) data.set("image", updateValues.image);

    updatePortrait("", data)
      .then((data) => {
        setLoading({ ...loading, update: false });
        setResponseMessage({
          ...responseMessage,
          updateSuccess: data.message,
        });
        setUpdateFormModalOpen(false);

        //reset form
        setUpdatePreviewImage({ image: "", logo: "" });
        setUpdateValues({
          location: "",
          group: "",
          order: "",
          name: "",
          description: "",
          facebookURL: "",
          twitterURL: "",
          instagramURL: "",
          youtubeURL: "",
          tiktokURL: "",
          bigoLiveURL: "",
          logo: "",
          image: "",
          slug: "",
        });

        //remove old
        let newList = portraitList.filter((item) => item.slug !== data.data.slug);
        //Add new
        setPortraitList([data.data, ...newList]);
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
        setUpdatePreviewImage({ image: "", logo: "" });
        setUpdateValues({
          location: "",
          group: "",
          order: "",
          name: "",
          description: "",
          facebookURL: "",
          twitterURL: "",
          instagramURL: "",
          youtubeURL: "",
          tiktokURL: "",
          bigoLiveURL: "",
          logo: "",
          image: "",
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
            location: "",
            group: "",
            order: "",
            name: "",
            description: "",
            facebookURL: "",
            twitterURL: "",
            instagramURL: "",
            youtubeURL: "",
            tiktokURL: "",
            bigoLiveURL: "",
            logo: "",
            image: "",
          });
          setUpdatePreviewImage({ image: "", logo: "" });
        }}
        isOpen={updateFormModalOpen}
        className="add-portrait-modal"
      >
        <ModalHeader>Update Portrait Card</ModalHeader>
        <ModalBody className="py-4">
          {showUpdateErrorMessage()}
          <Row>
            <Col lg="6">
              <h3>Portrait Details</h3>
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
              <Row>
                <Col>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="title">
                      Name
                    </label>
                    <Input
                      value={updateValues.name}
                      onChange={handleUpdateTextChange("name")}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="title">
                      Position
                    </label>
                    <Input
                      value={updateValues.position}
                      onChange={handleUpdateTextChange("position")}
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Description
                </label>
                <Input
                  placeholder=""
                  type="textarea"
                  rows="5"
                  value={updateValues.description}
                  onChange={handleUpdateTextChange("description")}
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex justify-content-between w-100">
                  <h3 className="d-inline ">Portrait Image</h3>
                  <label className="btn btn-default btn-sm">
                    Choose file...
                    <Input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleUpdateFileChange("image")}
                    />
                  </label>
                </div>
                <img
                  src={
                    updatePreviewImage.image
                      ? updatePreviewImage.image
                      : updateValues.image
                      ? getLink(updateValues.image)
                      : ""
                  }
                  style={{
                    maxWidth: "200px",
                    width: "100%",
                    margin: "2rem 0",
                    backgroundColor: "#ECECEC",
                  }}
                />
                <div className="d-flex justify-content-between w-100">
                  <h3 className="d-inline ">Logo Placement</h3>
                  <label className="btn btn-default btn-sm">
                    Choose file...
                    <Input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleUpdateFileChange("logo")}
                    />
                  </label>
                </div>
                <img
                  src={
                    updatePreviewImage.logo
                      ? updatePreviewImage.logo
                      : updateValues.logo
                      ? getLink(updateValues.logo)
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
          <h3>Social Media Links</h3>
          <Row>
            <Col lg="4" sm="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Facebook
                </label>
                <Input
                  value={updateValues.facebookURL}
                  onChange={handleUpdateTextChange("facebookURL")}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Tiktok
                </label>
                <Input
                  value={updateValues.tiktokURL}
                  onChange={handleUpdateTextChange("tiktokURL")}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col lg="4" sm="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Twitter
                </label>
                <Input
                  value={updateValues.twitterURL}
                  onChange={handleUpdateTextChange("twitterURL")}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Instagram
                </label>
                <Input
                  value={updateValues.instagramURL}
                  onChange={handleUpdateTextChange("instagramURL")}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col lg="4" sm="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Youtube
                </label>
                <Input
                  value={updateValues.youtubeURL}
                  onChange={handleUpdateTextChange("youtubeURL")}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Bigo Live
                </label>
                <Input
                  value={updateValues.bigoLiveURL}
                  onChange={handleUpdateTextChange("bigoLiveURL")}
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
              setUpdateFormModalOpen(false);
              setUpdatePreviewImage({ image: "", logo: "" });
              setUpdateValues({
                location: "",
                group: "",
                order: "",
                name: "",
                description: "",
                facebookURL: "",
                twitterURL: "",
                instagramURL: "",
                youtubeURL: "",
                tiktokURL: "",
                bigoLiveURL: "",
                logo: "",
                image: "",
              });
            }}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={handleUpdate}>
            {loading.update && (
              <Spinner color="white" size="sm" className="mr-2" />
            )}
            Update Portrait
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
          <h5 className="modal-title">Delete Portrait</h5>
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
              Type "DANGER" to permanently delete portrait card.
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

    removePortrait("", key)
      .then((data) => {
        setLoading({ ...loading, delete: false });
        if (data.status && data.status == "200") {
          //portrait is deleted
          setResponseMessage({
            ...responseMessage,
            deleteSuccess: data.message,
          });
          const newList = portraitList.filter(
            (item) => item.slug !== deleteHandler.key
          );
          setPortraitList(newList);
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
  const showPortaitListTable = () => {
    return (
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Order</th>
            <th cope="col">Name</th>
            <th scope="col">Position</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="list">{showPortraitListData()}</tbody>
      </Table>
    );
  };

  const showPortraitListData = () => {
    return portraitList.map((item, index) => (
      <tr key={index}>
        <td>{item.order}</td>
        <td>{item.name}</td>
        <td>{item.position}</td>
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

  return (
    <>
      {showAddForm()}
      {showUpdateForm()}
      {showDeleteConfirmation()}
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0 d-inline-block">{label}</h2>
          <Button
            size="sm"
            color="primary"
            onClick={() => {
              setAddFormModalOpen(true);
            }}
          >
            + Add Portrait Card
          </Button>
        </CardHeader>
        <CardBody>
          {showSuccessMessage()}
          {showDeleteSuccessMessage()}
          {showUpdateSuccessMessage()}
          {portraitList.length > 0 ? (
            showPortaitListTable()
          ) : (
            <div className="mx-auto text-center">No portrait cards found</div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default PortraitCardForm;
