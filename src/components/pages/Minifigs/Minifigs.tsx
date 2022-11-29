import React from 'react'
import Loader from 'components/commons/Loader'
import MinifigsList from './MinifigsList'
import MinifigsMenu from './MinifigsMenu'
import { Box } from '@mui/material'
import { useMinifigs } from 'hooks/useMinifigs'

export const Minifigs = () => {
  const { minifigsList, isLoading } = useMinifigs()

  if (!Array.isArray(minifigsList) && isLoading) return <Loader />

  return (
    <Box>
      <MinifigsMenu />
      <MinifigsList />
    </Box>
  )
}

export default Minifigs
