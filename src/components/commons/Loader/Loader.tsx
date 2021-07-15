import React from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: "fixed",
      height: "calc(100vh - 48px)",
    },
  })
);

export const Loader = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      className={classes.container}
    >
      <CircularProgress size={200} thickness={2} disableShrink />
      <Typography variant="h5" color="primary">
        Loading...
      </Typography>
    </Grid>
  );
};

export default Loader;
