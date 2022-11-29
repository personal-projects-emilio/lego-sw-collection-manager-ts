import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Link, useRouteMatch } from 'react-router-dom'
import { a11yTabProps } from 'utils/a11y'

interface TabMenuProps {
  isAuthenticate: boolean
  logoutHandler: () => void
}

export const TabMenu: React.FC<TabMenuProps> = ({ isAuthenticate, logoutHandler }) => {
  const match = useRouteMatch(['/minifigs', '/frames', '/auth'])

  return (
    <Tabs value={match?.path} aria-label="Tab Navigation menu">
      <Tab
        data-testid="minifigs"
        label="Minifigs"
        value="/minifigs"
        component={Link}
        to="/minifigs"
        {...a11yTabProps('app', 0)}
      />
      <Tab
        data-testid="frames"
        label="Frames"
        value="/frames"
        component={Link}
        to="/frames"
        {...a11yTabProps('app', 1)}
      />
      {isAuthenticate ? (
        <Tab label="Logout" onClick={logoutHandler} {...a11yTabProps('app', 2)} />
      ) : (
        <Tab
          label="Authentication"
          component={Link}
          to="/auth"
          value="/auth"
          {...a11yTabProps('app', 2)}
        />
      )}
    </Tabs>
  )
}

export default TabMenu
