import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import HeaderContext from './HeaderContext';
import { getIngredientApi, getNameApi, getFirstletterApi } from '../services/api';
export default function HeaderProvider({ children }) {
  const [searchButton, setSearchButton] = useState(false);
  const [dataApiIngredient, setdataApiIngredient] = useState([]);
  const [dataApiName, setdataApiName] = useState([]);
  const [dataApiFirstletter, setdataApiFirstletter] = useState([]);
  useEffect(() => {

  }, []);
  function handleFetchs(type, info) {
    switch (type) {
    case Ingredient: {
      const responseIng = getIngredientApi(info);
      setdataApiIngredient(responseIng);
    }
      break;
    case Name: {
      const responseNam = getNameApi(info);
      setdataApiName(responseNam);
    }
      break;
    case Firstletter: {
      const responseFL = getFirstletterApi(info);
      setdataApiFirstletter(responseFL);
    }
      break;
    default:
    }
  }
  const contextValue = {
    searchButton,
    setSearchButton,
    dataApiIngredient,
    setdataApiIngredient,
    dataApiName,
    setdataApiName,
    dataApiFirstletter,
    setdataApiFirstletter,
    handleFetchs,
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
