import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useAppDispatch, useAppSelector } from "hooks/store";
import {
  selectPaginatedMinifigsList,
  resetMinifigsFilters,
} from "store/minifigs";
import MinifigsPagination from "../MinifigsPagination";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    resetFilters: {
      marginTop: theme.spacing(2),
    },
  })
);

export const MinifigsList = () => {
  const paginatedMinifigsList = useAppSelector(selectPaginatedMinifigsList);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  if (!Array.isArray(paginatedMinifigsList)) return null;

  if (paginatedMinifigsList.length === 0)
    return (
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
        className={classes.resetFilters}
      >
        <Typography align="center" variant="h6">
          There are no minifigs with those filters
        </Typography>
        <Button
          variant="contained"
          onClick={() => dispatch(resetMinifigsFilters())}
        >
          Reset filters
        </Button>
      </Grid>
    );

  return (
    <>
      <Grid item xs={12}>
        <MinifigsPagination />
      </Grid>
      {paginatedMinifigsList.map((minifig) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={minifig.id}>
          {/* <Minifig {...minifig} /> */}
          {minifig.id}
        </Grid>
      ))}
      <Grid item xs={12}>
        <MinifigsPagination />
      </Grid>
    </>
  );
};

export default MinifigsList;
