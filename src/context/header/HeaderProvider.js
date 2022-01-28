import PropTypes from 'prop-types';
import React, { useState } from 'react';
import HeaderContext from './HeaderContext';

export default function HeaderProvider({ children }) {
  const [searchButton, setSearchButton] = useState(false);
  const [dataApiIngredient, setdataApiIngredient] = useState([]);
  const [dataApiName, setdataApiName] = useState([]);
  const [dataApiFirstletter, setdataApiFirstletter] = useState([]);
  const [pageDrinkOrFood, setpageDrinkOrFood] = useState('');
  const contextValue = {
    searchButton,
    setSearchButton,
    dataApiIngredient,
    setdataApiIngredient,
    dataApiName,
    setdataApiName,
    dataApiFirstletter,
    setdataApiFirstletter,
    pageDrinkOrFood,
    setpageDrinkOrFood,
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
  children: PropTypes.node.isRequired,
};
