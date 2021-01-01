import React from "react";

import Toast from "react-bootstrap/Toast";

import owl from "../../assets/images/svg/owl-2.svg";

const MessageBox = (props) => {
  // const [show, setShow] = useState(true);

  let style = {
    position: "absolute",
    bottom: 0,
    right: 0,
    minWidth: "20rem",
    zIndex: "1"
  };

  return (
    <Toast
      style={style}
      onClose={props.onHide}
      show={props.show}
      delay={5000}
      autohide
    >
      <Toast.Header>
        <img
          style={{ width: "2rem" }}
          src={owl}
          className="rounded mr-2"
          alt=""
        />
        <strong className="mr-auto">What's Happening</strong>
        <small>just now</small>
      </Toast.Header>
      <Toast.Body style={{ textAlign: "left", fontSize:"1rem" }}>{props.message}</Toast.Body>
    </Toast>
  );
};

export default MessageBox;
