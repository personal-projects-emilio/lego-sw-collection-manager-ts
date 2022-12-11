import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Link, useLocation } from 'react-router-dom'

const a11yProps = (index: any) => ({
  id: `tab-nav-${index}`,
  'aria-controls': `tab-nav-${index}`,
})

interface TabMenuProps {
  isAuthenticate: boolean
  logoutHandler: () => void
}

export const TabMenu: React.FC<TabMenuProps> = ({ isAuthenticate, logoutHandler }) => {
  const { pathname } = useLocation()

  return (
    <Tabs value={pathname} aria-label="Tab Navigation menu">
      <Tab
        data-testid="minifigs"
        label="Minifigs"
        value="/minifigs"
        component={Link}
        to="/minifigs"
        {...a11yProps(0)}
      />
      <Tab
        data-testid="sets"
        label="Sets"
        value="/sets"
        component={Link}
        to="/sets"
        {...a11yProps(1)}
      />
      {isAuthenticate ? (
        <Tab label="Logout" onClick={logoutHandler} {...a11yProps(2)} />
      ) : (
        <Tab label="Authentication" component={Link} to="/auth" value="/auth" {...a11yProps(2)} />
      )}
    </Tabs>
  )
}

export default TabMenu
