import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import ButtonGroup from "./ButtonGroup";

import logo from "../../assets/images/svg/postal.svg";

const CardItem = (props) => {
  const cards = (
    <div>
      <div id="cards-container">
        {props.cards.map((card) => (
          <Card key={card.id}>
            <Card.Img
              variant="top"
              src={`${process.env.REACT_APP_BACKEND_URL}/${card.image}`}
            />
            <Card.Body>
              <Card.Title>To: {card.contact.name}</Card.Title>
              <div id="card-text-group">
                <Card.Text>{card.begin}</Card.Text>
                <Card.Text>{card.body}</Card.Text>
                <Card.Text>{card.end}</Card.Text>
              </div>
            </Card.Body>
            <Card.Footer>
              <ButtonGroup
                deleteHandler={props.methods.deleteHandler}
                cardId={card.id}
                contactId={card.contactId}
                type={props.type}
                sendCardHandler={props.methods.sendCardHandler}
              />
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
  const styleDiv = {
    margin: "1.8rem",
    display: "flex",
    justifyContent: "center",
  };

  const emptyContainer = (
    <div style={styleDiv}>
      <img
        src={logo}
        alt="contact-book"
        style={{ width: "3rem", marginRight: "1rem" }}
      />
      <p>No cards are found! Let's send some!</p>
    </div>
  );
  return (
    <React.Fragment>
      {props.cards.length > 0 ? cards : emptyContainer}
      <div style={{ marginTop: "1.2rem" }}>
        <Button onClick={props.methods.fetchMoreCards} variant="warning">
          Load More
        </Button>
      </div>
    </React.Fragment>
  );
};

export default CardItem;
