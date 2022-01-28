import React, { useContext } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HeaderContext from './context/header/HeaderContext';
import LoginProvider from './context/login/LoginProvider';
import Explore from './pages/Explore';
import Login from './pages/Login';

function App() {
  const { setSearchButton, setpageDrinkOrFood } = useContext(HeaderContext);
  const location = useLocation();
  return (
    <Switch>
      <Route exact path="/">
        <LoginProvider>
          <Login />
        </LoginProvider>
      </Route>
      <Route exact path="/foods">
        <Header />
        { setpageDrinkOrFood('Food')}
        {setSearchButton((true))}
      </Route>
      <Route exact path="/drinks">
        <Header />
        { location.pathname === '/drinks'
         && setpageDrinkOrFood('Drink')}
        {setSearchButton((true))}
      </Route>
      <Route exact path="/explore">
        <Explore />
      </Route>
    </Switch>
  );
}

export default App;
