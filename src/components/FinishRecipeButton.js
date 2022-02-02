import React from 'react';
import { useHistory } from 'react-router-dom';

export default function FinishRecipeButton() {
  const history = useHistory();

  function handleClick() {
    history.push('/done-recipes');
  }

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      onClick={ handleClick }
    >
      Finish Recipe
    </button>
  );
}
