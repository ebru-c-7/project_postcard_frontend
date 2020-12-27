import React from "react";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const ContactButton = (props) => {
  return (
    <React.Fragment>
      <span key="text" style={{ fontWeight: "bold" }}>
        {props.selectedContact || ""}
      </span>
      <Button
        style={{ margin: "0.6rem" }}
        key="contact-btn"
        variant="warning"
        disabled={props.isContactsLoading}
        onClick={props.contactButtonHandler}
        type="button"
      >
        {props.isContactsLoading && (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
        {props.selectedContact ? "Change Contact" : "Select Contact"}
      </Button>
    </React.Fragment>
  );
};

export default ContactButton;
