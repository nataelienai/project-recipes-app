import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeFilterContext from './RecipeFilterContext';

export default function RecipeFilterProvider({ children }) {
  const [filter, setFilter] = useState({ type: '', text: '' });

  const contextValue = { filter, setFilter };

  return (
    <RecipeFilterContext.Provider value={ contextValue }>
      {children}
    </RecipeFilterContext.Provider>
  );
}

RecipeFilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
