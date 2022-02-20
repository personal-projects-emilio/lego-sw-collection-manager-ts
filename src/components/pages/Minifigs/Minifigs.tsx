import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/store";
import Loader from "components/commons/Loader";
import {
  selectMinifigsList,
  fetchMinifigs,
  selectMinifigsIsLoading,
} from "store/minifigs";
import MinifigsList from "./MinifigsList";
import MinifigsMenu from "./MinifigsMenu";
import { Box } from "@mui/material";

export const Minifigs = () => {
  const dispatch = useAppDispatch();
  const minifigsList = useAppSelector(selectMinifigsList);
  const isLoading = useAppSelector(selectMinifigsIsLoading);

  useEffect(() => {
    !minifigsList && dispatch(fetchMinifigs());
  }, [minifigsList, dispatch]);

  if (!Array.isArray(minifigsList) && isLoading) return <Loader />;

  return (
    <Box>
      <MinifigsMenu />
      <MinifigsList />
    </Box>
  );
};

export default Minifigs;
