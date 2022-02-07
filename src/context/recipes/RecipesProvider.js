import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import {
  getMeals,
  getDrinks,
} from '../../services/api';

export default function RecipesProvider({ children }) {
  const [pageRecipes, setPageRecipes] = useState([]);
  const { pathname } = useLocation();
  const history = useHistory();
  const isFoodPage = pathname.startsWith('/foods');

  useEffect(() => {
    function fetchPageRecipes() {
      if (isFoodPage) {
        getMeals().then(setPageRecipes);
      } else {
        getDrinks().then(setPageRecipes);
      }
    }
    fetchPageRecipes();
  }, [isFoodPage]);

  useEffect(() => {
    function redirectToRecipeDetails() {
      if (isFoodPage) {
        history.push(`/foods/${pageRecipes[0].idMeal}`);
      } else {
        history.push(`/drinks/${pageRecipes[0].idDrink}`);
      }
    }

    if (pageRecipes.length === 1) {
      redirectToRecipeDetails();
    }
  }, [isFoodPage, pageRecipes, history]);

  const contextValue = { pageRecipes, setPageRecipes };

  return (
    <div>
      <RecipesContext.Provider value={ contextValue }>
        {children}
      </RecipesContext.Provider>
    </div>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
