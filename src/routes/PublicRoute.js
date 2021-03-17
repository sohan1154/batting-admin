import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as GlobalProvider from '../providers/globals/globals';

// handle the public routes
function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => !GlobalProvider.getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/dashboard' }} />}
    />
  )
}

export default PublicRoute;