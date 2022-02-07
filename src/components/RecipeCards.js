import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import '../styles/mainCards.css';

const MAX_CARDS = 12;

export default function RecipeCards({ recipes }) {
  const { pathname } = useLocation();
  const isFood = pathname.includes('/foods');
  const history = useHistory();

  function handleClick(id) {
    if (isFood) history.push(`/foods/${id}`);
    else history.push(`/drinks/${id}`);
  }

  function handleKeyPress(event, id) {
    if (event.key === 'Enter') {
      handleClick(id);
    }
  }

  return (
    <section>
      {recipes.slice(0, MAX_CARDS).map((recipe, i) => (
        <div
          key={ recipe.strMeal || recipe.strDrink }
          role="link"
          tabIndex={ 0 }
          onKeyPress={ (e) => handleKeyPress(e, recipe.idMeal || recipe.idDrink) }
          onClick={ () => handleClick(recipe.idMeal || recipe.idDrink) }
          data-testid={ `${i}-recipe-card` }
        >
          <img
            src={ isFood ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt="card"
            data-testid={ `${i}-card-img` }
          />
          <h2 data-testid={ `${i}-card-name` }>
            { recipe.strMeal || recipe.strDrink }
          </h2>
        </div>
      ))}
    </section>
  );
}

RecipeCards.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
