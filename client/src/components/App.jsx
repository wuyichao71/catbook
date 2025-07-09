import React, { useState, useEffect } from "react";
import NavBar from "./modules/NavBar";
// import Profile from "./pages/Profile";
// import Feed from "./pages/Feed";
// TODO (step0): import Feed
// TODO (step5): import Outlet
import { Outlet } from "react-router-dom";
import { get, post } from "../utilities";
import { socket } from "../socket-client";
// import { UserContext } from "./context/UserContext";

// To use styles, import the necessary CSS files
import "../utilities.css";
import "./App.css";

/**
 * Define the "App" component as a function.
 */
const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(res);

    const userToken = res.credential;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketId: socket.id });
      window.location.href = import.meta.env.VITE_BASENAME;
    });
  };

  const handleLogout = () => {
    console.log("Logged out successfully!");
    post("/api/logout", {}).then((user) => {
      // console.log(user.name);
      setUserId(null);
    });
  };

  // const handleGithubLogin = () => {
  //   get("/api/auth/github").then((res) => {
  //     console.log(res);
  //   });
  // };

  return (
    // <> is like a <div>, but won't show
    // up in the DOM tree
    // <>
    // <UserContext.Provider value={userId}>
    <>
      <NavBar
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userId={userId}
        // handleGithubLogin={handleGithubLogin}
      />
      <div className="App-container">
        <Outlet context={{ userId: userId }} />
      </div>
    </>
    // </UserContext.Provider>
    // </>
  );
};

export default App;
