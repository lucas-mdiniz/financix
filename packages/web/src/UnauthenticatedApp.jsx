import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyle } from './styles/styles';
import AuthRoutes from './AuthRoutes';

function UnauthenticatedApp() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AuthRoutes />
      </Router>
    </>
  );
}

export default UnauthenticatedApp;
