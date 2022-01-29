import React from 'react';
import useFirstNDrinkIngredients from '../hooks/useFirstNDrinkIngredients';

const NUMBER_OF_INGREDIENTS = 12;

export default function ExploreDrinkIngredients() {
  const ingredients = useFirstNDrinkIngredients(NUMBER_OF_INGREDIENTS);
  return (
    <div>
      { ingredients.map(({ strIngredient1: ingredientName }, index) => (
        <div key={ ingredientName } data-testid={ `${index}-ingredient-card` }>
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png` }
            alt={ `${ingredientName}` }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ ingredientName }</p>
        </div>
      )) }
    </div>
  );
}
