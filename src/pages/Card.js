import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import LeftNavBar from "../components/shared/LeftNavBar";
import CardItem from "../components/card/CardItem";
import FormItem from "../components/shared/FormItem";
import ContactModule from "../components/card/ContactModule";
import ErrorModal from "../components/shared/ErrorModal";
import MessageBox from "../components/shared/MessageBox";

import Spinner from "react-bootstrap/Spinner";

import "../assets/style/Card.css";
import postalImg from "../assets/images/svg/postal-2.svg";
import * as actions from "../store/actions/index";

class Card extends Component {
  state = {
    formInfo: [
      {
        label: "Beginning",
        name: "begin",
        type: "text",
        placeholder: "Fx, Dear Sam",
        required: true,
        feedback: "Should not be empty",
        maxLength: "15",
      },
      {
        label: "Body",
        name: "body",
        type: "text",
        placeholder: "Body of the card",
        required: true,
        feedback: "Should not be empty",
        as: "textarea",
        rows: "4",
        maxLength: "250",
      },
      {
        label: "End",
        name: "end",
        type: "text",
        placeholder: "Fx, Love Frannie",
        required: true,
        feedback: "Should not be empty",
        maxLength: "25",
      },
      {
        label: "Send now",
        name: "type",
        as: "checkbox",
      },
    ],
    showContactModule: false,
  };

  componentDidMount() {
    if (!this.props.isLoaded) {
      console.log("componentdidmount", this.props.token);
      this.props.onFetchCards(this.props.token);
    }
  }

  componentWillUnmount() {
    this.props.onChangeFailCard();
  }

  showContactModalHandler = () => {
    this.setState({ showContactModule: true });
  };

  closeContactModalHandler = () => {
    this.setState({ showContactModule: false });
    // if (this.props.selectedContact) {
    //   this.props.onCancelSelectCardContact();
    // }
  };

  deleteCardHandler = (cardId) => {
    console.log("delete for ", cardId);
    this.props.onDeleteCard(this.props.token, cardId);
  };

  fetchContactsHandler = () => {
    if (!this.props.isContactsLoaded) {
      this.props.onFetchContacts(this.props.token);
    }
    this.showContactModalHandler();
  };

  selectHandler = (email) => {
    this.props.onSelectCardContact(email);
    this.setState({ showContactModule: false });
  };

  sendCardHandler = (cardId) => {
    console.log("cardId: ", cardId);
    this.props.onSendSavedCard(this.props.token, cardId);
  };

  render() {
    let cardForm = (
      <FormItem
        logo={postalImg}
        data={this.state.formInfo}
        title="Create Card"
        imgElement={true}
        mode="card"
        fetchContactsHandler={this.fetchContactsHandler}
        selectedContact={this.props.selectedContact}
      />
    );

    let savedCardsList = this.props.cardList.filter((el) => el.type === false);

    let savedCards = (
      <CardItem
        id="saved-cards-container"
        cards={savedCardsList}
        methods={{
          deleteHandler: this.deleteCardHandler,
          sendCardHandler: this.sendCardHandler,
        }}
        type={false}
      />
    );
    let sentCardsList = this.props.cardList.filter((el) => el.type === true);

    let sentCards = (
      <CardItem
        id="sent-cards-container"
        methods={{
          deleteHandler: this.deleteCardHandler,
        }}
        cards={sentCardsList}
        type={true}
      />
    );

    let contactModule = this.state.showContactModule ? (
      <ContactModule
        contactList={this.props.contactList}
        show={this.state.showContactModule}
        hide={this.closeContactModalHandler}
        selectHandler={this.selectHandler}
      />
    ) : null;

    let modals = (
      <React.Fragment>
        <ErrorModal
          show={!!this.props.error}
          onHide={this.props.onErrorHandle}
          errorMessage={this.props.error}
        />
        <ErrorModal
          show={!!this.props.errorContacts}
          onHide={this.props.onErrorHandleContact}
          errorMessage={this.props.errorContacts}
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
        <h4>Cards</h4>
        {this.props.isLoading ? (
          <Spinner animation="border" role="status" variant="warning">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : null}
        <LeftNavBar
          titles={["Create Card", "Saved Cards", "Sent Cards"]}
          tabs={[cardForm, savedCards, sentCards]}
          defaultTab={"create-card"}
        />
        {contactModule}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    cardList: state.card.cardList,
    IsLoaded: state.card.loaded,
    isLoading: state.card.loading,
    message: state.card.message,
    error: state.card.error,
    errorContacts: state.contact.error,
    contactList: state.contact.contactList, //for contact book
    isContactsLoaded: state.contact.loaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCards: (token) => dispatch(actions.fetchCards(token)),
    onAddCard: (card) => dispatch(actions.addCard(card)),
    onDeleteCard: (token, cardId) =>
      dispatch(actions.deleteCard(token, cardId)),
    onMessageHandle: () => dispatch(actions.messageHandleCard()),
    onFetchContacts: (token) => dispatch(actions.fetchContacts(token)),
    onSendSavedCard: (token, cardId) =>
      dispatch(actions.sendSavedCard(token, cardId)),
    onSelectCardContact: (email) => dispatch(actions.selectCardContact(email)),
    onCancelSelectCardContact: () =>
      dispatch(actions.cancelSelectCardContact()),
    onErrorHandle: () => dispatch(actions.errorHandleCard()),
    onErrorHandleContact: () => dispatch(actions.errorHandleContact()),
    onChangeFailCard: () => dispatch(actions.changeFailCard()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
