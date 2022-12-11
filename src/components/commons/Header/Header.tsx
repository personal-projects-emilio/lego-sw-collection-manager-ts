import React, { useCallback } from 'react'
import { AppBar, Toolbar, Typography, Hidden } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks'
import { logout, selectIsAuthenticate } from 'store/auth'
import BurgerMenu from './BurgerMenu'
import TabMenu from './TabMenu'

export const Header = () => {
  const isAuthenticate = useAppSelector(selectIsAuthenticate)
  const dispatch = useAppDispatch()
  const { push } = useHistory()

  const logoutHandler = useCallback(() => {
    dispatch(logout())
    push('/auth')
  }, [dispatch, push])

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Lego SW
          <Hidden smDown> Collection Manager</Hidden>
        </Typography>
        <Hidden mdUp>
          <BurgerMenu isAuthenticate={isAuthenticate} logoutHandler={logoutHandler} />
        </Hidden>
        <Hidden smDown>
          <TabMenu isAuthenticate={isAuthenticate} logoutHandler={logoutHandler} />
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

export default Header
