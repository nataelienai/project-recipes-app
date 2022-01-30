import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderContext from '../context/header/HeaderContext';
import { getFoodsMainPageApi, getDrinksMainPageApi } from '../services/api';

const MAX_CARDS = 12;
export default function MainCards() {
  const {
    pageDrinkOrFood,
    setdataApi,
    dataApi,
  } = useContext(HeaderContext);
  const location = useLocation();

  function cards(data) {
    return data.map((item, i) => i < MAX_CARDS && (
      <div key={ i } data-testid={ `${i}-recipe-card` }>
        <img
          data-testid={ `${i}-card-img` }
          alt="card"
          src={ pageDrinkOrFood === 'Food'
            ? `${item.strMealThumb}` : `${item.strDrinkThumb}` }
        />
        <span data-testid={ `${i}-card-name` }>
          {' '}
          {pageDrinkOrFood === 'Food' ? item.strMeal : item.strDrink}
        </span>
      </div>));
  }
  function handleApi() {
    let apiResponse;
    /*   */
    if (location.pathname === '/foods') {
      apiResponse = getFoodsMainPageApi().then((data) => setdataApi(data.meals));
    } else if (location.pathname === '/drinks') {
      apiResponse = getDrinksMainPageApi().then((data) => setdataApi(data.drinks));
    }
    return apiResponse;
  }
  useEffect(() => {
    handleApi();
  }, []);
  return (
    <section>
      {cards(dataApi)}
    </section>
  );
}
