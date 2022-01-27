import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input type="text" data-testid="search-input" />
      <label htmlFor="radio-ingredient">
        ingrediente
        <input
          id="radio-ingredient"
          type="radio"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="radio-name">

        nome
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
      primeira letra

      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        buscar
      </button>
    </div>
  );
}
