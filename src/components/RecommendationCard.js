import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContext from '../context/header/HeaderContext';
import { getFoodsMainPageApi, getDrinksMainPageApi } from '../services/api';

const MAX_CARDS = 6;
export default function RecommendationCard() {
  const { pageDrinkOrFood } = useContext(HeaderContext);

  const [dataApi, SetdataApi] = useState([]);

  const history = useHistory();

  function handleFetchs() {
    if (pageDrinkOrFood === 'Food') {
      getDrinksMainPageApi().then((data) => SetdataApi(data.drinks));
    } else {
      getFoodsMainPageApi().then((data) => SetdataApi(data.meals));
    }
  }
  function redirectCards(id, type) {
    if (type === 'drink' || type === 'Drinks') history.push(`/foods/${id}`);
    else history.push(`/drinks/${id}`);
  }

  useEffect(() => {
    handleFetchs();
  }, []);

  return (
    <section className="carousel">
      {dataApi.map((card, index) => index < MAX_CARDS && (
        <section
          key={ index }
          data-testid={ `${index}-recomendation-card` }
          role="link"
          tabIndex={ 0 }
          onClick={ () => redirectCards(card.idMeal || card.idDrink, pageDrinkOrFood) }
          onKeyDown={ () => redirectCards(card.idMeal || card.idDrink, pageDrinkOrFood) }
        >
          <img
            data-testid={ `${index}-card-img` }
            alt="card"
            src={ pageDrinkOrFood === 'Food'
              ? `${card.strDrinkThumb}` : `${card.strMealThumb}` }
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
