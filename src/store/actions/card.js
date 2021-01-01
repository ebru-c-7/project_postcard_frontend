import * as actions from "./actionTypes";
import axios from "axios";

const fetchStart = () => ({ type: actions.FETCH_CARDS_START });

const fetchFail = (error) => ({ type: actions.FETCH_CARDS_FAIL, error });

const fetchSuccess = (cardList, isReload) => ({
  type: actions.FETCH_CARDS_SUCCESS,
  cardList,
  isReload,
});

const changeInit = () => ({ type: actions.CARD_LIST_CHANGE_INIT });

export const changeFailCard = (error) => ({
  type: actions.CARD_LIST_CHANGE_FAIL,
  error: error || null,
});

const addSuccess = (message, cardList) => ({
  type: actions.ADD_CARD_SUCCESS,
  message,
  cardList
});

const deleteSuccess = (cardId, message) => ({
  type: actions.DELETE_CARD_SUCCESS,
  cardId,
  message,
});

const sendSuccess = (cardId, message, cardList) => ({
  type: actions.SEND_CARD_SUCCESS,
  cardId,
  message,
  cardList,
});

export const selectCardContact = (contactEmail) => ({
  type: actions.SELECT_CARD_CONTACT,
  contactEmail,
});

export const cancelSelectCardContact = () => ({
  type: actions.CANCEL_SELECT_CARD_CONTACT,
});

export const fetchCards = (token, isReload, length, type) => {
  return (dispatch) => {
    dispatch(fetchStart());
    const url = `${process.env.REACT_APP_BACKEND_URL}/card/cards`;
    const headers = { Authorization: "Bearer " + token };
    const itemQ = length !== undefined ? `?length=${length}` : `?length=0`;
    const typeQ = type !== undefined ? `&type=${type}` : `&type=all`;

    axios
      .get(url + itemQ + typeQ, { headers })
      .then((response) => {
        let cards = response.data.cards;
        dispatch(fetchSuccess(cards, isReload));
      })
      .catch((error) => {
        dispatch(
          fetchFail(
            error.response.data.message ||
              "Something went wrong:( Please refresh the page!"
          )
        );
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
    const body = formData; //image, begin, body, end, type, contactEmail

    axios
      .post(url, body, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        let {message, cards} = response.data;
        dispatch(addSuccess(message, cards));
      })
      .catch((error) => {
        dispatch(
          changeFailCard(
            error.response.data.message ||
              "Something went wrong:( Please refresh the page!"
          )
        );
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
        const message = response.data.message;
        dispatch(deleteSuccess(cardId, message));
      })
      .catch((error) => {
        dispatch(
          changeFailCard(
            error.response.data.message ||
              "Something went wrong:( Please refresh the page!"
          )
        );
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
        let { message, cards } = response.data;
        dispatch(sendSuccess(cardId, message, cards));
      })
      .catch((error) => {
        dispatch(
          changeFailCard(
            error.response.data.message ||
              "Something went wrong:( Please refresh the page!"
          )
        );
      });
  };
};

export const errorHandleCard = () => ({ type: actions.ERROR_HANDLE });

export const messageHandleCard = () => ({ type: actions.MESSAGE_HANDLE });
