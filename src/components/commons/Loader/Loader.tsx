import React from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";


export const Loader = () => (
  <Grid
    container
    justifyContent="center"
    alignItems="center"
    direction="column"
    sx={{
      position: 'fixed',
      height: "calc(100vh - 48px)"
    }}
  >
    <CircularProgress size={200} thickness={2} disableShrink />
    <Typography variant="h5" color="primary">
      Loading...
    </Typography>
  </Grid>
);

export default Loader;
