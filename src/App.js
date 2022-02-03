import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginProvider from './context/login/LoginProvider';
import RecipeInProgressProvider
from './context/recipe-in-progress/RecipeInProgressProvider';
import Details from './pages/Details';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreFoodNationalities from './pages/ExploreFoodNationalities';
import ExploreFoods from './pages/ExploreFoods';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <LoginProvider>
          <Login />
        </LoginProvider>
      </Route>

      <Route exact path="/foods">
        <Foods />
      </Route>

      <Route exact path="/drinks">
        <Drinks />
      </Route>

      <Route exact path="/foods/:id">
        <Details />
      </Route>

      <Route exact path="/drinks/:id">
        <Details />
      </Route>

      <Route exact path="/foods/:recipeId/in-progress">
        <RecipeInProgressProvider>
          <RecipeInProgress />
        </RecipeInProgressProvider>
      </Route>

      <Route exact path="/drinks/:recipeId/in-progress">
        <RecipeInProgressProvider>
          <RecipeInProgress />
        </RecipeInProgressProvider>
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
        <ExploreFoodNationalities />
      </Route>

      <Route exact path="/explore/drinks/nationalities">
        <h1>Not Found</h1>
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
