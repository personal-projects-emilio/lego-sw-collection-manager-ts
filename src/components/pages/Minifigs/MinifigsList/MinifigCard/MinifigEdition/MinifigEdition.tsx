import React from "react";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Minifig } from "interfaces/minifigs";
import Inputs from "components/commons/inputs";
import MinifigFormModal from "components/commons/MinifigFormModal/MinifigFormModal";
import { useToggle } from "hooks";

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
  const [isEditModalOpen, toggleEditModalOpen] = useToggle();
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
          <Inputs type="switch" value={possessed} />
        </span>
      </Tooltip>
      <Tooltip title="Edit" aria-label="Edit">
        <IconButton onClick={() => toggleEditModalOpen()}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      {isEditModalOpen && (
        <MinifigFormModal
          handleClose={() => toggleEditModalOpen()}
          editMinifig={props}
        />
      )}
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
