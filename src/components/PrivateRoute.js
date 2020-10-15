import React from 'react'
import { Route, Redirect } from 'react-router-dom'

/**
 * A wrapper for <Route> that redirects to the login
 * page if you're not yet authenticated.
 * 
 * See https://stackoverflow.com/a/43171515 for more info
 */
function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export default PrivateRoute