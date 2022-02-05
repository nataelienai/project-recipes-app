import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import RecipeInProgressContext
from '../context/recipe-in-progress/RecipeInProgressContext';
import { addDoneRecipe } from '../services/localStorage';
import '../styles/FinishRecipeButton.css';

export default function FinishRecipeButton({ recipe }) {
  const { isAllIngredientsChecked } = useContext(RecipeInProgressContext);
  const history = useHistory();
  const { pathname } = useLocation();

  function getCurrentDate() {
    const date = new Date();
    return date.toLocaleTimeString('pt-BR');
  }

  function splitRecipeTags(tags) {
    if (!tags) return [];
    return tags.split(',');
  }

  function getFormattedRecipe() {
    const isDrink = pathname.startsWith('/drinks');

    let formattedRecipe = {
      id: recipe.idMeal,
      type: 'food',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: getCurrentDate(),
      tags: splitRecipeTags(recipe.strTags),
      instructions: recipe.strInstructions,
    };

    if (isDrink) {
      formattedRecipe = {
        ...formattedRecipe,
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: '',
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
    }
    return formattedRecipe;
  }

  function redirectToDoneRecipes() {
    history.push('/done-recipes');
  }

  function handleClick() {
    const formattedRecipe = getFormattedRecipe();
    addDoneRecipe(formattedRecipe);
    redirectToDoneRecipes();
  }

  return (
    <button
      type="button"
      className="finish-recipe-btn"
      onClick={ handleClick }
      disabled={ !isAllIngredientsChecked }
      data-testid="finish-recipe-btn"
    >
      Finish Recipe
    </button>
  );
}

FinishRecipeButton.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strTags: PropTypes.string,
    strInstructions: PropTypes.string,
  }),
};

FinishRecipeButton.defaultProps = {
  recipe: {
    idMeal: '',
    idDrink: '',
    strArea: '',
    strCategory: '',
    strMeal: '',
    strDrink: '',
    strMealThumb: '',
    strDrinkThumb: '',
    strAlcoholic: '',
    strTags: '',
    strInstructions: '',
  },
};
