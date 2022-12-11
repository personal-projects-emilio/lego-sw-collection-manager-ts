import React from 'react'
import { useAppSelector } from 'hooks/store'
import Loader from 'components/commons/Loader'
import { selectMinifigsList, selectMinifigsAreLoading } from 'store/minifigs'
import MinifigsList from './MinifigsList'
import MinifigsMenu from './MinifigsMenu'
import { Box } from '@mui/material'

export const Minifigs = () => {
  const minifigsList = useAppSelector(selectMinifigsList)
  const isLoading = useAppSelector(selectMinifigsAreLoading)

  if (!Array.isArray(minifigsList) && isLoading) return <Loader />

  return (
    <Box>
      <MinifigsMenu />
      <MinifigsList />
    </Box>
  )
}

export default Minifigs
