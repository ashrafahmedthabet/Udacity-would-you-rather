import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Header,
  Segment,
  Progress,
  Label,
  Button,
  Icon,
} from "semantic-ui-react";
import { styles } from "../utils/helpers";

const YourVoteLabel = () => (
  <Label color="orange" ribbon="right" className="vote">
    <Icon name="check circle outline" size="big" className="compact" />
    <div style={{ float: "right" }}>
      Your
      <br />
      Vote
    </div>
  </Label>
);
function PollResult(props) {
  const handleClick = () => {
    props.history.push("/");
  };
  const { question, user } = props;
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const votesTotal = optionOneVotes + optionTwoVotes;
  const userVote = user.answers[question.id];
  let option1 = styles.secondary,
    option2 = styles.secondary;
  if (optionOneVotes > optionTwoVotes) {
    option1 = styles.primary;
  } else if (optionTwoVotes > optionOneVotes) {
    option2 = styles.primary;
  }
  return (
    <Fragment>
      <h3>
        Results:
        <Header.Subheader style={{ fontWeight: "bold" }}>
          Would you rather
        </Header.Subheader>
      </h3>
      <Segment
        color={option1.color}
        style={{ backgroundColor: `${option1.bgColor}` }}
      >
        {userVote === "optionOne" && <YourVoteLabel />}
        <p style={{ fontWeight: "bold" }}>{question.optionOne.text}</p>
        <Progress
          percent={((optionOneVotes / votesTotal) * 100).toFixed(2)}
          color={option1.color}
        />
      </Segment>
      <Segment
        color={option2.color}
        style={{ backgroundColor: `${option2.bgColor}` }}
      >
        {userVote === "optionTwo" && <YourVoteLabel />}

        <p style={{ fontWeight: "bold" }}>{question.optionTwo.text}</p>
        <Progress
          percent={((optionTwoVotes / votesTotal) * 100).toFixed(2)}
          color={option2.color}
        />
      </Segment>

      <Button size="tiny" floated="right" onClick={handleClick}>
        Back
      </Button>
    </Fragment>
  );
}
function mapStateToProps({ users, authUser }) {
  const user = users[authUser];
  return {
    user,
  };
}
PollResult.propTypes = {
  history: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps)(PollResult));
