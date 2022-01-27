import React, { useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginContextValue = {
    email,
    setEmail,
    password,
    setPassword,
  };

  return (
    <LoginContext.Provider value={ loginContextValue }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: propTypes.element,
}.isRequired;

export default LoginProvider;
