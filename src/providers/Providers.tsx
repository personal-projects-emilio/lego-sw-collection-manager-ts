import React from "react";
import RouterProvider from "./RouterProvider";

export const Providers: React.FC = ({ children }) => (
  <RouterProvider>{children}</RouterProvider>
);

export default Providers;
