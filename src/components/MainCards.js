import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContext from '../context/header/HeaderContext';
import '../styles/mainCards.css';

const MAX_CARDS = 12;
export default function MainCards() {
  const {
    pageDrinkOrFood,
    dataApi,
    handleMainCardsApi,
    setIdDetails,
  } = useContext(HeaderContext);

  const history = useHistory();

  function redirectCards(id) {
    setIdDetails(id);
    if (pageDrinkOrFood === 'Food') {
      history.push(`/foods/${id}`);
    } else { history.push(`/drinks/${id}`); }
  }

  function cards(data) {
    return data.map((item, i) => i < MAX_CARDS && (
      <button
        type="button"
        key={ i }
        data-testid={ `${i}-recipe-card` }
        onClick={
          () => redirectCards(item.idMeal || item.idDrink)
        }
      >
        <img
          data-testid={ `${i}-card-img` }
          alt="card"
          src={ pageDrinkOrFood === 'Food'
            ? `${item.strMealThumb}` : `${item.strDrinkThumb}` }
        />
        <span data-testid={ `${i}-card-name` }>
          {' '}
          { item.strMeal || item.strDrink }
        </span>
      </button>));
  }

  useEffect(() => {
    handleMainCardsApi();
  }, []);

  return (
    <section data-testid="meals-section">
      {cards(dataApi)}
    </section>
  );
}
