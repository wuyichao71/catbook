import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
  const [loginState, setLoginState] = useState(false);

  const handleLogin = () => {
    setLoginState(true);
  };

  const handleLogout = () => {
    setLoginState(false);
  };

  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Catbook</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link u-inlineBlock">
          Home
        </Link>
        <Link to={`/profile`} className="NavBar-link u-inlineBlock">
          Profile
        </Link>
        {loginState ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => {}}
            containerProps={{ className: "u-link u-inlineBlock" }}
          />
        )}
      </div>

      {/* TODO (step5): implement links to pages */}
    </nav>
  );
};

export default NavBar;
