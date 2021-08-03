import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import MinifigsFilters from "./MinifigsFilters";
import MinifigsMisce from "./MinifigsMisce";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      boxSizing: "border-box",
      minHeight: `calc(100% - ${theme.spacing(4)})`,
    },
  })
);

export const MinifigsMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <MinifigsMisce />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <MinifigsFilters />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MinifigsMenu;
