import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/store'
import Loader from 'components/commons/Loader'
import { selectSetsList, fetchSets, selectSetsAreLoading } from 'store/sets'
import { Box } from '@mui/material'
import SetsMenu from './SetsMenu'
import SetsList from './SetsList'
import { selectMinifigsList } from 'store/minifigs'

export const Minifigs = () => {
  const dispatch = useAppDispatch()
  const setsList = useAppSelector(selectSetsList)
  const isLoading = useAppSelector(selectSetsAreLoading)
  const minifigsList = useAppSelector(selectMinifigsList)

  useEffect(() => {
    !setsList && minifigsList && dispatch(fetchSets())
  }, [setsList, minifigsList, dispatch])

  if (!Array.isArray(setsList) && isLoading) return <Loader />

  return (
    <Box>
      <SetsMenu />
      <SetsList />
    </Box>
  )
}

export default Minifigs
