import React, { useEffect, useMemo } from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Inputs from 'components/commons/inputs'
import TextField from '@mui/material/TextField'

import { styled } from '@mui/material/styles'
import { useAppDispatch, useAppSelector, usePrevious, useToggle } from 'hooks'
import {
  selectSetsFilters,
  selectSetsList,
  selectTagsAndSubhtemes,
  setSetsFilters,
} from 'store/sets'
import { SetsFilters } from 'types/sets'
import { useForm, useWatch, Controller } from 'react-hook-form'
import isEqual from 'fast-deep-equal'
import Button from '@mui/material/Button'
import SetFormModal from 'components/commons/SetFormModal/SetFormModal'
import { getSetsPricesStatistics } from 'utils/sets'
import { Checkbox, FormControlLabel } from '@mui/material'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  boxSizing: 'border-box',
  minHeight: `calc(100% - ${theme.spacing(4)})`,
  display: 'flex',
  flexDirection: 'column',
  gridGap: theme.spacing(2),
}))

export const SetsMenu: React.FC = () => {
  const { tags, subthemes } = useAppSelector(selectTagsAndSubhtemes)
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectSetsFilters)
  const setsList = useAppSelector(selectSetsList)
  const [isCreateModalOpen, toggleCreateModalOpen] = useToggle()
  const previousFilters = usePrevious(filters)
  const { control, reset } = useForm<SetsFilters>({
    defaultValues: filters,
  })
  const filtersFormValues = useWatch({
    control: control,
    defaultValue: filters,
  })
  const previousFiltersFormValues = usePrevious(filtersFormValues)
  const pricesStatistics = useMemo(() => getSetsPricesStatistics(setsList ?? []), [setsList])

  useEffect(() => {
    // If the filtersFormValues change and not the filters that means the form
    // was changed so we set the store accordingly
    if (
      !isEqual(filters, filtersFormValues) &&
      !isEqual(previousFiltersFormValues, filtersFormValues)
    ) {
      dispatch(setSetsFilters(filtersFormValues))
    }
  }, [dispatch, filtersFormValues, previousFiltersFormValues, filters])

  useEffect(() => {
    // If the filters change and not the filtersFormValues that means the
    // filters were reset in the store so we reset the form
    if (!isEqual(filters, previousFilters) && !isEqual(filters, filtersFormValues)) {
      reset(filters)
    }
  }, [filters, previousFilters, filtersFormValues, reset])

  const subthemesOptions = useMemo(
    () =>
      subthemes?.map((subtheme) => ({
        label: `${subtheme.label} (${subtheme.amount})`,
        value: subtheme.label,
      })) || [],
    [subthemes]
  )

  const tagsOptions = useMemo(
    () =>
      tags?.map((tag) => ({
        label: `${tag.label} (${tag.amount})`,
        value: tag.label,
      })) || [],
    [tags]
  )

  return (
    <>
      <StyledPaper>
        <Box
          sx={(theme) => ({
            gridGap: theme.spacing(1),
            display: 'grid',
            gridTemplateColumns: 'repeat(4, auto)',
          })}
        >
          <TextField
            label="Total bought"
            variant="standard"
            value={pricesStatistics.totalBought}
            InputProps={{
              readOnly: true,
              disableUnderline: true,
            }}
          />
          <TextField
            label="Total store value"
            variant="standard"
            value={pricesStatistics.totalStoreValue}
            InputProps={{
              readOnly: true,
              disableUnderline: true,
            }}
          />
          <TextField
            label="Total market value"
            variant="standard"
            value={pricesStatistics.totalMarketValue}
            InputProps={{
              readOnly: true,
              disableUnderline: true,
            }}
          />
          <TextField
            label="%"
            variant="standard"
            value={pricesStatistics.percentage}
            InputProps={{
              readOnly: true,
              disableUnderline: true,
            }}
          />
        </Box>
        <Controller
          name="subtheme"
          control={control}
          render={({ field }) => (
            <Inputs
              {...field}
              label="Subtheme"
              type="autocomplete"
              placeholder="Filter by subhteme"
              options={subthemesOptions}
            />
          )}
        />
        <Controller
          name="tag"
          control={control}
          render={({ field }) => (
            <Inputs
              {...field}
              label="Tag"
              type="autocomplete"
              placeholder="Filter by tag"
              options={tagsOptions}
            />
          )}
        />
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <Inputs
              {...field}
              value={field.value || ''}
              label="Search"
              type="textfield"
              placeholder="Search by id, name or note"
            />
          )}
        />
        <Controller
          name="noLocation"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              label="Got no location"
              control={<Checkbox color="primary" {...field} />}
            />
          )}
        />
        <Button
          sx={{ alignSelf: 'center' }}
          variant="contained"
          onClick={() => toggleCreateModalOpen()}
        >
          Add a set
        </Button>
      </StyledPaper>
      {isCreateModalOpen && <SetFormModal handleClose={() => toggleCreateModalOpen()} />}
    </>
  )
}

export default SetsMenu
