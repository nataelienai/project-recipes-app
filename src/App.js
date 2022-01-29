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
import HeaderCards from './components/HeaderCards';
import Profile from './pages/Profile';

function App() {
  const {
    setSearchButton,
    setpageDrinkOrFood,
  } = useContext(HeaderContext);
  const location = useLocation();
  return (
    <Switch>

      <Route exact path="/">
        <LoginProvider>
          <Login />
        </LoginProvider>
      </Route>

      <Route exact path="/foods">
        <Header title="Foods" />
        <Footer />
        { location.pathname === '/foods'
         && setpageDrinkOrFood('Food')}
        {setSearchButton((true))}
        <HeaderCards />
      </Route>

      <Route exact path="/drinks">
        <Header title="Drinks" />
        { location.pathname === '/drinks'
         && setpageDrinkOrFood('Drink')}
        {setSearchButton((true))}

        <HeaderCards />
        <Footer />
      </Route>

      <Route exact path="/explore">
        { location.pathname === '/explore'
         && setSearchButton(false)}
        <Header title="Explore" />
        <Explore />
        <Footer />
      </Route>

      <Route exact path="/explore/foods">
        {location.pathname === '/explore/foods'
         && setSearchButton(false)}
        <Header title="Explore Foods" />
        <ExploreFoods />
        <Footer />
      </Route>

      <Route exact path="/explore/drinks">
        {location.pathname === '/explore/drinks'
         && setSearchButton(false)}
        <Header title="Explore Drinks" />
        <ExploreDrinks />
        <Footer />
      </Route>

      <Route exact path="/explore/foods/ingredients">
        {location.pathname === '/explore/foods/ingredients'
         && setSearchButton(false)}
        <Header title="Explore Ingredients" />
        <ExploreFoodIngredients />
        <Footer />
      </Route>

      <Route exact path="/explore/drinks/ingredients">
        {location.pathname === '/explore/drinks/ingredients'
         && setSearchButton(false)}
        <Header title="Explore Ingredients" />
        <ExploreDrinkIngredients />
        <Footer />
      </Route>

      <Route exact path="/explore/foods/nationalities">
        <Header title="Explore Nationalities" />
        <Footer />
      </Route>

      <Route exact path="/profile">
        <LoginProvider>
          <Profile />
          <Footer />
        </LoginProvider>
      </Route>

      <Route exact path="/done-recipes">
        <Footer />
      </Route>

      <Route exact path="/favorite-recipes">
        <Footer />
      </Route>

    </Switch>
  );
}

export default App;
