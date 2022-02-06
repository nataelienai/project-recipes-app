import PropTypes from 'prop-types';
import React from 'react';

export default function IngredientListItem(props) {
  const { name, measure, testId, hasCheckbox, checked, onToggle } = props;
  return (
    <li
      key={ name }
      data-testid={ testId }
    >
      {hasCheckbox && (
        <input
          type="checkbox"
          checked={ checked }
          onChange={ onToggle }
        />
      )}
      <span>{`${name} - ${measure}`}</span>
    </li>
  );
}

IngredientListItem.propTypes = {
  name: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  hasCheckbox: PropTypes.bool,
  checked: PropTypes.bool,
  onToggle: PropTypes.func,
};

IngredientListItem.defaultProps = {
  hasCheckbox: false,
  checked: false,
  onToggle: () => {},
};
