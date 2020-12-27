import React from "react";

import Nav from "react-bootstrap/Nav";

const NavItems = (props) => {
  return props.items.map((item, i) => {
    let eventTitle = item.toLowerCase().split(" ").join("-");
    return (
      <Nav.Item key={i}>
        <Nav.Link eventKey={eventTitle}>{item}</Nav.Link>
      </Nav.Item>
    );
  });
};

export default NavItems;
