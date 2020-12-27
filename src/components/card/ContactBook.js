import React from "react";

import Form from "react-bootstrap/Form";

const ContactBook = (props) => {
  return props.data.map((opt) => (
    <Form.Check
    key={opt.id}
      name="contact"
      type="radio"
      id={opt.id}
      value={opt.email}
      label={`${opt.name} - ${opt.email}`}
    />
  ));
};

export default ContactBook;
