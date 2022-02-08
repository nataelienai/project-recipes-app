import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import RecipeFilterContext from '../recipe-filter/RecipeFilterContext';
import {
  getDrinks,
  getDrinksByCategory,
  getDrinksByFirstLetter,
  getDrinksByIngredientName,
  getDrinksByName,
  getMeals,
  getMealsByCategory,
  getMealsByFirstLetter,
  getMealsByIngredientName,
  getMealsByName,
} from '../../services/api';

export default function RecipesProvider({ children }) {
  const [pageRecipes, setPageRecipes] = useState([]);
  const { filter } = useContext(RecipeFilterContext);
  const { pathname } = useLocation();
  const history = useHistory();
  const isFoodPage = pathname.startsWith('/foods');

  useEffect(() => {
    const filteredFetches = {
      food: {
        ingredient: getMealsByIngredientName,
        name: getMealsByName,
        firstLetter: getMealsByFirstLetter,
        category: getMealsByCategory,
      },
      drink: {
        ingredient: getDrinksByIngredientName,
        name: getDrinksByName,
        firstLetter: getDrinksByFirstLetter,
        category: getDrinksByCategory,
      },
    };
    const pageType = isFoodPage ? 'food' : 'drink';
    const fetchWithFilter = filteredFetches[pageType][filter.type];

    function saveRecipesOrAlertIfThereIsNone(recipes) {
      if (!recipes) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      }
      setPageRecipes(recipes);
    }

    function fetchPageRecipes() {
      if (!filter.type) {
        if (isFoodPage) {
          getMeals().then(setPageRecipes);
          return;
        }
        getDrinks().then(setPageRecipes);
        return;
      }
      fetchWithFilter(filter.text).then(saveRecipesOrAlertIfThereIsNone);
    }
    fetchPageRecipes();
  }, [isFoodPage, filter]);

  useEffect(() => {
    function redirectToRecipeDetails() {
      if (isFoodPage) {
        history.push(`/foods/${pageRecipes[0].idMeal}`);
      } else {
        history.push(`/drinks/${pageRecipes[0].idDrink}`);
      }
    }

    const hasOneRecipe = pageRecipes.length === 1;
    const isFilteredByCategory = filter.type === 'category';
    if (hasOneRecipe && !isFilteredByCategory) {
      redirectToRecipeDetails();
    }
  }, [isFoodPage, pageRecipes, history, filter]);

  return (
    <div>
      <RecipesContext.Provider value={ { pageRecipes } }>
        {children}
      </RecipesContext.Provider>
    </div>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
