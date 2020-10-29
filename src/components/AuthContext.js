import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fb } from '../config/Fire';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  AuthProvider.propTypes = {
    children: PropTypes.element.isRequired,
  };
  // const [pending, setPending] = useState(true);
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    fb.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      // setPending(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
