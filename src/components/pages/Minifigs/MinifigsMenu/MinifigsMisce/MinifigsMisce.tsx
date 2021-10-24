import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/AddCircle";
import CloudDownload from "@material-ui/icons/CloudDownload";
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
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <Typography align="center" variant="h6">
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
