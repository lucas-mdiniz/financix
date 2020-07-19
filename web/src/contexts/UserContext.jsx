import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import FullPageLoading from '../components/FullPageLoading';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await api.get('/users/me');
        setUser(currentUser);
        setLoading(false);
      } catch (e) {
        throw new Error(e);
      }
    }

    getUser();
  }, []);

  if (loading) {
    return <FullPageLoading />;
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { UserProvider, UserContext };
