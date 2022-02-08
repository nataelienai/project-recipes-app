import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useIngredients from '../hooks/useIngredients';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeFilterContext from '../context/recipe-filter/RecipeFilterContext';

const MAX_INGREDIENTS = 12;

export default function ExploreIngredients() {
  const { setFilter } = useContext(RecipeFilterContext);
  const { pathname } = useLocation();
  const history = useHistory();
  const ingredients = useIngredients();
  const slicedIngredients = ingredients.slice(0, MAX_INGREDIENTS);
  const isFoodPage = pathname.includes('/foods');

  function handleClick(ingredientName) {
    setFilter({ type: 'ingredient', text: ingredientName });
    if (isFoodPage) {
      history.push('/foods');
    } else {
      history.push('/drinks');
    }
  }

  function handleKeyPress(event, ingredientName) {
    if (event.key === 'Enter') {
      handleClick(ingredientName);
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
            onClick={ () => handleClick(strIngredient || strIngredient1) }
            onKeyPress={
              (event) => handleKeyPress(event, strIngredient || strIngredient1)
            }
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
