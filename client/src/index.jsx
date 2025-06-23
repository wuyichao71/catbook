import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
// TODO (step5): import Feed, NotFound, and Profile
import NotFound from "./components/pages/NotFound";
import Feed from "./components/pages/Feed";
import Profile from "./components/pages/Profile";
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

const GOOGLE_CLIENT_ID = "679107334216-rrf9jv2ge1p784jlha06o5n2gft7tjsl.apps.googleusercontent.com";

// TODO (step5): implement router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Feed />} />
      <Route path="profile/:username?" element={<Profile />} />
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
