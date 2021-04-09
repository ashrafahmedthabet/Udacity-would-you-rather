import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Tab } from "semantic-ui-react";
import UserCard from "./UserCard";

function Home(props) {
  const { userQuestionData } = props;
  return (
    <div className="container">
      <div className="my-5 col-lg-6 col-md-9 col-sm-12 mx-auto">
        <Tab panes={Taps({ userQuestionData })} className="tab" />
      </div>
    </div>
  );
}
const Taps = (props) => {
  const { userQuestionData } = props;
  return [
    {
      menuItem: "Unanswered",
      render: () => (
        <Tab.Pane>
          {userQuestionData.answered.map((question) => (
            <UserCard
              key={question.id}
              question_id={question.id}
              unanswered={true}
            />
          ))}
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Answered",
      render: () => (
        <Tab.Pane>
          {userQuestionData.unanswered.map((question) => (
            <UserCard
              key={question.id}
              question_id={question.id}
              unanswered={false}
            />
          ))}
        </Tab.Pane>
      ),
    },
  ];
};

function mapStateToProps({ authUser, users, questions }) {
  const answeredIds = Object.keys(users[authUser].answers);
  const answered = Object.values(questions)
    .filter((question) => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter((question) => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    userQuestionData: {
      answered,
      unanswered,
    },
  };
}
Home.propTypes = {
  userQuestionData: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Home);
