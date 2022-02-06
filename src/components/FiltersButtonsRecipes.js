import React from 'react';
import PropTypes from 'prop-types';

export default function FiltersButtonsRecipes({ unfilteredRecipes, setFilteredRecipes }) {
  function handleFiltersButtons(type) {
    let filteredRecipes;
    switch (type) {
    case 'Food':
      filteredRecipes = unfilteredRecipes
        .filter((recipe) => recipe.type !== 'drink');
      setFilteredRecipes(filteredRecipes);
      break;

    case 'Drink':
      filteredRecipes = unfilteredRecipes
        .filter((recipe) => recipe.type !== 'food');
      setFilteredRecipes(filteredRecipes);
      break;

    default:
      setFilteredRecipes(unfilteredRecipes);
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
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => handleFiltersButtons('Food') }
      >
        Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFiltersButtons('Drink') }
      >
        Drinks
      </button>
    </>
  );
}

FiltersButtonsRecipes.propTypes = {
  recipes: PropTypes.array,
  setRecipes: PropTypes.func,
}.isRequired;
