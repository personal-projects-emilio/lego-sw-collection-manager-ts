import React from "react";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Minifig } from "interfaces/minifigs";
import Inputs from "components/commons/inputs";

export type MinifigEditionProps = Minifig;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(0.5),
    },
  })
);

export const MinifigEdition: React.FC<MinifigEditionProps> = (props) => {
  const { possessed } = props;
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.container}
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Tooltip title="Switch possession" aria-label="Switch possession">
        <span>
          {/* TODO: Manage switch possession action */}
          <Inputs type="switch" value={possessed} changeHandler={() => {}} />
        </span>
      </Tooltip>
      {/* TODO: Manage edit modal */}
      <Tooltip title="Edit" aria-label="Edit">
        <IconButton>
          <EditIcon />
        </IconButton>
      </Tooltip>
      {/* TODO: Manage delete modal */}
      <Tooltip title="Delete" aria-label="Delete">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Grid>
  );
};

export default MinifigEdition;
