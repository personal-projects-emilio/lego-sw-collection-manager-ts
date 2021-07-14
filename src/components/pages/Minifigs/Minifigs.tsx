import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/store";
import { fetchMinifigs } from "store/minifigs/minifigsSlice";

export const Minifigs = () => {
  const dispatch = useAppDispatch();
  const minifigsList = useAppSelector((state) => state.minifigs.list);

  useEffect(() => {
    !minifigsList && dispatch(fetchMinifigs());
  }, [minifigsList, dispatch]);

  return <div>Minifigs page</div>;
};

export default Minifigs;
