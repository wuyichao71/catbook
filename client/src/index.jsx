import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
// TODO (step5): import Feed, NotFound, and Profile
import NotFound from "./components/pages/NotFound";
import Feed from "./components/pages/Feed";
import Profile from "./components/pages/Profile";
import Chatbook from "./components/pages/Chatbook";
// import { BASE } from "./utilities";
// TODO (step5): uncomment the following imports from react-router-dom
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from 'react-router-dom'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_ID = "652128607404-rkv0o9ma7cqrlf75vlums1ga44ha59d9.apps.googleusercontent.com";
console.log(GOOGLE_CLIENT_ID);

// TODO (step5): implement router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Feed />} />
      <Route path="profile/:userId" element={<Profile />} />
      <Route path="chat/" element={<Chatbook />} />
    </Route>
  ),
  { basename: import.meta.env.VITE_BASENAME }
);
// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
