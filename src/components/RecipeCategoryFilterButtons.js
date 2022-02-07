import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/recipes/RecipesContext';
import {
  getMeals,
  getDrinks,
  getFoodCategories,
  getDrinkCategories,
  getMealsByCategory,
  getDrinksByCategory,
} from '../services/api';

const MAX_CATEGORIES = 5;

export default function RecipeCategoryFilterButtons() {
  const [recipeCategories, setRecipeCategories] = useState([]);
  const { setPageRecipes } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const isFoodPage = pathname.startsWith('/foods');

  function fetchRecipesByCategory(category) {
    if (category === 'all') {
      if (isFoodPage) {
        getMeals().then(setPageRecipes);
      } else {
        getDrinks().then(setPageRecipes);
      }
      return;
    }
    if (isFoodPage) {
      getMealsByCategory(category).then(setPageRecipes);
    } else {
      getDrinksByCategory(category).then(setPageRecipes);
    }
  }

  function handleClick({ target: { value } }) {
    fetchRecipesByCategory(value);
  }

  useEffect(() => {
    function fetchRecipeCategories() {
      if (isFoodPage) {
        getFoodCategories().then(setRecipeCategories);
      } else {
        getDrinkCategories().then(setRecipeCategories);
      }
    }
    fetchRecipeCategories();
  }, [isFoodPage]);

  return (
    <section>
      <button
        type="button"
        value="all"
        onClick={ handleClick }
        data-testid="All-category-filter"
      >
        All
      </button>

      {recipeCategories.slice(0, MAX_CATEGORIES).map(({ strCategory }) => (
        <button
          key={ strCategory }
          type="button"
          value={ strCategory }
          onClick={ handleClick }
          data-testid={ `${strCategory}-category-filter` }
        >
          {strCategory}
        </button>
      ))}
    </section>
  );
}
