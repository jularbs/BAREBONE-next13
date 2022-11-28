import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Input,
  Spinner,
} from "reactstrap";

const ViewComponent = ({ isOpen, setIsOpen, values }) => {
  return (
    <>
      <Modal
        toggle={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
        style={{ maxWidth: "95vw", width: "1000px" }}
      >
        <ModalBody className="p-4">
          <div>
            <div>
              To: <strong>{values.sendTo?.name}</strong>
            </div>
            <div className="d-flex mb-3">
              <div className="mr-2">From:</div>
              <div>
                <div>
                  <strong>
                    {values.fullName}, {values.role}
                  </strong>
                </div>
                <div>{values.emailAddress}</div>
                <div>{values.mobileNumber}</div>
                <div>{values.landlineNumber}</div>
              </div>
            </div>
            <div>
              Company Name: <strong>{values.companyName}</strong>
            </div>
            <div>
              Website URL: <strong>{values.companyURL}</strong>
            </div>
            <div>
              Industry: <strong>{values.industry}</strong>
            </div>
            <div>
              Type: <strong>{values.isAdvertiser}</strong>
            </div>

            <div className="pt-3 mb-2">Message:</div>
            <div style={{ whiteSpace: "pre-line" }}>{values.message}</div>
          </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <div>
            <Button
              outline
              className="px-5"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Close
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ViewComponent;
