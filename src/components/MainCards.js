import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContext from '../context/header/HeaderContext';
/* import '../Styles/MainCard.css'; */

const MAX_CARDS = 12;
export default function MainCards() {
  const {
    pageDrinkOrFood,
    dataApi,
    handleMainCardsApi,
  } = useContext(HeaderContext);
  const history = useHistory();
  function redirectCards(id) {
    if (pageDrinkOrFood === 'Food')history.push(`/foods/${id}`);
    else { history.push(`/drinks/${id}`); }
  }

  function cards(data) {
    return data.map((item, i) => i < MAX_CARDS && (
      <div
        key={ i }
        data-testid={ `${i}-recipe-card` }
      /*   onKeyDown={
          () => redirectCards(pageDrinkOrFood === 'Food' ? item.idMeal : item.idDrink)
        }
        onClick={
          () => redirectCards(pageDrinkOrFood === 'Food' ? item.idMeal : item.idDrink)
        } */
      >
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
    redirectCards('i');
  }, []);
  return (
    <section>
      {cards(dataApi)}
    </section>
  );
}
