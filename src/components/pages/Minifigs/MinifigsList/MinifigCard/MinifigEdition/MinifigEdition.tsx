import React from "react";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Minifig } from "interfaces/minifigs";
import Inputs from "components/commons/inputs";
import MinifigFormModal from "components/commons/MinifigFormModal/MinifigFormModal";
import { useAppDispatch, useAppSelector, useToggle } from "hooks";
import {
  deleteMinifig,
  selectMinifigsIsLoading,
  toggleMinifigOwned,
} from "store/minifigs";
import Button from "components/commons/Button";

export type MinifigEditionProps = Minifig;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(0.5),
    },
  })
);

export const MinifigEdition: React.FC<MinifigEditionProps> = (props) => {
  const { possessed, id } = props;
  const classes = useStyles();
  const [isEditModalOpen, toggleEditModalOpen] = useToggle();
  const [isDeleteModalOpen, toggleDeleteModalOpen] = useToggle();

  const isLoading = useAppSelector(selectMinifigsIsLoading);
  const dispatch = useAppDispatch();
  return (
    <Grid
      container
      className={classes.container}
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Tooltip title="Switch possession" aria-label="Switch possession">
        <span>
          <Inputs
            type="switch"
            value={possessed}
            onChange={() => dispatch(toggleMinifigOwned(id))}
            muiProps={{ disabled: isLoading }}
          />
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
          editMinifigData={props}
        />
      )}
      <Tooltip title="Delete" aria-label="Delete">
        <IconButton
          disabled={isLoading}
          onClick={() => toggleDeleteModalOpen()}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {isDeleteModalOpen && (
        <Dialog
          open
          onClose={() => toggleDeleteModalOpen()}
          aria-labelledby="minifig-delete-dialog"
          maxWidth="md"
        >
          <DialogTitle id="minifig-delete-dialog">
            {`Are you sure you want to delete ${id}?`}
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => toggleDeleteModalOpen()}
              color="primary"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              isLoading={isLoading}
              onClick={() => dispatch(deleteMinifig(id))}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
};

export default MinifigEdition;
