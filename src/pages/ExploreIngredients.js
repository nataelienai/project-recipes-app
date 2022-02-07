import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useIngredients from '../hooks/useIngredients';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MAX_INGREDIENTS = 12;

export default function ExploreIngredients() {
  const { pathname } = useLocation();
  const history = useHistory();
  const ingredients = useIngredients();
  const slicedIngredients = ingredients.slice(0, MAX_INGREDIENTS);
  const isFoodPage = pathname.includes('/foods');

  function handleClick() {
    if (isFoodPage) {
      history.push('/foods');
    } else {
      history.push('/drinks');
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleClick();
    }
  }

  function getIngredientImageSource(ingredient) {
    if (isFoodPage) {
      return `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;
    }
    return `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;
  }

  return (
    <>
      <Header title="Explore Ingredients" />
      <div>
        { slicedIngredients.map(({ strIngredient, strIngredient1 }, index) => (
          <div
            key={ strIngredient || strIngredient1 }
            role="link"
            tabIndex={ 0 }
            onClick={ () => handleClick() }
            onKeyPress={ (event) => handleKeyPress(event) }
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              src={ getIngredientImageSource(strIngredient || strIngredient1) }
              alt={ strIngredient || strIngredient1 }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>
              { strIngredient || strIngredient1 }
            </p>
          </div>
        )) }
      </div>
      <Footer />
    </>
  );
}
