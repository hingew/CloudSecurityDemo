import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import Auth from '../utils/auth'
import ViewContainer from './ViewContainer'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest} render={props => {
      if (!Auth.isLoggedIn()) {
        return <Redirect to='/login' />
      }

      return (
        <ViewContainer>
          <Component {...props} />
        </ViewContainer>
      )
    }}
  />
)

export default PrivateRoute
