import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

export const RouterProvider: React.FC = ({ children }) => (
  <Router>{children}</Router>
);

export default RouterProvider;
