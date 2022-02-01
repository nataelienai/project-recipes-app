import React from 'react';
import PropTypes from 'prop-types';

export default function Ingredients({ ingredientApi, Measure }) {
  return (
    <ul>
      {ingredientApi.map((igr, indexigr) => (
        <li
          key={ indexigr }
          data-testid={ `${indexigr}-ingredient-name-and-measure` }
        >
          {' '}
          {`${igr} - ${Measure[indexigr]}`}
          {' '}
        </li>))}
    </ul>
  );
}
Ingredients.propTypes = {
  ingredientApi: PropTypes.array,
  Measure: PropTypes.array,
}.isRequired;
