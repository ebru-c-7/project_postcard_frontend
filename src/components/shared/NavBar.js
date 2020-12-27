import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

import logo from "../../assets/images/svg/owl-2.svg";

import "../../assets/style/NavBar.css";

const NavBar = (props) => {
  let items = props.isLogged ? (
    <React.Fragment>
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link
        as={Link}
        id="cards"
        to={{
          pathname: "/card",
        }}
      >
        Cards
      </Nav.Link>

      <Nav.Link
        as={Link}
        id="contacts"
        to={{
          pathname: "/contact",
        }}
      >
        Contacts
      </Nav.Link>
      <Nav.Link
        as={Button}
        id="btn-logout"
        onClick={props.onLogout}
      >
        Logout
      </Nav.Link>
    </React.Fragment>
  ) : null;
  return (
    <Navbar expand="md">
      <Navbar.Brand href="/">
        <Image
          id="navbar-logo"
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="logo"
        />
        PostCards
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="navbar">
        <Nav id="nav-navitems" className="mr-auto">
          {items}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
