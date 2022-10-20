//TODOS: create helper to display datetime with timezone specific

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

import { useState, useEffect, useRef } from "react";

import _ from "lodash";

import { Editor } from "@tinymce/tinymce-react";
import { createOption, readOption } from "actions/option";

const HtmlEditorForm = ({ label, index, initValue }) => {
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const [bodyContent, setBodyContent] = useState("");
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

  //Component Lifecycles
  useEffect(() => {
    setLoading({ ...loading, fetch: true });
    readOption(index).then((data) => {
      if (data.data) {
        setBodyContent(data.data.value);
      }
    });
  }, []);

  const handleContentChange = (content) => {
    setBodyContent(content);
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

  const handleSubmit = () => {
    setLoading({ ...loading, create: true });

    //init FormValues to form data;
    const data = new FormData();

    //set form fields
    data.set("index", index);
    data.set("value", bodyContent);

    createOption("", data)
      .then((data) => {
        setLoading({ ...loading, create: false });
        setResponseMessage({ success: data.message, error: "" });
      })
      .catch((e) => {
        setLoading(false);
        setResponseMessage({ success: "", error: e.response.data.message });
      });
  };

  //Component Views

  return (
    <>
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0 d-inline-block">{label}</h2>
          <Button
            size="sm"
            color="primary"
            className="px-5"
            onClick={handleSubmit}
          >
            {loading.create && (
              <Spinner color="white" size="sm" className="mr-2" />
            )}
            Save
          </Button>
        </CardHeader>
        <CardBody className="p-0">
          {showSuccessMessage()}
          {showErrorMessage()}
          <Editor
            apiKey={process.env.TINY_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={initValue}
            onEditorChange={handleContentChange}
            init={{
              height: 800,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | fontsizeselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify lineheight | bullist numlist outdent indent | " +
                "removeformat | code preview help",
              // content_style:
              //   "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default HtmlEditorForm;
