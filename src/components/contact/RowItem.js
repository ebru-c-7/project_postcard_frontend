import React from "react";

import { ReactComponent as EditLogo } from "../../assets/icons/edit-solid.svg";
import { ReactComponent as DeleteLogo } from "../../assets/icons/trash-alt-solid.svg";

import "../../assets/style/Contact.css";

const RowItem = (props) => {
  const editHandler = (id) => {
    props.actions.editHandler(id);
  };

  const deleteHandler = (id) => {
    props.actions.deleteHandler(id);
  };

  return props.rows.map((r, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{r.name}</td>
      <td>{r.email}</td>
      <td>{r.note}</td>
      <td>
        <EditLogo
          className="logo-svg"
          onClick={editHandler.bind(this, r.id)}
        /> 
      </td>
      <td>
        <DeleteLogo
          className="logo-svg"
          onClick={deleteHandler.bind(this,r.id)}
        />
      </td>
    </tr>
  ));
};

export default RowItem;
