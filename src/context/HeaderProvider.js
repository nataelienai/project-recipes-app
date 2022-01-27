import PropTypes from 'prop-types';
import React, { useState } from 'react';
import HeaderContext from './HeaderContext';

export default function HeaderProvider({ children }) {
  const [searchButton, setSearchButton] = useState(false);

  const contextValue = {
    searchButton,
    setSearchButton,
  };
  return (
    <div>
      <HeaderContext.Provider value={ contextValue }>
        {children}
      </HeaderContext.Provider>
    </div>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.func.isRequired,
};
