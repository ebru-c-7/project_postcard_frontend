import React from "react";
import Button from "react-bootstrap/Button";

const ButtonGroup = (props) => {
  return (
    <div id="card-action-group">
      {props.type ? (
        <Button
          as="a"
          variant="primary"
          href={`/card/${props.cardId}/${props.contactId}`}
          target="_blank"
        >
          View
        </Button>
      ) : (
        <Button
          variant="info"
          onClick={props.sendCardHandler.bind(this, props.cardId)}
        >
          Send
        </Button>
      )}
      <Button
        variant="danger"
        onClick={props.deleteHandler.bind(this, props.cardId)}
      >
        Delete
      </Button>
    </div>
  );
};

export default ButtonGroup;
