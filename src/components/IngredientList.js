import PropTypes from 'prop-types';
import React from 'react';
import IngredientListItem from './IngredientListItem';

export default function IngredientList({ ingredients }) {
  return (
    <ul>
      {ingredients.map((ingredient, index) => (
        <IngredientListItem key={ index } ingredient={ ingredient } index={ index } />
      ))}
    </ul>
  );
}

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};
