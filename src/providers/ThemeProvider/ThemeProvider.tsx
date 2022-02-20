import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// declare module '@mui/material/styles' {
//   interface Theme {
//     status: {
//       danger: string;
//     };
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     status?: {
//       danger?: string;
//     };
//   }
// }
const theme = createTheme({
  spacing: (factor: number) => `${factor * 0.5}em`,
  palette: {
    mode: 'dark'
  }
  // TODO: Let the popper/modal/popover on the body or place them in the root?
  // props: {
  //   MuiPopover: {
  //     container: document.getElementById("root"),
  //   },
  // },
});

export const CustomThemeProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>
);

export default CustomThemeProvider;
