import React from 'react';
import PropTypes from 'prop-types';

export default function FiltersButtonsRecipes({ recipes, setRecipes, defaultRecipes }) {
  function handleFiltersButtons(type) {
    let recipeFiltred;
    switch (type) {
    case 'Food':
      recipeFiltred = recipes
        .filter((recipe) => recipe.type !== 'drink');
      setRecipes(recipeFiltred);
      break;
    case 'Drink':
      recipeFiltred = recipes
        .filter((recipe) => recipe.type !== 'food');
      setRecipes(recipeFiltred);
      break;

    default:
      setRecipes(defaultRecipes);
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

FiltersButtonsRecipes.propTypes = {
  recipes: PropTypes.array,
  setRecipes: PropTypes.func,
}.isRequired;
