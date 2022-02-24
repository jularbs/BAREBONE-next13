import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { useState, useEffect } from "react";

//actions
import { changePassword, isAuth, getCookie } from "actions/auth";

function MyAccount() {
  const token = getCookie("token");
  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmation: "",
  });

  const [loading, setLoading] = useState({
    edit: "",
    add: "",
    status: "",
    delete: "",
  });

  const [message, setMessage] = useState({
    error: "",
    success: "",
  });

  //LIFECYCLES
  useEffect(() => {}, []);

  //EVENT HANDLERS
  const handleChangePasswordForm = (name) => (e) => {
    setChangePasswordForm({ ...changePasswordForm, [name]: e.target.value });
  };

  const handleSubmit = () => {
    setLoading({ ...loading, add: true });
    setMessage({ ...message, success: "", error: "" });

    changePassword(
      { ...changePasswordForm, _id: isAuth() ? isAuth()._id : "" },
      token
    )
      .then((data) => {
        setLoading({ ...loading, add: false });
        setMessage({ ...message, success: data.success, error: "" });
        setChangePasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmation: "",
        });
      })
      .catch((error) => {
        setLoading({ ...loading, add: false });
        setMessage({
          ...message,
          success: "",
          error: error.response.data.error,
        });
      });
  };

  //VIEWS
  const showErrorMessage = () =>
    message.error && <Alert color="danger">Error! {message.error}</Alert>;

  const showSuccessMessage = () =>
    message.success && (
      <Alert color="success">Success! {message.success}</Alert>
    );

  return (
    <>
      <SimpleHeader name="Image Slider Management" parentName="Home" />
      <Container className="mt--6" fluid>
        <Row>
          <Col lg="4">
            <div className="card-wrapper">
              <Card>
                <CardHeader>
                  <h3 className="mb-0">Change Password</h3>
                </CardHeader>
                <CardBody>
                  {showErrorMessage()}
                  {showSuccessMessage()}
                  <Form>
                    <FormGroup>
                      <label className="text-sm">Current Password</label>
                      <Input
                        type="password"
                        onChange={handleChangePasswordForm("currentPassword")}
                        value={changePasswordForm.currentPassword}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label className="text-sm">New Password</label>
                      <Input
                        type="password"
                        onChange={handleChangePasswordForm("newPassword")}
                        value={changePasswordForm.newPassword}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label className="text-sm">Confirm New Password</label>
                      <Input
                        type="password"
                        onChange={handleChangePasswordForm("confirmation")}
                        value={changePasswordForm.confirmation}
                      />
                    </FormGroup>
                    <button
                      type="button"
                      className="btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center"
                      onClick={handleSubmit}
                    >
                      {loading.add && (
                        <Spinner color="white" size="sm" className="mr-2" />
                      )}
                      Change password
                    </button>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col lg="8"></Col>
        </Row>
      </Container>
    </>
  );
}

MyAccount.layout = Admin;

export default MyAccount;
