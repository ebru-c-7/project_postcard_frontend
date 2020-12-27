import React from "react";

import Modal from "react-bootstrap/Modal";

import FormItem from "../shared/FormItem";

const EditModule = (props) => {
  const handleClose = () => {
    props.hide();
  };
  
    let formInfo = [
    {
      label: "Contact Name",
      name: "name",
      type: "text",
      placeholder: "Enter Name",
      required: true,
      feedback: "Please enter a contact name.",
      value: props.contact.name
    },
    {
      label: "Email address",
      name: "email",
      type: "email",
      placeholder: "Enter email",
      required: true,
      feedback: "Please enter a valid e-mail address.",
      value: props.contact.email
    },
    {
      label: "Note",
      name: "note",
      type: "text",
      placeholder: "Opt. any note for the contact",
      required: false,
      feedback: "",
      value: props.contact.note
    },
  ];

  return (
    <Modal show={props.show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormItem
          data={formInfo}
          mode="contact"/>
      </Modal.Body>
    </Modal>
  );
};

export default EditModule;
