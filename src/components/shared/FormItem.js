import React, { Component } from "react";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import FormGroupItem from "./FormGroupItem";
import ImageUpload from "../card/ImageUpload";
import ContactButton from "../card/ContactButton";

import * as actions from "../../store/actions/index";
import "../../assets/style/Home.css";
import "../../assets/style/Card.css";

class FormItem extends Component {
  state = {
    validated: false,
    imgFile: null,
  };

  validityHandler = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    this.setState({ validated: true });
    if (this.props.mode === "card") {
      if (
        form.checkValidity() === false ||
        !this.props.selectedContactCard ||
        !this.state.imgFile
      ) {
        return;
      }
      this.setState({ imgFile: null, validated: false });
    } else if (this.props.mode === "contact") {
      if (form.checkValidity() === false) {
        return;
      }
    }
    // window.location.reload(false);
    this.submitHandler(event);
  };

  submitHandler = (event) => {
    let form = event.currentTarget;
    if (this.props.mode === "contact") {
      const newContact = {
        name: form["name"].value,
        email: form["email"].value,
        note: form["note"].value,
      };
      console.log(newContact);
      if (this.props.selectedContact) {
        console.log("new contact:", newContact);
        this.props.onEditContact(
          this.props.token,
          this.props.selectedContact.id,
          newContact
        );
      } else {
        this.props.onAddContact(this.props.token, newContact);
      }
    } else if (this.props.mode === "card") {
      console.log(form, form["body"].value);
      const newCard = {
        image: this.state.imgFile,
        contactEmail: this.props.selectedContactCard,
        begin: form["begin"].value,
        body: form["body"].value,
        end: form["end"].value,
        type: form["type"].checked,
      };
      console.log("newCard", newCard);
      this.props.onAddCard(this.props.token, newCard);
    }
    event.target.reset();
    this.setState({ validated: false });
  };

  contactButtonHandler = () => {
    this.props.fetchContactsHandler();
  };

  render() {
    const imageModule = this.props.imgElement && this.props.mode === "card" && (
      <ImageUpload
        fileHandler={(file) => {
          this.setState({ imgFile: file });
        }}
        value={this.state.imgFile}
      />
    );

    return (
      <React.Fragment>
        {(this.props.logo || this.props.title) && (
          <header>
            <img className="form-logo" src={this.props.logo} alt="form logo" />
            <h4 style={{ display: "inline-block" }}>{this.props.title}</h4>
          </header>
        )}
        <hr />
        {this.props.mode === "card" ? (
          <ContactButton
            selectedContact={this.props.selectedContactCard}
            isContactsLoading={this.props.isContactsLoading}
            contactButtonHandler={this.contactButtonHandler}
          />
        ) : null}
        <div>
          <Form
            noValidate
            validated={this.state.validated}
            onSubmit={this.validityHandler}
            // action="POST"
          >
            {this.props.data.map((item, i) => (
              <FormGroupItem key={i} data={item} />
            ))}
            {imageModule}
            <Button
              variant="primary"
              type="submit"
              disabled={this.props.isLoading}
            >
              {this.props.isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : null}
              Submit
            </Button>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contactList: state.contact.contactList,
    token: state.auth.token,
    isContactsLoading: state.contact.loading,
    selectedContactCard: state.card.selectedContact,
    selectedContact: state.contact.selectedContact,
    isContactsLoaded: state.contact.loaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchContacts: (token) => dispatch(actions.fetchContacts(token)),
    onAddContact: (token, contact) =>
      dispatch(actions.addContact(token, contact)),
    onAddCard: (token, card) => dispatch(actions.addCard(token, card)),
    onEditContact: (token, id, contact) =>
      dispatch(actions.editContact(token, id, contact)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormItem);
