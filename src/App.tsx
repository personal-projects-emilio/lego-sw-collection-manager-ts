import React, { useEffect } from 'react'
import Header from 'components/commons/Header'
import Routes from './routes'
import { useAppDispatch } from 'hooks'
import { tryAutoSignIn } from 'store/auth'

const App = () => {
  const dispatch = useAppDispatch()

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
