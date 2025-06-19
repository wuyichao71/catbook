import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
// TODO (step5): import Feed, NotFound, and Profile
import NotFound from "./components/pages/NotFound";
import Feed from "./components/pages/Feed";
import Profile from "./components/pages/Profile";
import { BASE } from "./utilities";
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

// TODO (step5): implement router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={BASE} errorElement={<NotFound />} element={<App />}>
      <Route path={`${BASE}/`} element={<Feed />} />
      <Route path={`${BASE}/profile/:username?`} element={<Profile />} />
    </Route>
  )
);
// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
