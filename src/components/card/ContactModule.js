import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import ContactBook from "./ContactBook";

const ContactModule = (props) => {
  const handleClose = () => {
    props.hide();
  };

  const contactSelectHandler = (event) => {
    event.preventDefault();
    // event.stopPropagation();
    let form = event.currentTarget;
    let contactEmail = form["contact"].value;
    console.log(contactEmail);
    props.selectHandler(contactEmail);
  };

  return (
    <Modal show={props.show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Contact</Modal.Title>
      </Modal.Header>
      <Form onSubmit={contactSelectHandler}>
        <Modal.Body>
          <p>Please select a contact from your contact book below.</p>
          <fieldset>
            <ContactBook data={props.contactList} />
          </fieldset>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Select
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ContactModule;
