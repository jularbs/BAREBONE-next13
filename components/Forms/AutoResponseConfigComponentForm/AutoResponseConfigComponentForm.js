//TODOS: DEEP TESTING, file dl/preview
import { useEffect, useState, useRef } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Alert,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import { IoCloseSharp } from "react-icons/io5";
import {
  createAutoResponseConfig,
  getAutoResponseConfig,
} from "actions/autoResponseConfig";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import { readOption } from "actions/option";
const AutoResponseConfigComponentForm = () => {
  const router = useRouter();
  const editorRef = useRef(null);
  const [attachments, setAttachments] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [bodyContent, setBodyContent] = useState("");
  const [initValue, setInitValue] = useState("");
  const [selected, setSelected] = useState("");
  const [autoResponseConfigId, setAutoResponseConfigId] = useState("");
  const [loading, setLoading] = useState({
    fetch: false,
    submit: false,
  });
  const [messages, setMessages] = useState({
    error: "",
    success: "",
  });

  useEffect(() => {
    setSelected(router.query.selected);
    setLoading({ ...loading, fetch: true });
    //fetch option from query selected
    if (router.query.selected) {
      readOption(`autorespond-config-${router.query.selected}`).then((data) => {
        if (data.data) {
          setAutoResponseConfigId(data.data?.value);
        } else {
          setAutoResponseConfigId("");
          setLoading({ ...loading, fetch: false });
        }
      });
    }
  }, [router.query.selected]);

  useEffect(() => {
    setAttachments([]);
    setFormValues({
      senderName: "",
      subject: "",
      isEnabled: false,
      attachments: [],
    });
    setInitValue("");
    if (autoResponseConfigId) {
      getAutoResponseConfig(autoResponseConfigId).then((data) => {
        console.log("DATA: ", data.data);
        setLoading({ ...loading, fetch: false });
        setFormValues({
          _id: data.data?._id,
          senderName: data.data?.senderName,
          subject: data.data?.subject,
          attachments: data.data?.attachments,
          isEnabled: data.data?.isEnabled,
        });
        setInitValue(data.data?.body);
        setBodyContent(data.data?.body);
      });
    }
  }, [autoResponseConfigId]);

  const handleSubmit = () => {
    setLoading({ ...loading, submit: true });
    const data = new FormData();

    if (formValues._id) {
      data.append("_id", formValues._id);
    }

    data.append("senderName", formValues.senderName);
    data.append("subject", formValues.subject);
    data.append("body", bodyContent);
    data.append("isEnabled", formValues.isEnabled);
    data.append(
      "attachments",
      JSON.stringify(formValues.attachments.map((item) => item._id))
    );

    data.append("autorespondFor", selected);

    attachments.forEach((item, key) => {
      data.append(`attachments[]`, item);
    });

    createAutoResponseConfig("", data)
      .then((data) => {
        setLoading({ ...loading, submit: false });
        setMessages({ error: "", success: "Email autoresponse config saved." });
      })
      .catch((e) => {
        setLoading({ ...loading, submit: false });
        setMessages({
          error:
            "There was a problem saving your email autoresponse config. Please try again later or contact web administrator.",
          success: "",
        });
      });
  };

  const handleTextChange = (name) => (e) => {
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleContentChange = (content) => {
    setBodyContent(content);
  };

  const handleAttachment = (e) => {
    if (e.target.files[0]) {
      setAttachments([...attachments, e.target.files[0]]);
    }
  };

  const showAttachedFiles = () => {
    return attachments.map((item, key) => {
      return (
        <Alert
          color="dark"
          className="d-flex justify-content-between align-items-center p-2 pl-3 mb-2"
        >
          {item.name}
          <IoCloseSharp
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={() => {
              removeAttachedFile(item);
            }}
          >
            REMOVE
          </IoCloseSharp>
        </Alert>
      );
    });
  };

  const removeAttachedFile = (toRemove) => {
    setAttachments(attachments.filter((item) => item !== toRemove));
  };

  const removePreAttachedFile = (toRemove) => {
    setFormValues({
      ...formValues,
      attachments: formValues.attachments.filter((item) => item !== toRemove),
    });
  };

  const showPreAttachedFiles = () => {
    return formValues.attachments.map((item, key) => {
      return (
        <Alert
          color="dark"
          className="d-flex justify-content-between align-items-center p-2 pl-3 mb-2"
        >
          {item.key}
          <IoCloseSharp
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={() => {
              removePreAttachedFile(item);
            }}
          >
            REMOVE
          </IoCloseSharp>
        </Alert>
      );
    });
  };

  const showErrorMessage = () =>
    messages.error && <Alert color="danger">Error! {messages.error}</Alert>;

  const showSuccessMessage = () =>
    messages.success && (
      <Alert color="success">Success! {messages.success}</Alert>
    );

  return (
    <>
      {showErrorMessage()}
      {showSuccessMessage()}
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0 d-inline-block">
            Auto Response Management: {selected}
          </h2>
        </CardHeader>
        {selected && !loading.fetch ? (
          <CardBody className="p-4 d-flex flex-column">
            <Row>
              <Col lg="6" className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <label className="mr-2 custom-toggle">
                    <input
                      checked={formValues.isEnabled ? true : false}
                      onChange={() => {
                        setFormValues({
                          ...formValues,
                          isEnabled: !formValues.isEnabled,
                        });
                      }}
                      type="checkbox"
                    ></input>
                    <span className=" custom-toggle-slider rounded-circle"></span>
                  </label>
                  <span>{formValues.isEnabled ? "Enabled" : "Disabled"}</span>
                </div>
              </Col>
              <Col lg="6" className="mb-3">
                <Button color="secondary">View processor guide</Button>
              </Col>
              <Col lg="12">
                <label className="form-control-label" htmlFor="title">
                  Sender Name
                </label>
                <Input
                  value={formValues.senderName}
                  onChange={handleTextChange("senderName")}
                  type="text"
                  className="mb-2"
                />
                {/* <label className="form-control-label" htmlFor="title">
                  Recipient
                </label>
                <Input
                  value={formValues.recipient}
                  onChange={handleTextChange("recipient")}
                  type="text"
                  className="mb-2"
                /> */}
                <label className="form-control-label" htmlFor="title">
                  Subject
                </label>
                <Input
                  value={formValues.subject}
                  onChange={handleTextChange("subject")}
                  type="text"
                  className="mb-4"
                />
                <Editor
                  apiKey={process.env.TINY_KEY}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={initValue}
                  onEditorChange={handleContentChange}
                  init={{
                    height: 400,
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
              </Col>
              <Col lg="6"></Col>
            </Row>
            <Row className="py-2 pt-4">
              <Col lg="6">
                <div className="d-flex justify-content-between">
                  <h3
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      color: "black",
                    }}
                  >
                    Attachments:
                  </h3>
                  <div>
                    <label className="btn btn-default btn-sm">
                      Add Attachment
                      <Input type="file" hidden onChange={handleAttachment} />
                    </label>
                  </div>
                </div>
                {showPreAttachedFiles()}
                {showAttachedFiles()}
              </Col>
            </Row>
            <Button color="primary" onClick={handleSubmit}>
              {loading.submit && (
                <Spinner color="white" size="sm" className="mr-2" />
              )}
              Save Auto Response Config
            </Button>
          </CardBody>
        ) : (
          <CardBody className="d-flex justify-content-center">
            <h3>PLEASE SELECT A RECEIVER</h3>
          </CardBody>
        )}
      </Card>
    </>
  );
};

export default AutoResponseConfigComponentForm;
