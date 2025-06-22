import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
  const [login, setLogin] = useState(false);

  const handleLogin = () => {
    setLogin(true);
  };

  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Catbook</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        <Link to={`/profile`} className="NavBar-link">
          Profile
        </Link>
        <GoogleLogin onSuccess={handleLogin} onError={() => {}} className="u-inlineBlock" />
      </div>

      {/* TODO (step5): implement links to pages */}
    </nav>
  );
};

export default NavBar;
