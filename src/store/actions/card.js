import * as actions from "./actionTypes";
import axios from "axios";

const fetchStart = () => ({ type: actions.FETCH_CARDS_START });

const fetchFail = (error) => ({ type: actions.FETCH_CARDS_FAIL, error });

const fetchSuccess = (cardList) => ({
  type: actions.FETCH_CARDS_SUCCESS,
  cardList,
});

const changeInit = () => ({ type: actions.CARD_LIST_CHANGE_INIT });

export const changeFailCard = (error) => ({
  type: actions.CARD_LIST_CHANGE_FAIL,
  error: error || null,
});

const addSuccess = (card, message) => ({
  type: actions.ADD_CARD_SUCCESS,
  card,
  message 
});

const deleteSuccess = (cardId, message) => ({
  type: actions.DELETE_CARD_SUCCESS,
  cardId,
  message,
});

const sendSuccess = (cardId, message) => ({
  type: actions.SEND_CARD_SUCCESS,
  cardId,
  message,
});

export const selectCardContact = (contactEmail) => ({
  type: actions.SELECT_CARD_CONTACT,
  contactEmail,
});

export const cancelSelectCardContact = () => ({
  type: actions.CANCEL_SELECT_CARD_CONTACT,
});

export const fetchCards = (token) => {
  console.log("actions fetchcard", token);
  return (dispatch) => {
    dispatch(fetchStart());
    const url = `${process.env.REACT_APP_BACKEND_URL}/card/cards`;
    const headers = { Authorization: "Bearer " + token };

    axios
      .get(url, { headers }) //check the headers
      .then((response) => {
        console.log(response);
        let cards = response.data.cards;
        dispatch(fetchSuccess(cards));
      })
      .catch((error) => {
        dispatch(fetchFail(error.response.data.message));
      });
  };
};

export const addCard = (token, card) => {
  return (dispatch) => {
    dispatch(changeInit());
    const url = `${process.env.REACT_APP_BACKEND_URL}/card/`;
    const formData = new FormData();
    for (let key in card) {
      formData.append(key, card[key]);
    }
    const body = formData; //image, begin,body,end, type, contactEmail

    console.log(formData);
    axios
      .post(url, body, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        const card = response.data.card;
        const message = response.data.message;
        dispatch(addSuccess(card, message));
      })
      .catch((error) => {
        dispatch(changeFailCard(error.response.data.message));
      });
  };
};

export const deleteCard = (token, cardId) => {
  return (dispatch) => {
    dispatch(changeInit());
    const url = `${process.env.REACT_APP_BACKEND_URL}/card/`;
    const params = cardId;
    const headers = { Authorization: "Bearer " + token };

    axios
      .delete(url + params, { headers })
      .then((response) => {
        console.log(response);
        const message = response.data.message;
        dispatch(deleteSuccess(cardId, message));
      })
      .catch((error) => {
        dispatch(changeFailCard(error.response.data.message));
      });
  };
};

export const sendSavedCard = (token, cardId) => {
  return (dispatch) => {
    dispatch(changeInit());
    const url = `${process.env.REACT_APP_BACKEND_URL}/card/`;
    const params = cardId;
    const headers = { Authorization: "Bearer " + token };

    axios
      .patch(url + params, {}, { headers })
      .then((response) => {
        console.log(response);
        const message = response.data.message;
        dispatch(sendSuccess(cardId, message));
      })
      .catch((error) => {
        dispatch(changeFailCard(error.response.data.message));
      });
  };
};

export const errorHandleCard = () => ({ type: actions.ERROR_HANDLE });

export const messageHandleCard = () => ({ type: actions.MESSAGE_HANDLE });

