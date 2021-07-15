import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useAppSelector } from "hooks/store";
import { selectMinifigsList } from "store/minifigs";

const useStyles = makeStyles(() =>
  createStyles({
    loader: {
      position: "fixed",
      height: "calc(100vh - 48px)",
    },
  })
);

export const MinifigsList = () => {
  const minifigsList = useAppSelector(selectMinifigsList);
  const classes = useStyles();

  if (!Array.isArray(minifigsList)) return null;

  if (minifigsList.length === 0)
    return (
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
        className={classes.loader}
      >
        <Typography align="center" variant="h6">
          There are no minifigs with those filters
        </Typography>
        {/* TODO: Add reset filters action */}
        <Button variant="contained">Reset filters</Button>
      </Grid>
    );

  return (
    <>
      <Grid item xs={12}>
        Pagination
      </Grid>
      {minifigsList.slice(0, 10).map((minifig) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={minifig.id}>
          {/* <Minifig {...minifig} /> */}
          {minifig.id}
        </Grid>
      ))}
      <Grid item xs={12}>
        Pagination
      </Grid>
    </>
  );
};

export default MinifigsList;
