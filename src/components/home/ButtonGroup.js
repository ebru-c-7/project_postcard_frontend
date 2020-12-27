import React from "react";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const ButtonGroup = (props) => {
    const SIGN_UP = "SIGN_UP";

  return (
    <div className="button-container">
      <Button variant="primary" type="submit" disabled={props.isLoading}>
        {props.isLoading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : null}
        Submit
      </Button>
      <Button
        variant="warning"
        onClick={props.modeToggleHandler}
        disabled={props.isLoading}
      >
        Switch to {props.mode === SIGN_UP ? "Login" : "Register"}
      </Button>
    </div>
  );
};

export default ButtonGroup;
