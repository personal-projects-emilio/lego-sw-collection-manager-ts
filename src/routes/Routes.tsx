import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Minifigs from 'components/pages/Minifigs'
import Frames from 'components/pages/Frames'
import Auth from 'components/pages/Auth'

export const Routes = () => (
  <Switch>
    <Route path="/minifigs" component={Minifigs} />
    <Route path="/frames" component={Frames} />
    <Route exact path="/auth" component={Auth} />
    {/* <Route exact path='/' /> */}
    <Redirect to="/minifigs" />
  </Switch>
)

export default Routes
