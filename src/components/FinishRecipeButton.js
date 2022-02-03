import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeInProgressContext
from '../context/recipe-in-progress/RecipeInProgressContext';
import '../styles/FinishRecipeButton.css';

export default function FinishRecipeButton() {
  const history = useHistory();
  const { isAllIngredientsChecked } = useContext(RecipeInProgressContext);

  function handleClick() {
    history.push('/done-recipes');
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
