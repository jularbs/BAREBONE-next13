import {
  Container,
  Row,
  Table,
  Card,
  CardHeader,
  CardFooter,
  Button,
  Input,
  Alert,
  Spinner,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import { useState, useEffect } from "react";

import {
  getRegisteredUsers,
  deleteUser,
  isAuth,
  getCookie,
} from "actions/auth";

import {
  ADMIN_ROLE,
  CONTENT_MANAGER_ROLE,
  ECOMMERCE_MANAGER_ROLE,
} from "constants.js";

import moment from "moment";
function ManageUsers() {
  const token = getCookie("token");
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState({
    error: "",
    success: "",
  });

  useEffect(() => {
    const department = isAuth() ? isAuth().department : "";
    getRegisteredUsers({ department })
      .then((data) => {
        setRegisteredUsers(data);
      })
      .catch((error) => {
        setMessages({
          ...messages,
          error: error.response.data.error,
          success: "",
        });
      });
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessages({ ...messages, success: "", error: "" });

    const _id = deleteHandler._id;

    deleteUser(_id, token)
      .then((data) => {
        setModalDeleteOpen(false);
        setLoading(false);
        setMessages({ ...messages, error: "", success: data.success });
        setDeleteHandler({ ...deleteHandler, _id: "", input: "" });
        setRegisteredUsers(registeredUsers.filter((user) => user._id !== _id));
      })
      .catch((error) => {
        setLoading(false);
        setMessages({ ...messages, error: error.response.data.error });
      });
  };

  const showRegisteredUsers = () => {
    const users = registeredUsers.filter((r) => r._id !== isAuth()._id);
    return users.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <Input
              type="select"
              id={`${user._id}`}
              defaultValue={user.department}
            >
              <option value={ADMIN_ROLE}>Admin</option>
              <option value={CONTENT_MANAGER_ROLE}>Content Manager</option>
            </Input>
          </td>
          <td>{moment(user.createdAt).format("MMMM DD YYYY, h:mm A")}</td>
          <td className="text-right">
            {loading && <Spinner color="default" size="sm" className="mr-2" />}
            <Button
              color="danger"
              size="sm"
              onClick={() => {
                setDeleteHandler({ ...deleteHandler, _id: user._id });
                setModalDeleteOpen(true);
              }}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  //DELETE
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [deleteHandler, setDeleteHandler] = useState({
    _id: "",
    key: "permanently delete",
    input: "",
  });

  const showDeleteModal = () => {
    return (
      <Modal
        toggle={() => {
          setModalDeleteOpen(!modalDeleteOpen);
          setDeleteHandler({ ...deleteHandler, _id: "", input: "" });
        }}
        isOpen={modalDeleteOpen}
      >
        <div className=" modal-header">
          <h5 className="modal-title">Delete User</h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => {
              setModalDeleteOpen(!modalDeleteOpen);
              setDeleteHandler({ ...deleteHandler, _id: "", input: "" });
            }}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody className="py-0">
          <FormGroup className="mb-0">
            <Input
              placeholder="type 'permanently delete' here..."
              type="text"
              onChange={(e) => {
                setDeleteHandler({
                  ...deleteHandler,
                  input: e.target.value,
                });
              }}
            />
            <span className="text-xs">
              <span className="text-red">This action cannot be undone</span>
            </span>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            disabled={deleteHandler.key == deleteHandler.input ? false : true}
            onClick={handleDelete}
          >
            Permanently Delete
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setModalDeleteOpen(!modalDeleteOpen);
              setDeleteHandler({ ...deleteHandler, _id: "", input: "" });
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  const showErrorMessage = () =>
    messages.error && <Alert color="danger">{messages.error}</Alert>;

  const showSuccessMessage = () =>
    messages.success && <Alert color="success">{messages.success}</Alert>;

  return (
    <>
      {showDeleteModal()}
      <SimpleHeader name="Payment Gateway Management" parentName="Home" />
      <Container className="mt--6" fluid>
        {showSuccessMessage()}
        {showErrorMessage()}
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Registered Users</h3>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th className="sort" data-sort="name" scope="col">
                      Name
                    </th>
                    <th className="sort" data-sort="status" scope="col">
                      Email
                    </th>
                    <th className="sort" data-sort="status" scope="col">
                      Designation
                    </th>
                    <th className="sort" data-sort="budget" scope="col">
                      Registration Date
                    </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody className="list">{showRegisteredUsers()}</tbody>
              </Table>

              {registeredUsers.length == 0 && (
                <CardFooter className="py-4">
                  <div className="text-center">No Registered Users...</div>
                </CardFooter>
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

ManageUsers.layout = Admin;

export default ManageUsers;
