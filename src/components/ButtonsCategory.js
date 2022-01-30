import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderContext from '../context/header/HeaderContext';
import { getCategoryFoodsApi, getCategoryDrinksApi } from '../services/api';

const MAX_CATEGORYS = 5;
export default function ButtonsCategory() {
  const location = useLocation();
  const {
    buttonsCategory,
    setButtonsCategory,
  } = useContext(HeaderContext);
  function buttons(category) {
    return category.map((item, i) => i < MAX_CATEGORYS && (
      <button
        key={ i }
        type="button"
        data-testid={ `${item.strCategory}-category-filter` }
      >
        {item.strCategory}
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
