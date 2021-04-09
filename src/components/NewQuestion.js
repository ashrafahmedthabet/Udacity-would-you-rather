import React, { Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../actions/questions";

class NewQuestion extends Component {
  state = {
    option1: "",
    option2: "",
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { authUser, handleSaveQuestion } = this.props;
    const { option1, option2 } = this.state;
    await handleSaveQuestion(option1, option2, authUser);
    this.setState({
      option1: "",
      option2: "",
    });
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="card mt-5">
        <div className="card-header">
          <h4>Create a New Question</h4>
        </div>
        <div className="card-body">
          <p>Complete the question:</p>
          <p>
            <strong>Would you rather...</strong>
          </p>
          <form onSubmit={this.handleSubmit}>
            <input
              className="form-control mt-3"
              type="text"
              name="option1"
              value={this.state.option1}
              onChange={this.handleChange}
              required
              placeholder="Enter option one..."
              aria-label="default input example"
              maxLength="60"
            />
            <p className="text-center fw-bold my-3">OR</p>
            <input
              className="form-control"
              type="text"
              name="option2"
              value={this.state.option2}
              onChange={this.handleChange}
              placeholder="Enter option two..."
              aria-label="default input example"
              maxLength="60"
            />
            <div className="d-grid gap-2 mt-4">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={
                  this.state.option1 === "" || this.state.option2 === ""
                }
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}
NewQuestion.propTypes = {
  authUser: PropTypes.string.isRequired,
  handleSaveQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { handleSaveQuestion })(NewQuestion);
