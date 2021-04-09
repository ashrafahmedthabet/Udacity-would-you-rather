import React, { Component} from "react";
import { connect } from "react-redux";
import { setAuthUser } from "../actions/authUser";

class Login extends Component {
  state = {
    value: "",
    loading: false,
  };
  handleLoading = () => {
    this.setState({ loading: true });
  };
  onChange = (e) => {
    this.setState({ value: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { setAuthUser } = this.props;
    const authUser = this.state.value;
    setAuthUser(authUser);
  };

  authorizeUser = () => {};
  render() {
    const { users } = this.props;
    return (
      <div className="card  col-lg-6 col-md-10 col-sm-10 mx-auto">
        <div className="card-header text-center">
          <h4>Welcome to the Would You Rather App!</h4>
          <span>Please sign in to continue</span>
        </div>
        <div className="card-body">
          <img
            src="/images/redux.png"
            className="rounded mx-auto d-block w-75"
            alt="..."
          />
          <p className="text-center fs-3 mt-2">Sign In</p>
          <form onSubmit={this.handleSubmit}>
            <select
              className="form-select"
              aria-label="Default select example"
              value={this.state.value}
              onChange={this.onChange}
              required
            >
              <option value="" disabled hidden>
                Open this select menu
              </option>
              {users.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
            <div className="d-grid gap-2 mt-3">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={this.state.value === "" ? true : false}
              >
                LogIn
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}

export default connect(mapStateToProps, { setAuthUser })(Login);
