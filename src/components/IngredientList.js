import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import RecipeInProgressContext
from '../context/recipe-in-progress/RecipeInProgressContext';
import useCheckedIngredients from '../hooks/useCheckedIngredients';
import IngredientListItem from './IngredientListItem';

export default function IngredientList({ ingredients }) {
  const [checkedIngredients, setCheckedIngredients] = useCheckedIngredients();
  const { setIsAllIngredientsChecked } = useContext(RecipeInProgressContext);

  useEffect(() => {
    const isAllIngredientsChecked = checkedIngredients.length === ingredients.length;

    setIsAllIngredientsChecked(isAllIngredientsChecked);
  }, [setIsAllIngredientsChecked, checkedIngredients, ingredients]);

  function isIngredientChecked(ingredient) {
    return checkedIngredients.includes(ingredient);
  }

  function uncheckIngredient(ingredient) {
    const decreasedCheckedIngredients = checkedIngredients.filter(
      (checkedIngredient) => checkedIngredient !== ingredient,
    );
    setCheckedIngredients(decreasedCheckedIngredients);
  }

  function checkIngredient(ingredient) {
    const increasedCheckedIngredients = checkedIngredients.concat(ingredient);
    setCheckedIngredients(increasedCheckedIngredients);
  }

  function toggleIngredient(ingredient) {
    if (isIngredientChecked(ingredient)) {
      uncheckIngredient(ingredient);
    } else {
      checkIngredient(ingredient);
    }
  }

  return (
    <ul>
      {ingredients.map((ingredient, index) => (
        <IngredientListItem
          key={ ingredient }
          ingredient={ ingredient }
          index={ index }
          checked={ isIngredientChecked(ingredient) }
          onToggle={ () => toggleIngredient(ingredient) }
        />
      ))}
    </ul>
  );
}

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};
