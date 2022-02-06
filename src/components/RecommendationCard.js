import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getFoodsMainPageApi, getDrinksMainPageApi } from '../services/api';

const MAX_CARDS = 6;

export default function RecommendationCard() {
  const [dataApi, SetdataApi] = useState([]);
  const { pathname } = useLocation();
  const history = useHistory();
  const isFood = pathname.startsWith('/foods');

  useEffect(() => {
    function fetchRecipes() {
      if (!isFood) {
        getFoodsMainPageApi().then((data) => SetdataApi(data.meals));
      } else {
        getDrinksMainPageApi().then((data) => SetdataApi(data.drinks));
      }
    }
    fetchRecipes();
  }, [isFood]);

  function redirectCards(id) {
    if (!isFood) history.push(`/foods/${id}`);
    else history.push(`/drinks/${id}`);
  }

  return (
    <section className="carousel">
      {dataApi.map((card, index) => index < MAX_CARDS && (
        <section
          key={ index }
          data-testid={ `${index}-recomendation-card` }
          role="link"
          tabIndex={ 0 }
          onClick={ () => redirectCards(card.idMeal || card.idDrink) }
          onKeyDown={ (event) => {
            if (event.key === 'Enter') redirectCards(card.idMeal || card.idDrink);
          } }
        >
          <img
            data-testid={ `${index}-card-img` }
            alt="card"
            src={ card.strMealThumb || card.strDrinkThumb }
          />
          <span data-testid={ `${index}-recomendation-title` }>
            { card.strDrink || card.strMeal }
          </span>
          <span data-testid="recipe-category">
            { card.strAlcoholic || card.strCategory}
          </span>
        </section>))}
    </section>
  );
}
