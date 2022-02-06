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
      {
        measure
          ? <span>{`${name} - ${measure}`}</span>
          : <span>{name}</span>
      }
    </li>
  );
}

IngredientListItem.propTypes = {
  name: PropTypes.string.isRequired,
  measure: PropTypes.string,
  testId: PropTypes.string.isRequired,
  hasCheckbox: PropTypes.bool,
  checked: PropTypes.bool,
  onToggle: PropTypes.func,
};

IngredientListItem.defaultProps = {
  measure: '',
  hasCheckbox: false,
  checked: false,
  onToggle: () => {},
};
