import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import LoginProvider from './context/login/LoginProvider';
import Explore from './pages/Explore';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <LoginProvider>
          <Login />
        </LoginProvider>
      </Route>
      <Route exact path="/foods">
        <Header />
      </Route>
      <Route exact path="/explore">
        <Explore />
      </Route>
    </Switch>
  );
}

export default App;
