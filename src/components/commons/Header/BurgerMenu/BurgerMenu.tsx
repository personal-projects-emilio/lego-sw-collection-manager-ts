import React, { useCallback } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";

interface BurgerMenuProps {
  isAuthenticate: boolean;
  logoutHandler: () => void;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({
  isAuthenticate,
  logoutHandler,
}) => {
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleLogout = useCallback(() => {
    handleClose();
    logoutHandler();
  }, [logoutHandler, handleClose]);

  return (
    <>
      <IconButton
        id="application-menu-icon"
        aria-label="application menu icon"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-header"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          padding: "0 0.5rem",
          "& .Mui-selected": {
            color: 'primary.main',
            fontWeight: 'fontWeightBold',
          },
        }}
        MenuListProps={{
          "aria-labelledby": "application-menu-icon",
        }}
      >
        <MenuItem
          component={Link}
          to="/minifigs"
          selected={pathname === "/minifigs"}
          onClick={handleClose}
        >
          Minifigs
        </MenuItem>
        {isAuthenticate ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : (
          <MenuItem
            component={Link}
            to="/auth"
            selected={pathname === "/auth"}
            onClick={handleClose}
          >
            Authentication
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default BurgerMenu;
