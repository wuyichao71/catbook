import React from "react";
import {Link} from 'react-router-dom';

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Catbook</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">Home</Link>
        <Link to="/profile" className="NavBar-link">Profile</Link>
      </div>
      {/* TODO (step5): implement links to pages */}
    </nav>
  );
};

export default NavBar;
