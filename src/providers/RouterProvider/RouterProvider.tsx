import React from "react";
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import history from "appHistory";

export const RouterProvider: React.FC = ({ children }) => (
  <HistoryRouter basename={process.env.PUBLIC_URL} history={history}>{children}</HistoryRouter>
);

export default RouterProvider;
