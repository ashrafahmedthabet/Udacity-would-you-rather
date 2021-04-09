import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { handleInitialData } from "./actions/shared";
import { connect } from "react-redux";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Home from "./components/Home";
import UserCard from "./components/UserCard";
import NewQuestion from "./components/NewQuestion";
import Leaderboard from "./components/Leaderboard";
import NoMatch from "./components/NoMatch";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authUser } = this.props;
    return (
      <Router>
        <div className="App">
          {authUser === null ? (
            <Route
              render={() => (
                <div className="container">
                  <Login />
                </div>
              )}
            />
          ) : (
            <Fragment>
              <Nav/>
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/questions/bad_id" component={NoMatch} />
                  <Route path="/questions/:question_id" component={UserCard} />
                  <Route path="/add" component={NewQuestion} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route component={NoMatch} />
                </Switch>
              </div>
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}
function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleInitialData })(App);
