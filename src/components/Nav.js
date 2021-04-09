import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap-icons/font/bootstrap-icons.css";
import { setAuthUser } from "../actions/authUser";

function Nav(props) {
  const { authUser, users } = props;
  const handleLogout = (e) => {
    e.preventDefault();
    props.setAuthUser(null);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand fs-2" to="/">
          Would You Rather?
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5 ">
            <li className="nav-item mx-4">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item mx-4">
              <NavLink className="nav-link" to="/add">
                New Poll
              </NavLink>
            </li>
            <li className="nav-item mx-4">
              <NavLink className="nav-link" to="/leaderboard">
                Leader board
              </NavLink>
            </li>
          </ul>
          <div className="input-group d-flex  w-50">
            <div className=" d-flex justify-content-end w-75 me-5 ">
              <img
                src={users[authUser].avatarURL}
                style={{ maxWidth: "12%", height: "100%" }}
                alt="..."
              />
              <p className=" text-light fs-5 mt-4">{users[authUser].name}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-light input-group-text "
            >
              Logout <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function mapStateToProps({ users, authUser }) {
  return {
    authUser,
    users,
  };
}

export default connect(mapStateToProps, { setAuthUser })(Nav);
