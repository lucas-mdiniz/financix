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
        if (currentUser) setUser(currentUser.data);
        setLoading(false);
      } catch (e) {
        if (e.response.status !== 403) throw new Error(e);
        else setLoading(false);
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
