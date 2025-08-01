import React, { useState, useEffect } from "react";
// import { useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
// import { UserContext } from "../context/UserContext";
import GithubLogin from "./GithubLogin";
// import { post, get } from "../../utilities";
import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  // const userId = useContext(UserContext);
  // const userId = props.userId;
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Catbook</div>
      <div className="NavBar-title u-inlineBlock">|</div>
      <div className="NavBar-title-red u-inlineBlock">Game</div>
      <div className="NavBar-title u-inlineBlock">book</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>

        {props.userId && (
          <Link to={`/profile/${props.userId}`} className="NavBar-link">
            Profile
          </Link>
        )}

        <Link to="/chat/" className="NavBar-link u-inlineBlock">
          Chat
        </Link>
        <Link to="/game/" className="NavBar-link u-inlineBlock">
          Game
        </Link>

        {props.userId ? (
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
