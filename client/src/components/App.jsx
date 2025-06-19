import React from "react";
import NavBar from "./modules/NavBar";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
// TODO (step0): import Feed
// TODO (step5): import Outlet
import { Outlet } from "react-router-dom";

// To use styles, import the necessary CSS files
import "../utilities.css";
import "./App.css";

/**
 * Define the "App" component as a function.
 */
const App = () => {
  return (
    // <> is like a <div>, but won't show
    // up in the DOM tree
    <>
      <NavBar />
      <div className="App-container">
        <Outlet />
      </div>
    </>
  );
};

export default App;
