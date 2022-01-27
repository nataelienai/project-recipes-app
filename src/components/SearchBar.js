import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input type="text" data-testid="search-input" />
      <label htmlFor="radio-ingredient">
        Ingredient
        <input
          id="radio-ingredient"
          type="radio"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="radio-name">

        Name
        <input
          id="radio-name"
          type="radio"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="radio-first-letter">

        <input
          id="radio-first-letter"
          type="radio"
          data-testid="first-letter-search-radio"
        />
      </label>
      First letter

      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        buscar
      </button>
    </div>
  );
}
