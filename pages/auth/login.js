import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";
import { useState } from "react";
import { signIn, authenticate } from "actions/auth";

import ReCaptchaV2 from "react-google-recaptcha";
import { useRef } from "react";

import Router from "next/router";
function Login() {
  const recaptchaRef = useRef(null);
  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    token: null,
  });

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState({
    error: "",
    success: "",
  });

  const showSuccessMessage = () =>
    messages.success && <Alert color="success">{messages.success}</Alert>;

  const showErrorMessage = () =>
    messages.error && <Alert color="danger">{messages.error}</Alert>;

  const handleFormValues = (name) => (e) => {
    setFormValues({ ...formValues, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);

    if (formValues.token == null) {
      setLoading(false);
      setMessages({
        ...messages,
        error:
          "Please prove you are not a robot by clicking the checkbox below",
        success: "",
      });
    } else {
      const user = {
        email: formValues.email,
        password: formValues.password,
        token: formValues.token,
      };

      signIn(user)
        .then((data) => {
          setLoading(false);
          setMessages({
            ...messages,
            error: "",
            success: "Login successful. Please wait to be redirected.",
          });
          authenticate(data, () => {
            Router.push(`/admin/`);
          });
        })
        .catch((error) => {
          setLoading(false);
          if (recaptchaRef.current != null) {
            recaptchaRef.current.reset();
          }
          setFormValues({ ...formValues, token: null });
          setMessages({
            ...messages,
            error: error.response.data.error,
            success: "",
          });
        });
    }
  };

  const handleToken = (token) => {
    setFormValues({ ...formValues, token });
  };

  const handleExpire = () => {
    setFormValues({ ...formValues, token: null });
  };

  return (
    <>
      <AuthHeader
        title="KBP"
        lead="Please Log in to continue."
      />
      <Container className="mt--9 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-0">
              <CardBody className="px-lg-5 py-lg-4">
                <div className="text-center text-muted mb-4">
                  <small>Sign in with credentials</small>
                </div>
                {showErrorMessage()}
                {showSuccessMessage()}
                <Form role="form">
                  <FormGroup
                    className={classnames("mb-3", {
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(true)}
                        onChange={handleFormValues("email")}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(true)}
                        onChange={handleFormValues("password")}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="recatpcha-wrapper mx-auto mb-3 text-center">
                    <ReCaptchaV2
                      ref={recaptchaRef}
                      style={{ display: "inline-block" }}
                      onChange={handleToken}
                      onExpire={handleExpire}
                      sitekey={process.env.RECAPTCHA_SITEKEY}
                    />
                  </div>
                  <div className="text-center">
                    <Button color="info" type="button" onClick={handleSubmit}>
                      {loading && <Spinner color="white" size="sm" />}
                      Sign in
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Forgot password?</small>
                </a>
              </Col>
              <Col className="text-right" xs="6">
                <a
                  className="text-light"
                  href="/auth/register"
                
                >
                  <small>Create new account</small>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

Login.layout = Auth;

export default Login;
