import PropTypes from 'prop-types';
import React from 'react';

export default function IngredientListItem({ ingredient, index, checked, onToggle }) {
  return (
    <li
      key={ ingredient }
      data-testid={ `${index}-ingredient-step` }
    >
      <input
        type="checkbox"
        checked={ checked }
        onChange={ onToggle }
      />
      <span>{ ingredient }</span>
    </li>
  );
}

IngredientListItem.propTypes = {
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
