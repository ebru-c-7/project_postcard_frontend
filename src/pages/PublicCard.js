import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "../components/publicCard/Card";
import ErrorModal from "../components/shared/ErrorModal";

const PublicCard = (props) => {
  const [cardFront, setCardFront] = useState(null);
  const [cardBack, setCardBack] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      const cardId = props.match.params.card;
      const contactId = props.match.params.contact;
      const url = `${process.env.REACT_APP_BACKEND_URL}/card/${cardId}/${contactId}`;

      let card;
      try {
        let response = await axios.get(url);
        card = response.data.card;
      } catch (err) {
        setError(
          err.response.data.message ||
            "Something went wrong :( Please refresh the page!"
        );
        return;
      }

      setCardFront(card.image || "");

      let cardBack = {};
      for (let key in card) {
        if (key !== "image") {
          cardBack[key] = card[key];
        }
      }
      setCardBack(cardBack);
    };
    fetchCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <ErrorModal
        show={!!error}
        onHide={() => {
          setError(null);
          props.history.push("/");
        }}
        errorMessage={error}
      />
      {cardFront && cardBack ? (
        <Card front={cardFront} back={cardBack} />
      ) : null}
    </React.Fragment>
  );
};

export default PublicCard;
