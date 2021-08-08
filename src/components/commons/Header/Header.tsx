import React, { useCallback } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import BurgerMenu from "./BurgerMenu";
import TabMenu from "./TabMenu";
import { useAppDispatch, useAppSelector } from "hooks";
import { logout, selectIsAuthenticate } from "store/auth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

export const Header = () => {
  const classes = useStyles();
  const isAuthenticate = useAppSelector(selectIsAuthenticate);
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const logoutHandler = useCallback(() => {
    dispatch(logout());
    push("/auth");
  }, [dispatch, push]);

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            Lego SW
            <Hidden smDown> Collection Manager</Hidden>
          </Typography>
          <Hidden mdUp>
            <BurgerMenu
              isAuthenticate={isAuthenticate}
              logoutHandler={logoutHandler}
            />
          </Hidden>
          <Hidden smDown>
            <TabMenu
              isAuthenticate={isAuthenticate}
              logoutHandler={logoutHandler}
            />
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
