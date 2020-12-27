import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import classes from "../../assets/style/PublicCard.module.css";

const IMAGE = "IMAGE";
const BACK = "BACK";

const Card = (props) => {
  const [active, setActive] = useState(IMAGE);
  const imgElement = (
    <img
      className={classes.CardImage}
      src={`${process.env.REACT_APP_BACKEND_URL}/${props.front}`}
      alt="card"
    />
  );
  const cardElement = (
    <Container className={classes.CardContainer}>
      <Row className={classes.CardContainer__Row}>
        <Col lg={8} md={8} sm={7} className={classes.CardTextCol}>
          <p>{props.back.begin}</p>
          <p>{props.back.body}</p>
          <p>{props.back.end}</p>
        </Col>
        <Col lg={3} md={2} sm={4}>
          <img
          className={classes.StampImg}
            src={process.env.REACT_APP_BACKEND_URL + "/" + props.back.stamp}
            alt="stamp"
          />
        </Col>
      </Row>
    </Container>
  );

  const flipHandler = (event) => {
    setActive((prev) => {
      if (prev === IMAGE) return BACK;
      else if (prev === BACK) return IMAGE;
    });
  };

  return (
    <React.Fragment>
      {active === IMAGE ? imgElement : cardElement}
      <Button className={classes.CardButton} onClick={flipHandler}>
        Flip
      </Button>
    </React.Fragment>
  );
};

export default Card;
