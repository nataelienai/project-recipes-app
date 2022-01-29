import React, { useContext } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HeaderContext from './context/header/HeaderContext';
import LoginProvider from './context/login/LoginProvider';
import Explore from './pages/Explore';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreFoods from './pages/ExploreFoods';
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
        <Footer />
        { setpageDrinkOrFood('Food')}
        {setSearchButton((true))}
      </Route>
      <Route exact path="/drinks">
        <Header />
        <Footer />
        { location.pathname === '/drinks'
         && setpageDrinkOrFood('Drink')}
        {setSearchButton((true))}
      </Route>
      <Route exact path="/explore">
        <Explore />
        <Footer />
      </Route>
      <Route exact path="/explore/foods">
        <ExploreFoods />
        <Footer />
      </Route>
      <Route exact path="/explore/drinks">
        <ExploreDrinks />
        <Footer />
      </Route>
      <Route exact path="/explore/foods/ingredients">
        <ExploreFoodIngredients />
        <Footer />
      </Route>
      <Route exact path="/explore/drinks/ingredients">
        <ExploreDrinkIngredients />
        <Footer />
      </Route>
      <Route exact path="/explore/foods/nationalities">
        <Footer />
      </Route>
      <Route exact path="/profile">
        <Footer />
      </Route>
    </Switch>
  );
}

export default App;
