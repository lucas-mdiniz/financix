import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './contexts/UserContext';

if (
  window.location.host === 'financix.herokuapp.com' &&
  window.location.protocol !== 'https:'
) {
  window.location.protocol = 'https';
}

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);
