import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useAppDispatch, useAppSelector } from "hooks/store";
import Loader from "components/commons/Loader";
import { selectMinifigsList, fetchMinifigs } from "store/minifigs";
import MinifigsList from "./MinifigsList";
import MinifigsMenu from "./MinifigsMenu";

export const Minifigs = () => {
  const dispatch = useAppDispatch();
  const minifigsList = useAppSelector(selectMinifigsList);

  useEffect(() => {
    !minifigsList && dispatch(fetchMinifigs());
  }, [minifigsList, dispatch]);

  if (!Array.isArray(minifigsList)) return <Loader />;

  return (
    <Grid container justifyContent="center" alignItems="stretch">
      <Grid item xs={12}>
        <MinifigsMenu />
      </Grid>
      <MinifigsList />
    </Grid>
  );
};

export default Minifigs;
