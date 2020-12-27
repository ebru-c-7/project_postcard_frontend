import React from "react";

import Table from "react-bootstrap/Table";

import RowItem from "./RowItem";

import logo from "../../assets/images/svg/phone-book-2.svg";

const TableItem = (props) => {
  const table = (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Note</th>
          <th colSpan="2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <RowItem rows={props.contacts} actions={props.methods} />
      </tbody>
    </Table>
  );
  const styleDiv = {
    margin: "1.8rem",
    display: "flex",
    justifyContent: "space-evenly"
  };

  const emptyTable = (
    <div style={styleDiv}>
      <img src={logo} alt="contact-book" style={{width: "3rem"}} />
      <p>No contacts are found! Let's add some!</p>
    </div>
  );
  return props.contacts.length > 0 ? table : emptyTable;
};

export default TableItem;
