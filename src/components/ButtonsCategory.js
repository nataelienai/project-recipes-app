import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderContext from '../context/header/HeaderContext';
import {
  getCategoryFoodsApi,
  getCategoryDrinksApi,
  getCategoryFoodsFiltersApi,
  getCategoryDrinksFiltersApi } from '../services/api';

const MAX_CATEGORYS = 5;
export default function ButtonsCategory() {
  const location = useLocation();
  const {
    buttonsCategory,
    setButtonsCategory,
    setdataApi,
  } = useContext(HeaderContext);

  function HandleClickFilters(nameFilter) {
    let apiResponse;
    if (location.pathname === '/foods') {
      apiResponse = getCategoryFoodsFiltersApi(nameFilter)
        .then((data) => setdataApi(data.meals));
    } else if (location.pathname === '/drinks') {
      apiResponse = getCategoryDrinksFiltersApi(nameFilter)
        .then((data) => setdataApi(data.drinks));
    }
    return apiResponse;
  }

  function buttons(category) {
    return category.map(({ strCategory }, i) => i < MAX_CATEGORYS && (
      <button
        key={ i }
        type="button"
        data-testid={ `${strCategory}-category-filter` }
        onClick={ () => HandleClickFilters(strCategory) }
      >
        {strCategory}
      </button>
    ));
  }
  function handleCategoryApi() {
    let apiResponse;
    /*   */
    if (location.pathname === '/foods') {
      apiResponse = getCategoryFoodsApi()
        .then((data) => setButtonsCategory(data.meals));
    } else if (location.pathname === '/drinks') {
      apiResponse = getCategoryDrinksApi()
        .then((data) => setButtonsCategory(data.drinks));
    }
    return apiResponse;
  }
  useEffect(() => {
    handleCategoryApi();
  }, []);
  return (
    <section>
      {buttons(buttonsCategory)}
    </section>
  );
}
