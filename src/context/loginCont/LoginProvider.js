import React, { useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btn, setBtn] = useState({ disabled: true });

  const loginContextValue = {
    email,
    setEmail,
    password,
    setPassword,
    btn,
    setBtn,
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
