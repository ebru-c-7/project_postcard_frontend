import * as actions from "../actions/actionTypes";
import { updateObject } from "../actions/Utility";

const initialState = {
  contactList: [],
  loaded: false,
  error: null,
  loading: false,
  selectedContact: null,
  message: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_CONTACTS_START:
      return fetchStart(state, action);
    case actions.FETCH_CONTACTS_SUCCESS:
      return fetchSuccess(state, action);
    case actions.FETCH_CONTACT_SUCCESS:
      return fetchOneSuccess(state, action);
    case actions.FETCH_CONTACTS_FAIL:
      return fetchFail(state, action);
    case actions.CONTACT_LIST_CHANGE_INIT:
      return changeInit(state, action);
    case actions.CONTACT_LIST_CHANGE_FAIL:
      return changeFail(state, action);
    case actions.ADD_CONTACT_SUCCESS:
      return addSuccess(state, action);
    case actions.DELETE_CONTACT_SUCCESS:
      return deleteSuccess(state, action);
    case actions.EDIT_CONTACT_SUCCESS:
      return editSuccess(state, action);
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
  return updateObject(state, {
    contactList: action.contactList,
    loaded: true,
    error: null,
    loading: false,
  });
}

function fetchOneSuccess(state, action) {
  return updateObject(state, {
    selectedContact: action.contact,
    error: null,
    loading: false,
  });
}

function fetchFail(state, action) {
  return updateObject(state, {
    loading: false,
    error: action.error,
    selectedContact: null,
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
  const newList = state.contactList.concat(action.contact);
  return updateObject(state, {
    contactList: newList,
    message: action.message,
    loaded: true,
    loading: false,
    error: null,
  });
}

function deleteSuccess(state, action) {
  const newList = state.contactList.filter((el) => el.id !== action.contactId);
  return updateObject(state, {
    contactList: newList,
    loaded: true,
    loading: false,
    error: null,
    message: action.message,
  });
}

function editSuccess(state, action) {
  const editedContactList = state.contactList.map((el) => {
    if (el.id !== action.contact.id) {
      return el;
    }
    return action.contact;
  });
  return updateObject(state, {
    contactList: editedContactList,
    message: action.message,
    selectedContact: null,
    loading: false,
    error: null,
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