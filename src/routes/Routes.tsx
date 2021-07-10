import React from "react";
import { Switch, Redirect } from "react-router-dom";

export const Routes = () => (
  <Switch>
    {/* <Route exact path='/minifigs' component={Minifigs}/> */}
    {/* <Route exact path='/auth' component={Auth}/> */}
    {/* <Route exact path='/' /> */}
    <Redirect to="/minifigs" />
  </Switch>
);

export default Routes;
