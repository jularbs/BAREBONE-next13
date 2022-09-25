import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Spinner,
  UncontrolledAlert,
} from "reactstrap";

import { useState, useEffect } from "react";
import { createOption, readOption } from "actions/option";
import { getLink } from "actions/media";
import _ from "lodash";

const OrgChartComponentForm = ({ index, label }) => {
  const [formValues, setFormValues] = useState({});

  const [loading, setLoading] = useState({ create: false, fetch: false });

  const [responseMessage, setResponseMessage] = useState({
    error: "",
    success: "",
  });

  const [previewImage, setPreviewImage] = useState({
    media: "",
  });

  useEffect(() => {
    setLoading({ ...loading, fetch: true });
    readOption(index).then((data) => {
      if (data.data) setFormValues({ ...formValues, ...data.data });
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
    setLoading({ ...loading, create: true });
    const { value, media } = formValues;

    //init FormValues to form data;
    const data = new FormData();

    //set form fields
    data.set("index", index);
    data.set("value", value);
    if (previewImage.media) data.set("media", media);

    createOption("", data)
      .then((data) => {
        setLoading({ ...loading, create: false });
        setResponseMessage({ success: data.message, error: "" });
        setFormValues({ ...formValues, ...data.data });
        setPreviewImage({});
      })
      .catch((e) => {
        setLoading(false);
        setResponseMessage({ success: "", error: e.response.data.message });
      });
  };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center">
        <h2 className="mb-0 d-inline">{label}</h2>
        <label className="btn btn-default btn-sm mb-0">
          Choose file...
          <Input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange("media")}
          />
        </label>
      </CardHeader>
      <CardBody className="p-0">
        <div className="d-flex flex-column align-items-center">
          <img
            src={
              previewImage.media
                ? previewImage.media
                : formValues.media
                ? getLink(formValues.media)
                : ""
            }
            style={{
              width: "100%",
              backgroundColor: "#ECECEC",
            }}
          />
        </div>
      </CardBody>
      <CardFooter>
        {showErrorMessage()}
        {showSuccessMessage()}
        <div className="d-flex align-items-center justify-content-end">
          <div>
            <Button color="primary" onClick={handleSubmit}>
              {loading.create && (
                <Spinner color="white" size="sm" className="mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrgChartComponentForm;
