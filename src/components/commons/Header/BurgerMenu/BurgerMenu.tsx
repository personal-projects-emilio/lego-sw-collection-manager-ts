import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    activeLink: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

export const BurgerMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        data-testid="burger-icon"
        aria-label="application menu icon"
        aria-controls="menu-header"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-header"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          data-testid="minifigs"
          component={NavLink}
          to="/minifigs"
          activeClassName={classes.activeLink}
          onClick={handleClose}
        >
          Minifigs
        </MenuItem>
        <MenuItem
          data-testid="auth"
          component={NavLink}
          to="/auth"
          activeClassName={classes.activeLink}
          onClick={handleClose}
        >
          Authentication
        </MenuItem>
      </Menu>
    </>
  );
};

export default BurgerMenu;
