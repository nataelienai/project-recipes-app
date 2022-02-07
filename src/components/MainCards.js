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

  function redirectCards(id, type) {
    setIdDetails(id);
    if (type === 'food' || type === 'Food') history.push(`/foods/${id}`);
    else history.push(`/drinks/${id}`);
  }

  function cards(data) {
    return data.map((item, i) => i < MAX_CARDS && (
      <div
        role="button"
        tabIndex={ 0 }
        key={ i }
        className="card-main"
        onClick={
          () => redirectCards(item.idMeal || item.idDrink, pageDrinkOrFood)
        }
        onKeyDown={
          () => redirectCards(item.idMeal || item.idDrink, pageDrinkOrFood)
        }
      >
        <img
          data-testid={ `${i}-card-img` }
          alt="card"
          src={ pageDrinkOrFood === 'Food'
            ? `${item.strMealThumb}` : `${item.strDrinkThumb}` }
        />
        <div className="container-card-main-infos">
          <span className="card-main-name">
            {' '}
            { item.strMeal || item.strDrink }
          </span>
          
          <span className="card-main-info">
            {item.strAlcoholic || item.strArea}
          </span>
        </div>
      </div>));
  }

  useEffect(() => {
    handleMainCardsApi();
  }, []);

  return (
    <section className="cards-content" data-testid="meals-section">
      {cards(dataApi)}
    </section>
  );
}
