import React from "react";
import RouterProvider from "./RouterProvider";
import ThemeProvider from "./ThemeProvider";

export const Providers: React.FC = ({ children }) => (
  <RouterProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </RouterProvider>
);

export default Providers;
