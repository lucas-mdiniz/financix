import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/AuthPages/Login';
import Signup from './pages/AuthPages/Signup';

const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={Signup} />
      <Route path="/" component={Login} />
    </Switch>
  );
};

export default AuthRoutes;
