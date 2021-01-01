import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FormGroupItem = (props) => {
  let styleLabel = { textAlign: "right", fontWeight: "bold" };
  
  let control = (
    <Form.Control
      style={{ textTransform: "lowercase" }}
      name={props.data.name}
      type={props.data.type}
      placeholder={props.data.placeholder}
      required={props.data.required}
      defaultValue={props.data.value || ""}
      maxLength={props.data.maxLength}
      minLength={props.data.minLength}
    />
  );

  switch (props.data.as) {
    case "textarea":
      control = (
        <Form.Control
          style={{ textTransform: "lowercase" }}
          as="textarea"
          rows={props.data.rows}
          required={props.data.required}
          defaultValue={props.data.value || ""}
          maxLength={props.data.maxLength}
          minLength={props.data.minLength}
          name={props.data.name}
        />
      );
      break;
    case "checkbox":
      control = (
        <Form.Check
          name={props.data.name}
          type="checkbox"
          label={props.data.label}
        />
      );
      break;
    default:
      break;
  }

  return (
    <Form.Group as={Row} key={props.data.name}>
      <Form.Label style={styleLabel} column md={4} lg={4}>
        {props.data.label}
      </Form.Label>
      <Col md={7} lg={7}>
        {control}
        <Form.Control.Feedback type="invalid">
          {props.data.feedback}
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
};

export default FormGroupItem;
