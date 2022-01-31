import React, { useContext, useEffect, useState } from 'react';
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
    handleMainCardsApi,
  } = useContext(HeaderContext);
  const [singlefilterclicked, setSinglefilterclicked] = useState();

  function handleApiFilterResponse(nameFilter) {
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

  function HandleClickFilters(nameFilter, { value }) {
    if (value === singlefilterclicked) {
      handleMainCardsApi();
      setSinglefilterclicked('');
    } else {
      handleApiFilterResponse(nameFilter);
      setSinglefilterclicked(nameFilter);
    }
  }

  function buttons(category) {
    return category.map(({ strCategory }, i) => i < MAX_CATEGORYS && (
      <button
        key={ i }
        type="button"
        data-testid={ `${strCategory}-category-filter` }
        value={ strCategory }
        onClick={ ({ target }) => HandleClickFilters(strCategory, target) }
      >
        {strCategory}
      </button>
    ));
  }
  function handleCategoryButtonsApi() {
    let apiResponse;

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
    handleCategoryButtonsApi();
  }, []);
  return (
    <section>
      <button
        type="button"
        onClick={ () => handleMainCardsApi() }
        data-testid="All-category-filter"
      >
        All
      </button>
      {buttons(buttonsCategory)}
    </section>
  );
}
