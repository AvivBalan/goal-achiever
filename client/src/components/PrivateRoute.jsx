import React  from 'react';
import { Route, Redirect } from 'react-router-dom';
import user from '../services/user';

const PrivateRoute = ({ component: Component, ...rest }) => {
  rest.properties = rest.properties || {};

  const render = props => {
    if(!user.isLoggedIn()) {
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>;
    }

    return <Component {...props} {...rest.properties }/>;
  };

  return <Route {...rest} render={render}/>;
};

export default PrivateRoute;