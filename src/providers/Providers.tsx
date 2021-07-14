import React from "react";
import RouterProvider from "./RouterProvider";
import ThemeProvider from "./ThemeProvider";
import StoreProvider from "./StoreProvider";

export const Providers: React.FC = ({ children }) => (
  <RouterProvider>
    <StoreProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StoreProvider>
  </RouterProvider>
);

export default Providers;
