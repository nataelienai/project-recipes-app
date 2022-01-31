import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/header/HeaderContext';

const MAX_CARDS = 12;
export default function MainCards() {
  const {
    pageDrinkOrFood,
    dataApi,
    handleMainCardsApi,
  } = useContext(HeaderContext);

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

  useEffect(() => {
    handleMainCardsApi();
  }, []);
  return (
    <section>
      {cards(dataApi)}
    </section>
  );
}
