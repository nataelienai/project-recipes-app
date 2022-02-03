import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipeInProgressContext from './RecipeInProgressContext';

export default function RecipeInProgressProvider({ children }) {
  const [isAllIngredientsChecked, setIsAllIngredientsChecked] = useState(false);

  const value = {
    isAllIngredientsChecked,
    setIsAllIngredientsChecked,
  };

  return (
    <RecipeInProgressContext.Provider value={ value }>
      {children}
    </RecipeInProgressContext.Provider>
  );
}

RecipeInProgressProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
