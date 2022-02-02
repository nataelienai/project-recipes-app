import React, { useContext } from 'react';
import HeaderContext from '../context/header/HeaderContext';

const MAX_CARDS = 12;
export default function HeaderCards() {
  const {
    dataApi,
    pageDrinkOrFood,
  } = useContext(HeaderContext);

  function card(data) {
    return data.slice(0, MAX_CARDS).map((item, i) => (

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

  return (
    <section>

      { card(dataApi) }

    </section>
  );
}
