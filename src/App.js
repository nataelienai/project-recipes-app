import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import LoginProvider from './context/loginCont/LoginProvider';

function App() {
  return (
    <LoginProvider>
      <Login />
    </LoginProvider>
  );
}

export default App;
