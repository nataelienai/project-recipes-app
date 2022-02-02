import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import HeaderContext from './HeaderContext';
import { getFoodsMainPageApi, getDrinksMainPageApi } from '../../services/api';

export default function HeaderProvider({ children }) {
  const [searchButton, setSearchButton] = useState(false);

  const [dataApi, setdataApi] = useState([]);

  const [pageDrinkOrFood, setpageDrinkOrFood] = useState('');

  const [headerCardsValidation, setHeaderCardsValidation] = useState(false);

  const [buttonsCategory, setButtonsCategory] = useState([]);

  const [idDetails, setIdDetails] = useState();

  const [recipeStarted, setRecipeStarted] = useState(false);

  const history = useHistory();

  const location = useLocation();

  function redirectToDetails(pagetype) {
    switch (pagetype) {
    case 'Drink':
      if (dataApi.length === 1) {
        history.push(`/drinks/${dataApi[0].idDrink}`);
      }
      break;

    default:
      if (dataApi.length === 1 && dataApi[0].idMeal !== '52968') {
        history.push(`/foods/${dataApi[0].idMeal}`);
      }
      break;
    }
  }

  function handleMainCardsApi() {
    let apiResponse;
    if (location.pathname === '/foods') {
      apiResponse = getFoodsMainPageApi().then((data) => setdataApi(data.meals));
    } else if (location.pathname === '/drinks') {
      apiResponse = getDrinksMainPageApi().then((data) => setdataApi(data.drinks));
    }

    return apiResponse;
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
    handleMainCardsApi,
    idDetails,
    setIdDetails,
    setRecipeStarted,
    recipeStarted,
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
