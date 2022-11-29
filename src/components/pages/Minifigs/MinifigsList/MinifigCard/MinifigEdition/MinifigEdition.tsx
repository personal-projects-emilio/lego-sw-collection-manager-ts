import React from 'react'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { Minifig } from 'types/minifigs'
import Inputs from 'components/commons/inputs'
import MinifigFormModal from 'components/commons/MinifigFormModal/MinifigFormModal'
import { useAppDispatch, useAppSelector, useToggle } from 'hooks'
import { deleteMinifig, selectMinifigsAreLoading, toggleMinifigOwned } from 'store/minifigs'
import Button from 'components/commons/Button'

export type MinifigEditionProps = Minifig

export const MinifigEdition: React.FC<MinifigEditionProps> = (props) => {
  const { possessed, id, characterName, tags } = props
  const duplicateProps = { characterName, tags }
  const [isEditModalOpen, toggleEditModalOpen] = useToggle()
  const [isDuplicateModalOpen, toggleDuplicateModalOpen] = useToggle()
  const [isDeleteModalOpen, toggleDeleteModalOpen] = useToggle()

  const isLoading = useAppSelector(selectMinifigsAreLoading)
  const dispatch = useAppDispatch()
  return (
    <Grid container justifyContent="space-evenly" alignItems="center" sx={{ paddingTop: 0.5 }}>
      <Tooltip title="Switch possession" aria-label="Switch possession tooltip">
        <span>
          <Inputs
            type="switch"
            value={possessed}
            onChange={() => dispatch(toggleMinifigOwned(id))}
            muiProps={{ disabled: isLoading }}
          />
        </span>
      </Tooltip>
      <Tooltip title="Edit" aria-label="Edit tooltip">
        <IconButton onClick={() => toggleEditModalOpen()} arial-label="edit">
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Duplicate character name and tags" aria-label="Duplicate tooltip">
        <IconButton onClick={() => toggleDuplicateModalOpen()} arial-label="duplicate">
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
      {(isEditModalOpen || isDuplicateModalOpen) && (
        <MinifigFormModal
          handleClose={() => (isEditModalOpen ? toggleEditModalOpen() : toggleDuplicateModalOpen())}
          editMinifigData={isEditModalOpen ? props : duplicateProps}
        />
      )}
      <Tooltip title="Delete" aria-label="Delete tooltip">
        <IconButton
          disabled={isLoading}
          aria-label="delete"
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
            <Button onClick={() => toggleDeleteModalOpen()} color="primary" disabled={isLoading}>
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
  )
}

export default MinifigEdition
