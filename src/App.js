import React, { Component, Suspense, lazy } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import NavBar from "./components/shared/NavBar";
import ErrorModal from "./components/shared/ErrorModal";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import * as actions from "./store/actions/index";

const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const Card = lazy(() => import("./pages/Card"));
const PublicCard = lazy(() => import("./pages/PublicCard"));

class App extends Component {
  componentDidMount() {
    this.props.onAutoLogin();
  }
  
  render() {
    let routes = (
      <Switch>
        <Route
          path="/contact"
          render={(props) => {
            return <Contact {...props} isLogged={!!this.props.token} />;
          }}
        />
        <Route
          path="/card/:card/:contact"
          render={(props) => <PublicCard {...props} />}
        />
        <Route
          path="/card"
          render={(props) => <Card {...props} isLogged={!!this.props.token} />}
        />
        <Route path="/" exact>
          <Home isLoading={this.props.isLoading} />
        </Route>
        <Redirect to="/" />
      </Switch>
    );

    return (
      <Suspense fallback={<p>Loading…</p>}>
        <div className="App">
          <ErrorModal
            show={!!this.props.error}
            onHide={this.props.onErrorHandle}
            errorMessage={this.props.error}
          />
          <NavBar
            isLogged={!!this.props.token}
            onLogout={this.props.onLogout}
          />
          {routes}
        </div>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    error: state.auth.error,
    isLoading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onErrorHandle: () => dispatch(actions.errorHandleAuth()),
    onAutoLogin: () => dispatch(actions.autoLogin()),
    onLogout: () => dispatch(actions.logout()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
