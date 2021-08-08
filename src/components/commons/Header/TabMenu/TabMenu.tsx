import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link, useLocation } from "react-router-dom";

const a11yProps = (index: any) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

interface TabMenuProps {
  isAuthenticate: boolean;
  logoutHandler: () => void;
}

export const TabMenu: React.FC<TabMenuProps> = ({
  isAuthenticate,
  logoutHandler,
}) => {
  const { pathname } = useLocation();

  return (
    <Tabs value={pathname} aria-label="Tab menu">
      <Tab
        data-testid="minifigs"
        label="Minifigs"
        value="/minifigs"
        component={Link}
        to="/minifigs"
        {...a11yProps(0)}
      />
      {isAuthenticate ? (
        <Tab label="Logout" onClick={logoutHandler} />
      ) : (
        <Tab
          label="Authentication"
          component={Link}
          to="/auth"
          value="/auth"
          {...a11yProps(1)}
        />
      )}
    </Tabs>
  );
};

export default TabMenu;
