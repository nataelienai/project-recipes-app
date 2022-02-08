import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/recipes/RecipesProvider';
import RecipeFilterProvider from './context/recipe-filter/RecipeFilterProvider';
import RecipeInProgressProvider
from './context/recipe-in-progress/RecipeInProgressProvider';
import RecipeDetails from './pages/RecipeDetails';
import DoneRecipes from './pages/DoneRecipes';
import Explore from './pages/Explore';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreNationalities from './pages/ExploreNationalities';
import ExploreRecipes from './pages/ExploreRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>

      <Route exact path={ ['/foods', '/drinks'] }>
        <RecipeFilterProvider>
          <RecipesProvider>
            <Recipes />
          </RecipesProvider>
        </RecipeFilterProvider>
      </Route>

      <Route exact path={ ['/foods/:id', '/drinks/:id'] }>
        <RecipeDetails />
      </Route>

      <Route exact path={ ['/foods/:id/in-progress', '/drinks/:id/in-progress'] }>
        <RecipeInProgressProvider>
          <RecipeInProgress />
        </RecipeInProgressProvider>
      </Route>

      <Route exact path="/explore">
        <Explore />
      </Route>

      <Route exact path={ ['/explore/foods', '/explore/drinks'] }>
        <ExploreRecipes />
      </Route>

      <Route exact path={ ['/explore/foods/ingredients', '/explore/drinks/ingredients'] }>
        <RecipeFilterProvider>
          <ExploreIngredients />
        </RecipeFilterProvider>
      </Route>

      <Route exact path="/explore/foods/nationalities">
        <RecipeFilterProvider>
          <RecipesProvider>
            <ExploreNationalities />
          </RecipesProvider>
        </RecipeFilterProvider>
      </Route>

      <Route exact path="/explore/drinks/nationalities">
        <h1>Not Found</h1>
      </Route>

      <Route exact path="/profile">
        <Profile />
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
