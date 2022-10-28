import styles from "./InternshipHeroForm.module.scss";
import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  FormGroup,
  Input,
  Spinner,
  UncontrolledAlert,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";

import { useState, useEffect } from "react";
import { createHero } from "actions/hero";
import { getLink } from "actions/media";
import _ from "lodash";
import { readByLocation } from "actions/hero";

import { readOptions, createOption } from "actions/option";

import {
  INTERNSHIP_SHOWCASE_TILE_1,
  INTERNSHIP_SHOWCASE_TILE_2,
  INTERNSHIP_SHOWCASE_TILE_3,
  INTERNSHIP_SHOWCASE_TILE_4,
} from "constants.js";

const InternshipHeroForm = ({ formTitle, location, fields }) => {
  const [loading, setLoading] = useState({
    save: false,
    createShowcase: false,
  });
  const [responseMessage, setResponseMessage] = useState({
    error: "",
    success: "",
  });
  const [previewImage, setPreviewImage] = useState({
    background: "",
    icon: "",
  });

  const [formValues, setFormValues] = useState({});

  const [showcaseIndex, setShowcaseIndex] = useState([
    INTERNSHIP_SHOWCASE_TILE_1,
    INTERNSHIP_SHOWCASE_TILE_2,
    INTERNSHIP_SHOWCASE_TILE_3,
    INTERNSHIP_SHOWCASE_TILE_4,
  ]);

  const [showcaseList, setShowcaseList] = useState([]);

  useEffect(() => {
    readByLocation(location).then((data) => {
      if (data.data) setFormValues(data.data);
    });

    readOptions(showcaseIndex).then((data) => {
      setShowcaseList(data.data);
    });
  }, []);

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

  const handleSubmit = () => {
    setLoading({ ...loading, save: true });
    const { title, content, ctaText, ctaLink, background } = formValues;

    //init FormValues to form data;
    const data = new FormData();

    //set form fields
    data.set("title", title);
    data.set("content", content);
    data.set("ctaText", ctaText);
    data.set("ctaLink", ctaLink);
    data.set("heroLocation", location);

    //set form files
    if (background) data.set("background", background);

    createHero("", data)
      .then((data) => {
        setLoading({ ...loading, save: false });
        setResponseMessage({ success: data.message, error: "" });
      })
      .catch((e) => {
        setLoading({ ...loading, save: false });
        setResponseMessage({ success: "", error: e.response.data.message });
      });
  };

  const getShowcaseTile = (index) => {
    const filtered = showcaseList.filter((item) => item.index == index);

    return filtered[0];
  };

  const showShowcaseTiles = () => {
    return showcaseIndex.map((item, key) => {
      return (
        <div className={`${styles["showcase-item"]}`} key={key}>
          {getShowcaseTile(item) && (
            <img
              src={getLink(getShowcaseTile(item)?.media)}
              alt=""
              className={`${styles["showcase-icon"]}`}
            />
          )}

          <div className={`${styles["title"]}`}>{getShowcaseTile(item)?.value}</div>
          <div className={`${styles["description"]}`}>{getShowcaseTile(item)?.meta}</div>
          <div className={`${styles["control-wrapper"]}`}>
            <Button
              color="primary"
              onClick={() => {
                setShowcaseModalOpen(true);
                setShowcaseValues({ ...getShowcaseTile(item), index: item });
              }}
            >
              Edit Showcase
            </Button>
          </div>
        </div>
      );
    });
  };

  const [showcaseModalOpen, setShowcaseModalOpen] = useState(false);
  const [showcaseValues, setShowcaseValues] = useState({});

  const showAddShowcaseForm = () => {
    return (
      <Modal
        toggle={() => setShowcaseModalOpen(!showcaseModalOpen)}
        isOpen={showcaseModalOpen}
      >
        <ModalHeader>Manage Showcase</ModalHeader>
        <ModalBody className="p-0 px-4">
          <Row>
            <Col>
              <div className="d-flex flex-column align-items-center">
                <img
                  src={
                    previewImage.media
                      ? previewImage.media
                      : showcaseValues.media
                      ? getLink(showcaseValues.media)
                      : ""
                  }
                  style={{
                    width: "100px",
                    backgroundColor: "#0092dd",
                    padding: "1rem",
                  }}
                />
                <div className="d-flex justify-content-between w-100">
                  <label className="btn btn-outline-default btn-outline btn-block mt-2">
                    Choose file...
                    <Input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          let reader = new FileReader();
                          reader.onloadend = () => {
                            setPreviewImage({
                              ...previewImage,
                              media: reader.result,
                            });
                            setShowcaseValues({
                              ...showcaseValues,
                              media: e.target.files[0],
                            });
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Title
                </label>
                <Input
                  value={showcaseValues.value}
                  onChange={(e) => {
                    setShowcaseValues({
                      ...showcaseValues,
                      value: e.target.value,
                    });
                  }}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Content
                </label>
                <Input
                  value={showcaseValues.meta}
                  onChange={(e) => {
                    setShowcaseValues({
                      ...showcaseValues,
                      meta: e.target.value,
                    });
                  }}
                  type="textarea"
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
              setShowcaseModalOpen(false);
              setShowcaseValues({});
              setPreviewImage({});
            }}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmitShowcase}>
            {loading.saveShowcase && (
              <Spinner color="white" size="sm" className="mr-2" />
            )}
            Save Showcase
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  const handleSubmitShowcase = () => {
    setLoading({ ...loading, saveShowcase: true });
    const { index, value, media, meta } = showcaseValues;

    //init FormValues to form data;
    const data = new FormData();

    //set form fields
    data.set("index", index);
    data.set("value", value);
    data.set("meta", meta);
    if (previewImage.media) data.set("media", media);

    console.log(showcaseValues);
    createOption("", data)
      .then((data) => {
        setLoading({ ...loading, saveShowcase: false });
        setResponseMessage({ success: data.message, error: "" });
        setShowcaseValues({});
        setPreviewImage({});
        setShowcaseModalOpen(false);
        const filtered = showcaseList.filter(
          (item) => item.index !== data.data.index
        );
        setShowcaseList([...filtered, data.data]);
      })
      .catch((e) => {
        setLoading({ ...loading, saveShowcase: false });
        setResponseMessage({ success: "", error: e.response.data.message });
      });
  };

  return (
    <>
      {showAddShowcaseForm()}
      <Card>
        <CardHeader>
          <h2 className="mb-0">{formTitle}</h2>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg="6">
              <h3>Hero Contents</h3>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Title
                </label>
                <Input
                  placeholder="Title..."
                  value={formValues.title}
                  onChange={handleTextChange("title")}
                  type="textarea"
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Content
                </label>
                <Input
                  placeholder=""
                  type="textarea"
                  rows="2"
                  value={formValues.content}
                  onChange={handleTextChange("content")}
                />
              </FormGroup>
              <h3>Call To Action Button</h3>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Button Label
                </label>
                <Input
                  placeholder=""
                  type="text"
                  value={formValues.ctaText}
                  onChange={handleTextChange("ctaText")}
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Destination
                </label>
                <Input
                  placeholder=""
                  type="text"
                  value={formValues.ctaLink}
                  onChange={handleTextChange("ctaLink")}
                />
              </FormGroup>
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex justify-content-between w-100">
                  <h3 className="d-inline ">Background Image</h3>
                  <label className="btn btn-default btn-sm">
                    Choose file...
                    <Input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange("background")}
                    />
                  </label>
                </div>
                <img
                  src={
                    previewImage.background
                      ? previewImage.background
                      : formValues.background
                      ? getLink(formValues.background)
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
            <Col lg="6">
              <h3>Internship Showcase</h3>
              <div className={`${styles["form-internship-showcase-container"]}`}>
                <div className={`${styles["grid-container"]}`}>{showShowcaseTiles()}</div>
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          {showErrorMessage()}
          {showSuccessMessage()}
          <div className="d-flex align-items-center justify-content-between">
            <span>
              Last Updated: {formValues.updatedAt && formValues.updatedAt}
            </span>
            <div>
              <Button color="primary" onClick={handleSubmit}>
                {loading.save && (
                  <Spinner color="white" size="sm" className="mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default InternshipHeroForm;
