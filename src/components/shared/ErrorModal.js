import React from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ErrorModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.errorMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onHide}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
