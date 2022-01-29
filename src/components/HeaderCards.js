import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/header/HeaderContext';

const MAX_CARDS = 12;
export default function HeaderCards() {
  const {
    dataApi,
    cardOnScreen,
    pageDrinkOrFood,
    setcardOnScreen,
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

  useEffect(() => {
    if (!dataApi) {
      global.alert('Sorry, we haven\'t found any recipes for these filters');
    } else {
      setcardOnScreen(card(dataApi));
    }
  }, [dataApi]);
  return (
    <section>
      { cardOnScreen }
    </section>
  );
}
