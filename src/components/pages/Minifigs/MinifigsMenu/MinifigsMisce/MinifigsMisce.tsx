import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/AddCircle";
import CloudDownload from "@mui/icons-material/CloudDownload";
import MinifigFormModal from "components/commons/MinifigFormModal/MinifigFormModal";
import { useAppSelector, useToggle } from "hooks";
import { selectMinifigsList } from "store/minifigs";
import { getStatistics } from "utils";

export const MinifigsMisce: React.FC = () => {
  const [addMinifigModalIsOpen, toggleAddMinifigModal] = useToggle(false);
  const minifigsList = useAppSelector(selectMinifigsList);

  const { totalNumber, numberOwned, percentageOwned } = getStatistics(
    minifigsList || []
  );

  return (
    <Grid container direction="column" rowSpacing={3}>
      <Grid item>
        <Typography align="center" variant="h6" sx={{marginBottom: 1.5}}>
          {`You owned ${numberOwned} of the ${totalNumber} minifigs in our database (${percentageOwned}%)`}
        </Typography>
      </Grid>
      <Divider />
      <Grid item>
        <Grid container justifyContent="space-evenly">
          <Button
            variant="contained"
            color="primary"
            onClick={() => toggleAddMinifigModal()}
            endIcon={<AddIcon />}
          >
            Add a minifig
          </Button>
          {addMinifigModalIsOpen && (
            <MinifigFormModal
              handleClose={() => toggleAddMinifigModal(false)}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            endIcon={<CloudDownload />}
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(minifigsList)
            )}`}
            download="minifigsList.json"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download minifigs
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MinifigsMisce;
