import React,{ Component } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../utils/accessToken'; 
 
const PrivateRoute = ({ component: Component, path }: RouteProps) => {

  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return <Route component={Component} path={path} />;
};

export default PrivateRoute;