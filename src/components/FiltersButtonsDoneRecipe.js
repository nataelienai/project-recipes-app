import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from '../context/header/HeaderContext';

export default function FiltersButtonsDoneRecipe({
  doneRecipeState,
  setDoneRecipesState,
}) {
  const { doneRecipesBackUpState } = useContext(HeaderContext);
  function handleFiltersButtons(type) {
    let recipeFiltred;
    switch (type) {
    case 'Food':
      recipeFiltred = doneRecipeState
        .filter((recipe) => recipe.type !== 'drink');
      setDoneRecipesState(recipeFiltred);
      break;
    case 'Drink':
      recipeFiltred = doneRecipeState
        .filter((recipe) => recipe.type !== 'food');
      setDoneRecipesState(recipeFiltred);
      break;

    default:
      setDoneRecipesState(doneRecipesBackUpState);
      break;
    }
  }

  return (
    <>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => handleFiltersButtons('All') }
      >
        {' '}
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => handleFiltersButtons('Food') }
      >
        {' '}
        Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFiltersButtons('Drink') }
      >
        {' '}
        Drinks
      </button>
    </>
  );
}

FiltersButtonsDoneRecipe.propTypes = {
  doneRecipeState: PropTypes.array,
  setDoneRecipesState: PropTypes.func,
}.isRequired;
