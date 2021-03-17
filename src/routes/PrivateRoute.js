import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as GlobalProvider from '../providers/globals/globals';

// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => GlobalProvider.getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

export default PrivateRoute;