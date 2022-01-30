import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContext from './HeaderContext';

export default function HeaderProvider({ children }) {
  const [searchButton, setSearchButton] = useState(false);
  const [dataApi, setdataApi] = useState([]);
  const [pageDrinkOrFood, setpageDrinkOrFood] = useState('');
  const [headerCardsValidation, setHeaderCardsValidation] = useState(false);
  const [buttonsCategory, setButtonsCategory] = useState([]);
  const history = useHistory();

  function redirectToDetails(pagetype) {
    switch (pagetype) {
    case 'Drink':
      if (dataApi.length === 1) {
        history.push(`/drinks/${dataApi[0].idDrink}`);
      }
      break;

    default:
      if (dataApi.length === 1) {
        history.push(`/foods/${dataApi[0].idMeal}`);
      }
      break;
    }
  }

  useEffect(() => {
    redirectToDetails(pageDrinkOrFood);
  }, [dataApi, pageDrinkOrFood]);
  const contextValue = {
    searchButton,
    setSearchButton,
    dataApi,
    setdataApi,
    pageDrinkOrFood,
    setpageDrinkOrFood,
    redirectToDetails,
    headerCardsValidation,
    setHeaderCardsValidation,
    buttonsCategory,
    setButtonsCategory,

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
