import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { post } from "../../utilities";
import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (res) => {
  const [loginState, setLoginState] = useState(false);

  const handleLogin = (res) => {
    const userToken = res.credential;
    post("/api/login", { token: userToken }).then((user) => {
      console.log(user);
    });
    setLoginState(true);
    // console.log(res);
  };

  const handleLogout = () => {
    post("/api/logout", {}).then((user) => {
      console.log(user);
    });
    setLoginState(false);
  };

  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Catbook</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        <Link to="/profile" className="NavBar-link">
          Profile
        </Link>
        {loginState ? (
          <button onClick={handleLogout} className="NavBar-logoutButton">
            Log out
          </button>
        ) : (
          <GoogleLogin
            text="signin_with"
            onSuccess={handleLogin}
            onError={(err) => {
              console.log(err);
            }}
            containerProps={{ className: "NavBar-link NavBar-login u-inlineBlock" }}
          />
        )}
      </div>

      {/* TODO (step5): implement links to pages */}
    </nav>
  );
};

export default NavBar;
