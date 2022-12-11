import React, { FC, useEffect, useMemo, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import { useAppSelector, useToggle } from 'hooks'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Inputs from '../Inputs'
import { selectMinifigsList } from 'store/minifigs'
import Tooltip from '@mui/material/Tooltip'
import { Typography } from '@mui/material'

type SetMinifigProps = {
  id: string
  quantity: number
}

const initialMinifigState: SetMinifigProps = {
  id: '',
  quantity: 1,
}

export const SetMinifigs: FC<any> = ({ value, onChange }) => {
  const minifigsList = useAppSelector(selectMinifigsList)
  const [values, setValues] = useState<SetMinifigProps[]>(
    Array.isArray(value) ? value.sort((a, b) => (a.id > b.id ? 1 : -1)) : []
  )
  const nbOfMinifigs = useMemo(() => {
    return values.reduce((pre, curr) => {
      return pre + parseInt(curr.quantity.toString())
    }, 0)
  }, [values])
  const [open, toggleOpen] = useToggle()
  const {
    control,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm<typeof initialMinifigState>({
    defaultValues: initialMinifigState,
    mode: 'all',
  })

  useEffect(() => {
    onChange?.(values)
  }, [values, onChange])

  const minifigsOptions = useMemo(
    () =>
      minifigsList?.map((minifig) => ({
        label: `${minifig.id} - ${minifig.characterName}`,
        value: minifig.id,
      })) || [],
    [minifigsList]
  )

  const handleClose = () => {
    reset(initialMinifigState)
    toggleOpen(false)
  }

  const onSubmit: SubmitHandler<SetMinifigProps> = (data) => {
    setValues((prevValues) => [...prevValues, data].sort((a, b) => (a.id > b.id ? 1 : -1)))
    handleClose()
  }

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        gridGap: theme.spacing(1),
        alignItems: 'center',
        flexWrap: 'wrap',
      })}
    >
      <Typography>{`Minifigs${nbOfMinifigs ? ` (${nbOfMinifigs})` : ''}:`}</Typography>
      {values.map((minifig, minifigIndex) => (
        <Chip
          sx={(theme) => ({
            '& svg': {
              fontSize: '1rem',
            },
            display: 'flex',
            alignItems: 'center',
            gridGap: theme.spacing(0.5),
          })}
          label={
            <>
              {`${minifig.id} (x${minifig.quantity})`}
              <IconButton
                size="small"
                onClick={() => {
                  toggleOpen(true)
                  reset(minifig)
                }}
                arial-label="edit-set-minifig"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                size="small"
                aria-label="delete-set-minifig"
                onClick={() => {
                  setValues((preValues) => preValues.filter((_, i) => i !== minifigIndex))
                }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          }
        />
      ))}
      <Tooltip title="Add minifigs to this set">
        <IconButton onClick={() => toggleOpen()} color="primary">
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} aria-labelledby="set-minifig-edition">
        <form
          onSubmit={(e) => {
            e.stopPropagation()
            return handleSubmit(onSubmit)(e)
          }}
        >
          <DialogTitle id="set-minifig-edition">Edit or Add a minifig to this set</DialogTitle>
          <DialogContent
            sx={(theme) => ({ display: 'grid', gridGap: theme.spacing(2), overflow: 'visible' })}
          >
            <Controller
              name="id"
              control={control}
              rules={{
                required: 'This field is required',
                validate: (value) => {
                  if (values.map(({ id }) => id).includes(value)) {
                    return 'This minifig is already in the list'
                  }
                  return true
                },
              }}
              render={({ field, fieldState }) => (
                <Inputs
                  {...field}
                  label="Id"
                  placeholder="Minifig id (ex: sw0001)"
                  type="autocomplete"
                  options={minifigsOptions}
                  muiProps={{
                    error: fieldState.invalid,
                    helperText: fieldState.error?.message,
                    required: true,
                    fullWidth: true,
                    autoFocus: true,
                  }}
                />
              )}
            />
            <Controller
              name="quantity"
              control={control}
              rules={{
                required: 'This field is required',
              }}
              render={({ field, fieldState }) => {
                return (
                  <Inputs
                    {...field}
                    label="Quantity"
                    type="textfield"
                    muiProps={{
                      error: fieldState.invalid,
                      helperText: fieldState.error?.message,
                      required: true,
                      fullWidth: true,
                      type: 'number',
                    }}
                  />
                )
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button disabled={!isValid} type="submit" color="primary" variant="contained">
              Add/Edit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}

export default SetMinifigs
