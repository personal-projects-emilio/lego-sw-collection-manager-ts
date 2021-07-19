import React from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// declare module "@material-ui/core/styles" {
//   interface Theme {
//     custom?: any;
//   }
//   interface ThemeOptions {
//     custom?: any;
//   }
// }

const theme = createTheme({
  spacing: (factor: number) => `${factor * 0.5}em`,
  // TODO: Let the popper/modal/popover on the body or place them in the root?
  // props: {
  //   MuiPopover: {
  //     container: document.getElementById("root"),
  //   },
  // },
});

export const RouterProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default RouterProvider;
