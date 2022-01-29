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
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';

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
        { location.pathname === '/foods'
         && setpageDrinkOrFood('Food')}
        {setSearchButton((true))}
        <Header title="Foods" />
        <HeaderCards />
      </Route>

      <Route exact path="/drinks">
        <Header title="Drinks" />
        { location.pathname === '/drinks'
         && setpageDrinkOrFood('Drink')}
        {setSearchButton((true))}
        <HeaderCards />
      </Route>

      <Route exact path="/explore">
        <Explore />
      </Route>

      <Route exact path="/explore/foods">
        <ExploreFoods />
      </Route>

      <Route exact path="/explore/drinks">
        <ExploreDrinks />
      </Route>

      <Route exact path="/explore/foods/ingredients">
        <ExploreFoodIngredients />
      </Route>

      <Route exact path="/explore/drinks/ingredients">
        <ExploreDrinkIngredients />
      </Route>

      <Route exact path="/explore/foods/nationalities">
        <Header title="Explore Nationalities" />
        <Footer />
      </Route>

      <Route exact path="/profile">
        <LoginProvider>
          <Profile />
        </LoginProvider>
      </Route>

      <Route exact path="/done-recipes">
        <DoneRecipes />
      </Route>

      <Route exact path="/favorite-recipes">
        <FavoriteRecipes />
      </Route>
    </Switch>
  );
}

export default App;
