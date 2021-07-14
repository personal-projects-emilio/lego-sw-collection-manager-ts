import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Minifigs from "components/pages/Minifigs";

export const Routes = () => (
  <Switch>
    <Route path="/minifigs" component={Minifigs} />
    <Route exact path="/auth" render={() => <div>Auth component</div>} />
    {/* <Route exact path='/' /> */}
    <Redirect to="/minifigs" />
  </Switch>
);

export default Routes;
