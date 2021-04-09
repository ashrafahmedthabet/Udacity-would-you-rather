import React from "react";
import { connect } from "react-redux";
function Leaderboard(props) {
  const { leaderboardData } = props;
  return (
    <table className="table table-striped table-hover table-bordered mt-5 ">
      <thead>
        <tr className="text-center">
          <th scope="col">SCORE</th>
          <th scope="col">USER</th>
          <th scope="col">ANSWERED QUESTIONS</th>
          <th scope="col">CREATED QUESTIONS</th>
        </tr>
      </thead>
      <tbody>
        {leaderboardData.map((user) => (
          <tr key={user.id}>
            <th className="text-center" scope="row">
              {user.questionCount + user.answerCount}
            </th>
            <td className="d-flex flex-row">
              <img
                src={user.avatarURL}
                style={{ maxWidth: "50%", height: "30px" }}
                alt="..."
              />
              <p className="mx-4">{user.name}</p>
            </td>
            <td className="text-center">{user.answerCount}</td>
            <td className="text-center">{user.questionCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
function mapStateToProps({ users }) {
  const leaderboardData = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3);
  return {
    leaderboardData,
  };
}

export default connect(mapStateToProps)(Leaderboard);
