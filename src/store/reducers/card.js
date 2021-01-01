/* eslint-disable no-unused-vars */
import * as actions from "../actions/actionTypes";
import { updateObject } from "../actions/Utility";

const initialState = {
  cardList: [],
  loaded: false,
  error: null,
  loading: false,
  selectedContact: null,
  message: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_CARDS_START:
      return fetchStart(state, action);
    case actions.FETCH_CARDS_SUCCESS:
      return fetchSuccess(state, action);
    case actions.FETCH_CARDS_FAIL:
      return fetchFail(state, action);
    case actions.CARD_LIST_CHANGE_INIT:
      return changeInit(state, action);
    case actions.CARD_LIST_CHANGE_FAIL:
      return changeFail(state, action);
    case actions.ADD_CARD_SUCCESS:
      return addSuccess(state, action);
    case actions.DELETE_CARD_SUCCESS:
      return deleteSuccess(state, action);
    case actions.SELECT_CARD_CONTACT:
      return selectContactSuccess(state, action);
    case actions.CANCEL_SELECT_CARD_CONTACT:
      return selectContactFail(state, action);
      case actions.SEND_CARD_SUCCESS:
        return sendSuccess(state, action);
    case actions.ERROR_HANDLE:
      return errorHandle(state, action);
    case actions.MESSAGE_HANDLE:
      return messageHandle(state, action);
    default:
      return state;
  }
};

export default reducer;

function fetchStart(state, action) {
  return updateObject(state, {
    loading: true,
    error: null,
  });
}

function fetchSuccess(state, action) {
  let newList = action.isReload
    ? action.cardList
    : state.cardList.concat(action.cardList);
  return updateObject(state, {
    cardList: newList,
    loaded: true,
    error: null,
    loading: false,
  });
}

function fetchFail(state, action) {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
}

function changeInit(state, action) {
  return updateObject(state, {
    loading: true,
    error: null,
  });
}

function changeFail(state, action) {
  return updateObject(state, {
    loading: false,
    error: action.error || null,
    selectedContact: null,
  });
}

function addSuccess(state, action) {
  const newList = action.cardList;

  return updateObject(state, {
    cardList: newList,
    loaded: true,
    loading: false,
    error: null,
    selectedContact: null,
    message: action.message,
  });
}

function deleteSuccess(state, action) {
  const newList = state.cardList.filter((el) => el.id !== action.cardId);
  return updateObject(state, {
    cardList: newList,
    loaded: true,
    loading: false,
    error: null,
    message: action.message,
  });
}

function selectContactSuccess(state, action) {
  return updateObject(state, {
    selectedContact: action.contactEmail,
  });
}

function selectContactFail(state, action) {
  return updateObject(state, {
    selectedContact: null,
  });
}

function sendSuccess(state, action) {
  const newList = action.cardList;

  return updateObject(state, {
    cardList: newList,
    loaded: true,
    loading: false,
    error: null,
    message: action.message,
  });
}

function errorHandle(state, action) {
  return updateObject(state, {
    error: null,
  });
}

function messageHandle(state, action) {
  return updateObject(state, {
    message: null,
  });
}