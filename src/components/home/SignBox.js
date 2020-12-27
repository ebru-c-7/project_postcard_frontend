import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";

import ButtonGroup from "./ButtonGroup";

import * as actions from "../../store/actions/index";
import owlImg from "../../assets/images/svg/owl-2.svg";

const SIGN_UP = "SIGN_UP";
const LOG_IN = "LOG_IN";

class SignBox extends Component {
  state = {
    validated: false,
    mode: SIGN_UP,
  };

  modeToggleHandler = (event) => {
    const prevMode = this.state.mode;
    const newMode = prevMode === SIGN_UP ? LOG_IN : SIGN_UP;
    this.setState({ mode: newMode });
  };

  validityHandler = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    this.setState({ validated: true });
    if (form.checkValidity() === false) {
      return;
    }
    this.submitHandler(event.target);
  };

  submitHandler = (form) => {
    const email = form["email"].value;
    const password = form["password"].value;
    console.log(email, password);
    if (this.state.mode === SIGN_UP) {
      const username = form["username"].value;
      this.props.onSignUp(email, password, username);
    } else {
      this.props.onLogIn(email, password);
    }
    this.setState({ validated: false });
  };

  render() {
    let userName =
      this.state.mode === SIGN_UP ? ( //user name box will be added for sign up
        <Form.Group>
          <Form.Label>User Name</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Choose username"
            required
            minLength="4"
          />
          <Form.Control.Feedback type="invalid">
            Please choose a username with min 5 chars.
          </Form.Control.Feedback>
        </Form.Group>
      ) : null;

    let box = this.props.isLogged ? (
        <h3>Welcome <em>{this.props.username}</em>, Let's Start!</h3>
    ) : (
      <Form
        noValidate
        validated={this.state.validated}
        onSubmit={this.validityHandler}
        action="POST"
      >
        <header>
          <img className="form-logo" src={owlImg} alt="form logo" />
          <h4 style={{ display: "inline-block" }}>{this.props.children}</h4>
        </header>
        {userName}
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid e-mail address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength="5"
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid password with min 5 chars.
          </Form.Control.Feedback>
        </Form.Group>
        <ButtonGroup
          isLoading={this.props.isLoading}
          modeToggleHandler={this.modeToggleHandler}
          mode={this.state.mode}
        />
      </Form>
    );

    return box;
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.token !== null,
    username: state.auth.username,
    isLoading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (email, passw, name) =>
      dispatch(actions.signup(email, passw, name)),
    onLogIn: (email, passw) => dispatch(actions.login(email, passw)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignBox);
