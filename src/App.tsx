import React, { useEffect } from 'react'
import Header from 'components/commons/Header'
import Routes from './routes'
import { useAppDispatch, useAppSelector } from 'hooks'
import { tryAutoSignIn } from 'store/auth'
import { selectMinifigsList, fetchMinifigs } from 'store/minifigs'

const App = () => {
  const dispatch = useAppDispatch()
  const minifigsList = useAppSelector(selectMinifigsList)

  useEffect(() => {
    !minifigsList && dispatch(fetchMinifigs())
  }, [minifigsList, dispatch])

  useEffect(() => {
    dispatch(tryAutoSignIn())
  }, [dispatch])

  return (
    <>
      <Header />
      <Routes />
    </>
  )
}

export default App
