import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from 'hooks/store'
import SetsPagination from './SetsPagination'
// import MinifigCard from './MinifigCard'
import { resetSetsFilters, selectPaginatedSetsList } from 'store/sets'
import { StyledContainer } from './styles'
import SetCard from './SetCard'

export const SetsList = () => {
  const paginatedSetlsList = useAppSelector(selectPaginatedSetsList)
  const dispatch = useAppDispatch()

  if (!Array.isArray(paginatedSetlsList)) return null

  if (paginatedSetlsList.length === 0)
    return (
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
        sx={{ marginTop: 2 }}
      >
        <Typography align="center" variant="h6">
          There are no sets with those filters
        </Typography>
        <Button variant="contained" onClick={() => dispatch(resetSetsFilters())}>
          Reset filters
        </Button>
      </Grid>
    )

  return (
    <Box sx={{ marginX: 2 }}>
      <SetsPagination />
      <StyledContainer>
        {paginatedSetlsList.map((set) => (
          <SetCard key={`set-${set.id}-${set.name}`} {...set} />
        ))}
      </StyledContainer>
      <SetsPagination />
    </Box>
  )
}

export default SetsList
