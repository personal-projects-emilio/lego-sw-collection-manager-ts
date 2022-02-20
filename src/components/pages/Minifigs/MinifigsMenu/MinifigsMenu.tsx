import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MinifigsFilters from "./MinifigsFilters";
import MinifigsMisce from "./MinifigsMisce";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  boxSizing: "border-box",
  minHeight: `calc(100% - ${theme.spacing(4)})`,
}));


export const MinifigsMenu: React.FC = () => (
  <Grid container>
    <Grid item xs={12} md={6}>
      <StyledPaper >
        <MinifigsMisce />
      </StyledPaper>
      </Grid>
    <Grid item xs={12} md={6}>
      <StyledPaper>
        <MinifigsFilters />
      </StyledPaper>
    </Grid>
  </Grid>
  );

export default MinifigsMenu;
