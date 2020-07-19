import React, { useContext } from 'react';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import { UserContext } from './contexts/UserContext';

function App() {
  const [user] = useContext(UserContext);

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
