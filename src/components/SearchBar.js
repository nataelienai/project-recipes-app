import React, { useContext, useState } from 'react';
import RecipeFilterContext from '../context/recipe-filter/RecipeFilterContext';

const INITIAL_STATE = {
  searchText: '',
  searchCategory: '',
};

export default function SearchBar() {
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const { setFilter } = useContext(RecipeFilterContext);
  const { searchText, searchCategory } = inputValues;

  function handleInputChange({ target: { name, value } }) {
    setInputValues({ ...inputValues, [name]: value });
  }

  function saveSearchInput() {
    if (!searchCategory) {
      global.alert('Choose a category');
      return;
    }
    if (searchCategory === 'firstLetter' && searchText.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    setFilter({ type: searchCategory, text: searchText });
  }

  function handleSubmit(event) {
    event.preventDefault();
    saveSearchInput();
  }

  return (
    <form onSubmit={ handleSubmit } className="div-inputs-search">
      <div>
        <input
          type="text"
          name="searchText"
          value={ searchText }
          onChange={ handleInputChange }
          data-testid="search-input"
        />
        <button
          type="submit"
          data-testid="exec-search-btn"
        >
          Search
        </button>
      </div>
      <div className="radio-buttons">
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
      </div>
    </form>
  );
}
