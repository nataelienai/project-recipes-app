import React from 'react';
import handleFetchs from '../context/HeaderProvider';
const INITIAL_STATE={}

export default function SearchBar() {
  function handleSearchInputs({ target }) {
    console.log(target);
  }
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ (e) => handleSearchInputs(e) }
      />
      <label htmlFor="radio-ingredient">
        Ingredient
        <input
          id="radio-ingredient"
          type="radio"
          data-testid="ingredient-search-radio"
          name="search-types"
          onChange={ (e) => handleSearchInputs(e) }
        />
      </label>
      <label htmlFor="radio-name">

        Name
        <input
          id="radio-name"
          type="radio"
          data-testid="name-search-radio"
          name="search-types"
          onChange={ (e) => handleSearchInputs(e) }
        />
      </label>
      <label htmlFor="radio-first-letter">

        <input
          id="radio-first-letter"
          type="radio"
          data-testid="first-letter-search-radio"
          name="search-types"
          onChange={ (e) => handleSearchInputs(e) }
        />
      </label>
      First letter

      <button
        type="submit"
        data-testid="exec-search-btn"
        onClick={ () => handleFetchs() }
      >
        Search
      </button>
    </div>
  );
}
