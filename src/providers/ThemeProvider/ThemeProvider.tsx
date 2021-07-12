import React from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme();

export const RouterProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default RouterProvider;
