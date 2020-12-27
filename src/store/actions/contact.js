import * as actions from "./actionTypes";
import axios from "axios";

const fetchStart = () => ({ type: actions.FETCH_CONTACTS_START });

const fetchFail = (error) => ({
  type: actions.FETCH_CONTACTS_FAIL,
  error,
});

const fetchSuccess = (contactList) => ({
  type: actions.FETCH_CONTACTS_SUCCESS,
  contactList,
});

const fetchOneSuccess = (contact) => ({
  type: actions.FETCH_CONTACT_SUCCESS,
  contact,
});

const changeInit = () => ({ type: actions.CONTACT_LIST_CHANGE_INIT });

export const changeFail = (error) => ({
  type: actions.CONTACT_LIST_CHANGE_FAIL,
  error: error || null,
});

const addSuccess = (contact, message) => ({
  type: actions.ADD_CONTACT_SUCCESS,
  contact,
  message,
});

const editSuccess = (contact, message) => ({
  type: actions.EDIT_CONTACT_SUCCESS,
  contact,
  message,
});

const deleteSuccess = (contactId, message) => ({
  type: actions.DELETE_CONTACT_SUCCESS,
  contactId,
  message,
});

export const fetchContacts = (token) => {
  return (dispatch) => {
    dispatch(fetchStart());
    const url = `${process.env.REACT_APP_BACKEND_URL}/contact/contacts`;
    const headers = { Authorization: "Bearer " + token };

    axios
      .get(url, { headers })
      .then((response) => {
        console.log(response);
        const contacts = response.data.contacts;
        dispatch(fetchSuccess(contacts));
      })
      .catch((error) => {
        dispatch(fetchFail(error.response.data.message));
      });
  };
};

export const fetchContact = (token, contactId) => {
  console.log(token, contactId);
  return (dispatch) => {
    dispatch(fetchStart());
    const url = `${process.env.REACT_APP_BACKEND_URL}/contact/`;
    const params = contactId;
    const headers = { Authorization: "Bearer " + token };

    axios
      .get(url + params, { headers })
      .then((response) => {
        console.log(response);
        const contact = response.data.contact;
        dispatch(fetchOneSuccess(contact));
      })
      .catch((error) => {
        dispatch(fetchFail(error.response.data.message));
      });
  };
};

export const addContact = (token, contact) => {
  return (dispatch) => {
    dispatch(changeInit());
    const url = `${process.env.REACT_APP_BACKEND_URL}/contact/`;
    const body = { ...contact }; //name, email, note
    const headers = { Authorization: "Bearer " + token };

    axios
      .post(url, body, { headers })
      .then((response) => {
        console.log(response);
        const contact = response.data.contact;
        const message = response.data.message;
        dispatch(addSuccess(contact, message));
      })
      .catch((error) => {
        dispatch(changeFail(error.response.data.message));
      });
  };
};

export const editContact = (token, contactId, contact) => {
  return (dispatch) => {
    dispatch(changeInit());
    const url = `${process.env.REACT_APP_BACKEND_URL}/contact/`;
    const params = contactId;
    const body = { ...contact }; //name, email, note
    const headers = { Authorization: "Bearer " + token };

    axios
      .patch(url + params, body, { headers })
      .then((response) => {
        console.log(response);
        const contact = response.data.contact;
        const message = response.data.message;
        dispatch(editSuccess(contact, message));
      })
      .catch((error) => {
        dispatch(changeFail(error.response.data.message));
      });
  };
};

export const deleteContact = (token, contactId) => {
  return (dispatch) => {
    dispatch(changeInit());
    const url = `${process.env.REACT_APP_BACKEND_URL}/contact/`;
    const params = contactId;
    const headers = { Authorization: "Bearer " + token };

    axios
      .delete(url + params, { headers })
      .then((response) => {
        console.log(response);
        const message = response.data.message;
        dispatch(deleteSuccess(contactId, message));
      })
      .catch((error) => {
        dispatch(changeFail(error.response.data.message));
      });
  };
};

export const errorHandleContact = () => ({ type: actions.ERROR_HANDLE });

export const messageHandleContact = () => ({ type: actions.MESSAGE_HANDLE });
