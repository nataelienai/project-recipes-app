import React, { useContext, useEffect, useState } from 'react';
import HeaderContext from '../context/header/HeaderContext';
import { getFoodsMainPageApi, getDrinksMainPageApi } from '../services/api';

const MAX_CARDS = 6;
export default function RecommendationCard() {
  const { pageDrinkOrFood } = useContext(HeaderContext);
  const [dataApi, SetdataApi] = useState([]);
  function handleFetchs() {
    if (pageDrinkOrFood === 'Food') {
      getDrinksMainPageApi().then((data) => SetdataApi(data.drinks));
    } else {
      getFoodsMainPageApi().then((data) => SetdataApi(data.meals));
    }
  }
  useEffect(() => {
    handleFetchs();
    console.log(dataApi);
  }, []);

  return (
    <section className="carousel">
      {dataApi.map((card, index) => index < MAX_CARDS && (
        <section key={ index } data-testid={ `${index}-recomendation-card` }>
          <img
            data-testid={ `${index}-card-img` }
            alt="card"
            src={ pageDrinkOrFood === 'Food'
              ? `${card.strDrinkThumb}` : `${card.strMealThumb}` }
          />
          <span data-testid={ `${index}-recomendation-title` }>
            {pageDrinkOrFood === 'Food' ? card.strDrink : card.strMeal }
          </span>
          <span data-testid="recipe-category">
            {pageDrinkOrFood === 'Food' ? card.strAlcoholic : card.strCategory}
          </span>
        </section>))}
    </section>
  );
}
