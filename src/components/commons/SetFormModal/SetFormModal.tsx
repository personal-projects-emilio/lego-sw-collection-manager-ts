import React, { useMemo } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Set } from 'types/sets'
import Inputs from '../inputs'
import { useAppDispatch, useAppSelector } from 'hooks/store'
import Button from '../Button'
import {
  addSet,
  editSet,
  selectSetsAreLoading,
  selectSetsList,
  selectTagsAndSubhtemes,
} from 'store/sets'
import InputAdornment from '@mui/material/InputAdornment'
import SetMinifigs from '../inputs/SetMinifigs'

export interface SetFormModalProps {
  handleClose: () => void
  editSetData?: Partial<Set>
}

export const SetFormModal: React.FC<SetFormModalProps> = ({ handleClose, editSetData }) => {
  const { tags, subthemes } = useAppSelector(selectTagsAndSubhtemes)
  const setsList = useAppSelector(selectSetsList)
  const isLoading = useAppSelector(selectSetsAreLoading)
  const dispatch = useAppDispatch()
  const { control, reset, unregister, handleSubmit, formState } = useForm<Set>({
    defaultValues: {
      id: '',
      name: '',
      subtheme: '',
      characterNames: [],
      tags: [],
      releaseYear: new Date().getFullYear(),
      location: '',
      note: '',
      ownedQty: 1,
      content: {
        box: false,
        notice: false,
        bags: false,
        partsQty: 0,
        minifigs: [],
      },
      prices: {
        bought: 0,
        storeValueFR: 0,
        marketValue: 0,
      },
      ...(editSetData || {}),
    },
    mode: 'all',
  })

  const subthemesOptions = useMemo(
    () =>
      subthemes?.map((subtheme) => ({
        label: subtheme.label,
        value: subtheme.label,
      })) || [],
    [subthemes]
  )

  const tagsOptions = useMemo(
    () =>
      tags?.map((tag) => ({
        label: tag.label,
        value: tag.label,
      })) || [],
    [tags]
  )

  const setsListIds = useMemo(() => setsList?.map((set) => set.id) || [], [setsList])

  const onClose = () => {
    handleClose()
    reset()
    unregister()
  }

  const onSubmit: SubmitHandler<Set> = (data) => {
    if (editSetData?.id) {
      onClose()
      return dispatch(editSet({ set: data, previousId: editSetData.id }))
    }
    onClose()
    return dispatch(addSet(data))
  }

  return (
    <Dialog open onClose={onClose} aria-labelledby="set-form-dialog" maxWidth="lg" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="set-form-dialog">
          {editSetData?.id ? `Edit ${editSetData.id} - ${editSetData.name}` : 'Add a set'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="id"
                control={control}
                rules={{
                  required: 'This field is required',
                  validate: (value) => {
                    if (setsListIds.includes(value) && value !== editSetData?.id) {
                      return 'This set already exists'
                    }
                    return true
                  },
                }}
                render={({ field, fieldState }) => {
                  return (
                    <Inputs
                      {...field}
                      label="Id"
                      placeholder="Set id (ex: 75000)"
                      type="textfield"
                      muiProps={{
                        // disabled: !!editSetData?.id,
                        error: fieldState.invalid,
                        helperText: fieldState.error?.message,
                        required: true,
                        fullWidth: true,
                      }}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: 'This field is required',
                }}
                render={({ field, fieldState }) => (
                  <Inputs
                    {...field}
                    label="Name"
                    placeholder="Set name (ex: X-wing)"
                    type="textfield"
                    muiProps={{
                      error: fieldState.invalid,
                      helperText: fieldState.error?.message,
                      required: true,
                      fullWidth: true,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="subtheme"
                control={control}
                rules={{
                  required: 'This field is required',
                }}
                render={({ field, fieldState }) => (
                  <Inputs
                    {...field}
                    label="Subtheme"
                    placeholder="Subtheme (ex: Episode I)"
                    type="autocomplete"
                    creatable
                    options={subthemesOptions}
                    muiProps={{
                      error: fieldState.invalid,
                      helperText: fieldState.error?.message,
                      required: true,
                      fullWidth: true,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <Inputs
                    {...field}
                    label="Tags"
                    placeholder="Set tags (ex: Endor, Hoth, TIE...)"
                    type="autocomplete"
                    creatable
                    options={tagsOptions}
                    multiple
                    muiProps={{
                      fullWidth: true,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="location"
                control={control}
                rules={{
                  required: 'This field is required',
                }}
                render={({ field, fieldState }) => {
                  return (
                    <Inputs
                      {...field}
                      label="Location"
                      placeholder="Location (ex: Attic)"
                      type="textfield"
                      muiProps={{
                        error: fieldState.invalid,
                        helperText: fieldState.error?.message,
                        required: true,
                        fullWidth: true,
                        multiline: true,
                      }}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="note"
                control={control}
                render={({ field }) => {
                  return (
                    <Inputs
                      {...field}
                      value={field.value || ''}
                      label="Note"
                      type="textfield"
                      muiProps={{
                        multiline: true,
                        fullWidth: true,
                      }}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="releaseYear"
                control={control}
                rules={{
                  required: 'This field is required',
                }}
                render={({ field, fieldState }) => {
                  return (
                    <Inputs
                      {...field}
                      label="Release year"
                      placeholder="Release year (ex: 2022)"
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="ownedQty"
                control={control}
                rules={{
                  required: 'This field is required',
                }}
                render={({ field, fieldState }) => {
                  return (
                    <Inputs
                      {...field}
                      label="Owned quantity"
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
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Content</Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="content.minifigs"
                control={control}
                // rules={{
                //   required: 'This field is required',
                // }}
                render={({ field, fieldState }) => {
                  return <SetMinifigs {...field} {...fieldState} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="content.box"
                control={control}
                render={({ field }) => {
                  return <Inputs {...field} label="Box" type="checkbox" />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="content.notice"
                control={control}
                render={({ field }) => {
                  return <Inputs {...field} label="Notice" type="checkbox" />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="content.bags"
                control={control}
                render={({ field }) => {
                  return <Inputs {...field} label="Bags" type="checkbox" />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="content.partsQty"
                control={control}
                render={({ field }) => {
                  return (
                    <Inputs
                      {...field}
                      value={field.value || ''}
                      label="Parts qty."
                      type="textfield"
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Prices</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="prices.bought"
                control={control}
                rules={{
                  required: 'This field is required',
                }}
                render={({ field, fieldState }) => {
                  return (
                    <Inputs
                      {...field}
                      label="Price bought"
                      type="textfield"
                      muiProps={{
                        error: fieldState.invalid,
                        helperText: fieldState.error?.message,
                        required: true,
                        fullWidth: true,
                        type: 'number',
                        InputProps: {
                          startAdornment: <InputAdornment position="start">€</InputAdornment>,
                        },
                      }}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="prices.storeValueFR"
                control={control}
                rules={{
                  required: 'This field is required',
                }}
                render={({ field, fieldState }) => {
                  return (
                    <Inputs
                      {...field}
                      label="Store value (FR)"
                      type="textfield"
                      muiProps={{
                        error: fieldState.invalid,
                        helperText: fieldState.error?.message,
                        required: true,
                        fullWidth: true,
                        ...(field.value !== 'polybag' && {
                          InputProps: {
                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                          },
                        }),
                      }}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="prices.marketValue"
                control={control}
                rules={{
                  required: 'This field is required',
                }}
                render={({ field, fieldState }) => {
                  return (
                    <Inputs
                      {...field}
                      label="Market value"
                      type="textfield"
                      muiProps={{
                        error: fieldState.invalid,
                        helperText: fieldState.error?.message,
                        required: true,
                        fullWidth: true,
                        type: 'number',
                        InputProps: {
                          startAdornment: <InputAdornment position="start">€</InputAdornment>,
                        },
                      }}
                    />
                  )
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            aria-label="Submit"
            disabled={!formState.isValid}
            isLoading={isLoading}
          >
            {editSetData?.id ? `Edit ${editSetData.id}` : 'Add a set'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default SetFormModal
