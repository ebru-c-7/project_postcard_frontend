import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import LeftNavBar from "../components/shared/LeftNavBar";
import TableItem from "../components/contact/TableItem";
import FormItem from "../components/shared/FormItem";
import EditModule from "../components/contact/EditModule";
import ErrorModal from "../components/shared/ErrorModal";
import MessageBox from "../components/shared/MessageBox";

import Spinner from "react-bootstrap/Spinner";

import "../assets/style/Contact.css";
import bookImg from "../assets/images/svg/phone-book.svg";
import * as actions from "../store/actions/index";

class Contact extends PureComponent {
  state = {
    formInfo: [
      {
        label: "Contact Name",
        name: "name",
        type: "text",
        placeholder: "Enter Name",
        required: true,
        feedback: "Please enter a contact name.",
      },
      {
        label: "Email address",
        name: "email",
        type: "email",
        placeholder: "Enter email",
        required: true,
        feedback: "Please enter a valid e-mail address.",
      },
      {
        label: "Note",
        name: "note",
        type: "text",
        placeholder: "Opt. any note for the contact",
        required: false,
        feedback: "",
      },
    ],
    showEditModal: false,
  };

  componentDidMount() {
    if (!this.props.IsLoaded) {
      this.props.onFetchContacts(this.props.token);
    }
  }

  showEditModalHandler = () => this.setState({ showEditModal: true });

  closeEditModalHandler = () => {
    this.setState({ showEditModal: false });
    this.props.onEditCancel();
  };

  deleteContactHandler = (contactId) => {
    this.props.onDeleteContact(this.props.token, contactId);
  };

  editContactHandler = (contactId) => {
    this.props.onFetchContact(this.props.token, contactId);
    this.showEditModalHandler();
  };

  render() {
    let first = (
      <FormItem
        logo={bookImg}
        data={this.state.formInfo}
        title="Create Contact"
        mode="contact"
      ></FormItem>
    );

    let second = (
      <TableItem
        contacts={this.props.IsLoaded ? this.props.contactList : []}
        methods={{
          deleteHandler: this.deleteContactHandler,
          editHandler: this.editContactHandler,
        }}
      />
    );

    let editModule =
      this.state.showEditModal && this.props.selectedContact ? (
        <EditModule
          contact={this.props.selectedContact}
          show={this.state.showEditModal}
          hide={this.closeEditModalHandler}
        />
      ) : null;

    let modals = (
      <React.Fragment>
        <ErrorModal
          show={!!this.props.error}
          onHide={this.props.onErrorHandle}
          errorMessage={this.props.error}
        />
        <MessageBox
          show={!!this.props.message}
          onHide={this.props.onMessageHandle}
          message={this.props.message}
        />
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {!this.props.isLogged && <Redirect to="/" />}
        {modals}
        <h4>Contacts</h4>
        {this.props.isLoading ? (
          <Spinner animation="border" role="status" variant="warning">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : null}
        <LeftNavBar
          titles={["Create Contact", "Saved Contacts"]}
          tabs={[first, second]}
          defaultTab={"create-contact"}
        />
        {editModule}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    contactList: state.contact.contactList,
    IsLoaded: state.contact.loaded,
    isLoading: state.contact.loading,
    error: state.contact.error,
    selectedContact: state.contact.selectedContact,
    message: state.contact.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchContacts: (token) => dispatch(actions.fetchContacts(token)),
    onFetchContact: (token, contactId) =>
    dispatch(actions.fetchContact(token, contactId)),
    onDeleteContact: (token, contactId) =>
      dispatch(actions.deleteContact(token, contactId)),
    onErrorHandle: () => dispatch(actions.errorHandleContact()),
    onMessageHandle: () => dispatch(actions.messageHandleContact()),
    onEditCancel: () => dispatch(actions.changeFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
