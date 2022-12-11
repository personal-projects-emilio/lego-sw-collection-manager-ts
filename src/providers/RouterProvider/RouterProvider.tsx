import React from 'react'
import { Router } from 'react-router-dom'
import history from 'appHistory'

export const RouterProvider: React.FC = ({ children }) => (
  <Router history={history}>{children}</Router>
)

export default RouterProvider
