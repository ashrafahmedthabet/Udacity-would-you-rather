import React from "react";
import { NavLink } from "react-router-dom";

function NoMatch() {
  return (
    <div className="container text-center mt-5">
      <h2>No Match 404 Error</h2>
      <p className="fs-4 mt-5">
        Nothing to see here. Please use the navbar to Move between pages or go
        to Home from <NavLink to="/">Here</NavLink>.
      </p>
    </div>
  );
}

export default NoMatch;
