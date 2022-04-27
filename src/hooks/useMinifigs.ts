import { useEffect } from 'react'
import { selectMinifigsList, selectMinifigsIsLoading, fetchMinifigs } from 'store/minifigs'
import { useAppDispatch, useAppSelector } from './store'

export const useMinifigs = () => {
  const dispatch = useAppDispatch()
  const minifigsList = useAppSelector(selectMinifigsList)
  const isLoading = useAppSelector(selectMinifigsIsLoading)

  useEffect(() => {
    !minifigsList && dispatch(fetchMinifigs())
  }, [minifigsList, dispatch])

  return { minifigsList, isLoading }
}
