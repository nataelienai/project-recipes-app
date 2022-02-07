import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/recipes/RecipesContext';
import {
  getMealsByIngredientName,
  getMealsByName,
  getMealsByFirstLetter,
  getDrinksByIngredientName,
  getDrinksByName,
  getDrinksByFirstLetter,
} from '../services/api';

const INITIAL_STATE = {
  searchText: '',
  searchCategory: '',
};

export default function SearchBar() {
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const { setPageRecipes } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const { searchText, searchCategory } = inputValues;
  const isFoodPage = pathname.startsWith('/foods');

  function handleInputChange({ target: { name, value } }) {
    setInputValues({ ...inputValues, [name]: value });
  }

  function saveRecipesOrAlertIfThereIsNone(data) {
    if (!data) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    setPageRecipes(data);
  }

  function fetchRecipesWithSearchInput() {
    const pageType = isFoodPage ? 'food' : 'drink';
    const fetchFunctions = {
      food: {
        ingredient: getMealsByIngredientName,
        name: getMealsByName,
        firstLetter: getMealsByFirstLetter,
      },
      drink: {
        ingredient: getDrinksByIngredientName,
        name: getDrinksByName,
        firstLetter: getDrinksByFirstLetter,
      },
    };
    if (!searchCategory) {
      global.alert('Choose a category');
      return;
    }
    if (searchCategory === 'firstLetter' && searchText.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const fetchRecipesBySearchText = fetchFunctions[pageType][searchCategory];
    fetchRecipesBySearchText(searchText).then(saveRecipesOrAlertIfThereIsNone);
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetchRecipesWithSearchInput();
  }

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        name="searchText"
        value={ searchText }
        onChange={ handleInputChange }
        data-testid="search-input"
      />
      <label htmlFor="radio-ingredient">
        <input
          id="radio-ingredient"
          type="radio"
          name="searchCategory"
          value="ingredient"
          onChange={ handleInputChange }
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="radio-name">
        <input
          id="radio-name"
          type="radio"
          name="searchCategory"
          value="name"
          onChange={ handleInputChange }
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="radio-first-letter">
        <input
          id="radio-first-letter"
          type="radio"
          name="searchCategory"
          value="firstLetter"
          onChange={ handleInputChange }
          data-testid="first-letter-search-radio"
        />
        First letter
      </label>
      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </form>
  );
}
