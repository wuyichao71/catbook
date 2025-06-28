import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "./CreateContext";
import GithubLogin from "./GithubLogin";
// import { post, get } from "../../utilities";
import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  const userId = useContext(UserContext);
  // const userId = props.userId;
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Catbook</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        {userId && (
          <Link to={`/profile/${userId}`} className="NavBar-link">
            Profile
          </Link>
        )}
        {userId ? (
          <button onClick={props.handleLogout} className="NavBar-link NavBar-loginLogout">
            Logout
          </button>
        ) : (
          <div className="u-inlineBlock NavBar-loginContainer">
            <div className="NavBar-link NavBar-loginLogout u-inlineBlock">Login</div>
            <div className="NavBar-loginBlock">
              <GoogleLogin
                text="signin_with"
                onSuccess={props.handleLogin}
                onError={(err) => {
                  console.log(err);
                }}
                containerProps={{ className: "NavBar-link NavBar-login" }}
              />
              <GithubLogin />
            </div>
          </div>
        )}
      </div>

      {/* TODO (step5): implement links to pages */}
    </nav>
  );
};

export default NavBar;
