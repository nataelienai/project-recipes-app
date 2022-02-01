import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function IngredientListItem({ ingredient, index }) {
  const [isIngredientChecked, setIsIngredientChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsIngredientChecked((prevState) => !prevState);
  };

  return (
    <li
      key={ ingredient }
      data-testid={ `${index}-ingredient-step` }
    >
      <input
        type="checkbox"
        checked={ isIngredientChecked }
        onChange={ toggleCheckbox }
      />
      <span>{ ingredient }</span>
    </li>
  );
}

IngredientListItem.propTypes = {
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
