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
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import { useState, useEffect } from "react";

import { getPendingUsers, processApproval, getCookie } from "actions/auth";

import {
  ADMIN_ROLE,
  CONTENT_MANAGER_ROLE,
} from "constants.js";

import moment from "moment";
function PendingUsers() {
  const token = getCookie("token");
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState({
    error: "",
    success: "",
  });

  useEffect(() => {
    getPendingUsers()
      .then((data) => {
        setPendingUsers(data);
      })
      .catch((error) => {
        setMessages({
          ...messages,
          error: error.response.data.error,
          success: "",
        });
      });
  }, []);

  const handleApproval = (value) => (e) => {
    e.preventDefault();
    setLoading(true);
    setMessages({ ...messages, error: "", success: "" });

    const select = document.getElementById(`${value.id}`);
    const department = select.options[select.selectedIndex].value;

    const user = {
      _id: value.id,
      department: department,
      status: value.status,
    };

    processApproval(user, token)
      .then((data) => {
        setMessages({ ...messages, error: "", success: data.success });
        setLoading(false);
        setPendingUsers(
          pendingUsers.filter((user) => {
            if (user._id !== value.id) return user;
          })
        );
      })
      .catch((error) => {
        setLoading(false);
        setMessages({
          ...messages,
          error: error.response.data.error,
          success: "",
        });
      });
  };

  const showSalesList = () => {
    return pendingUsers.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <Input type="select" id={`${user._id}`} defaultValue={ADMIN_ROLE}>
              <option value={ADMIN_ROLE}>Admin</option>
              <option value={CONTENT_MANAGER_ROLE}>Content Manager</option>
            </Input>
          </td>
          <td>{moment(user.createdAt).format("MMMM DD YYYY, h:mm A")}</td>
          <td className="text-right">
            {loading && <Spinner color="default" size="sm" className="mr-2" />}
            <Button
              color="success"
              size="sm"
              onClick={handleApproval({ id: `${user._id}`, status: true })}
            >
              Approve
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={handleApproval({ id: `${user._id}`, status: false })}
            >
              Disapprove
            </Button>
          </td>
        </tr>
      );
    });
  };

  const showErrorMessage = () =>
    messages.error && <Alert color="danger">{messages.error}</Alert>;

  const showSuccessMessage = () =>
    messages.success && <Alert color="success">{messages.success}</Alert>;

  return (
    <>
      <SimpleHeader name="User Management" parentName="Home" />
      <Container className="mt--6" fluid>
        {showSuccessMessage()}
        {showErrorMessage()}
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Registrations for approval</h3>
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
                <tbody className="list">{showSalesList()}</tbody>
              </Table>

              {pendingUsers.length == 0 && (
                <CardFooter className="py-4">
                  <div className="text-center">No Pending Users...</div>
                </CardFooter>
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

PendingUsers.layout = Admin;

export default PendingUsers;
