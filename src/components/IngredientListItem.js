import PropTypes from 'prop-types';
import React from 'react';

export default function IngredientListItem(props) {
  const { name, measure, index, checked, onToggle } = props;
  return (
    <li
      key={ name }
      data-testid={ `${index}-ingredient-step` }
    >
      <input
        type="checkbox"
        checked={ checked }
        onChange={ onToggle }
      />
      <span>{`${name} - ${measure}`}</span>
    </li>
  );
}
/* t */
IngredientListItem.propTypes = {
  name: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
