import "./styles.scss";

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
import { getLink } from "actions/media";
import { readOptions, createOption, readOption } from "actions/option";
import _ from "lodash";

import {
  OUR_STORY_GALLERY_TILES_1,
  OUR_STORY_GALLERY_TILES_2,
  OUR_STORY_GALLERY_TILES_3,
  OUR_STORY_GALLERY_TILES_4,
  OUR_STORY_GALLERY_TILES_5,
  OUR_STORY_GALLERY_TILES_6,
  OUR_STORY_GALLERY_DESCRIPTION,
} from "constants.js";

const OurStoryGalleryForm = ({}) => {
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
  });

  const [formValues, setFormValues] = useState({});

  const [optionIndex, setOptionIndex] = useState([
    OUR_STORY_GALLERY_TILES_1,
    OUR_STORY_GALLERY_TILES_2,
    OUR_STORY_GALLERY_TILES_3,
    OUR_STORY_GALLERY_TILES_4,
    OUR_STORY_GALLERY_TILES_5,
    OUR_STORY_GALLERY_TILES_6,
  ]);

  const [optionValues, setOptionValues] = useState([]);
  const [description, setDescription] = useState({});

  //Component Lifecycles
  useEffect(() => {
    setLoading({ ...loading, fetch: true });
    readOptions(optionIndex).then((data) => {
      setLoading({ ...loading, fetch: false });
      setOptionValues(data.data);
    });

    readOption(OUR_STORY_GALLERY_DESCRIPTION).then((data) => {
      setDescription(data.data);
    });
  }, []);

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

  const handleUpload = () => {
    setLoading({ ...loading, create: true });
    const { index, image } = formValues;
    //init FormValues to form data;
    const data = new FormData();

    //set form fields
    data.set("index", index);
    if (previewImage.image) data.set("media", image);

    createOption("", data)
      .then((data) => {
        setLoading({ ...loading, create: false });
        setResponseMessage({ success: data.message, error: "" });
        setPreviewImage({});
        setFormValues({});
        setUploadModalOpen(false);

        const filtered = optionValues.filter(
          (item) => item.index !== data.data.index
        );

        setOptionValues([...filtered, data.data]);
      })
      .catch((e) => {
        setLoading(false);
        setResponseMessage({ success: "", error: e.response.data.message });
      });
  };

  const handleDescription = () => {
    setLoading({ ...loading, update: true });
    const { value } = description;
    //init FormValues to form data;
    const data = new FormData();

    // set form fields
    data.set("index", OUR_STORY_GALLERY_DESCRIPTION);
    data.set("value", value);

    createOption("", data)
      .then((data) => {
        setLoading({ ...loading, update: false });
        setResponseMessage({ success: data.message, error: "" });
      })

      .catch((e) => {
        setLoading({ ...loading, update: false });
        setResponseMessage({ success: "", error: e.response.data.message });
      });
  };

  const getDisplayImage = (index) => {
    const filtered = optionValues.filter((item) => item.index == index);

    return filtered[0]?.media;
  };

  const showTiles = () => {
    return optionIndex.map((item, key) => {
      return (
        <div
          className={`tile-item ${key == 0 || key == 5 ? "span-2" : ""}`}
          key={key}
          style={{
            backgroundImage: `url(${
              getDisplayImage(item) ? getLink(getDisplayImage(item)) : ""
            })`,
          }}
        >
          <div className="label">{key + 1}</div>

          <div className="control-container">
            <button
              className="btn btn-primary"
              onClick={() => {
                setUploadModalOpen(true);
                setFormValues({ ...formValues, index: item });
              }}
            >
              Change Photo
            </button>
          </div>
        </div>
      );
    });
  };

  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const showAddForm = () => {
    return (
      <Modal
        toggle={() => setUploadModalOpen(!uploadModalOpen)}
        isOpen={uploadModalOpen}
      >
        <ModalHeader>Upload Image</ModalHeader>
        <ModalBody className="p-0 px-4">
          <Row>
            <Col>
              <div className="d-flex flex-column align-items-center">
                <img
                  src={
                    previewImage.image
                      ? previewImage.image
                      : formValues.image
                      ? getLink(formValues.image)
                      : ""
                  }
                  style={{
                    width: "100%",
                  }}
                />
                <div className="d-flex justify-content-between w-100">
                  <label className="btn btn-outline-default btn-outline btn-block mt-2">
                    Choose file...
                    <Input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange("image")}
                    />
                  </label>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            outline
            className="px-5"
            onClick={() => {
              setUploadModalOpen(false);
              setFormValues({});
              setPreviewImage({});
            }}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={handleUpload}>
            {loading.create && (
              <Spinner color="white" size="sm" className="mr-2" />
            )}
            Upload Image
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  return (
    <>
      {showAddForm()}
      <Card>
        <CardHeader>
          <h2 className="mb-0">Gallery Tile Management</h2>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroup>
                <label className="form-control-label" htmlFor="title">
                  Description
                </label>
                <Input
                  type="textarea"
                  rows="5"
                  value={description?.value}
                  onChange={(e) => {
                    setDescription({ ...description, value: e.target.value });
                  }}
                />
                <Button
                  color="primary"
                  onClick={handleDescription}
                  className="my-2 mb-4 float-right"
                >
                  {loading.update && (
                    <Spinner color="white" size="sm" className="mr-2" />
                  )}
                  Save Changes
                </Button>
              </FormGroup>
            </Col>
          </Row>
          <div className="OurStoryGalleryFormContainer">
            <div className="tile-container">{showTiles()}</div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default OurStoryGalleryForm;
