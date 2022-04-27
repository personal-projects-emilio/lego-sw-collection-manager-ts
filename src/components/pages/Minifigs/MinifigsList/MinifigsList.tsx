import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from 'hooks/store'
import { selectPaginatedMinifigsList, resetMinifigsFilters } from 'store/minifigs'
import MinifigsPagination from './MinifigsPagination'
import MinifigCard from './MinifigCard'

export const MinifigsList = () => {
  const paginatedMinifigsList = useAppSelector(selectPaginatedMinifigsList)
  const dispatch = useAppDispatch()

  if (!Array.isArray(paginatedMinifigsList)) return null

  if (paginatedMinifigsList.length === 0)
    return (
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
        sx={{ marginTop: 2 }}
      >
        <Typography align="center" variant="h6">
          There are no minifigs with those filters
        </Typography>
        <Button variant="contained" onClick={() => dispatch(resetMinifigsFilters())}>
          Reset filters
        </Button>
      </Grid>
    )

  return (
    <Box sx={{ marginX: 2 }}>
      <MinifigsPagination />
      <Grid container spacing={2}>
        {paginatedMinifigsList.map((minifig) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={minifig.id}>
            <MinifigCard {...minifig} />
          </Grid>
        ))}
      </Grid>
      <MinifigsPagination />
    </Box>
  )
}

export default MinifigsList
