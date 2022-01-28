import React from 'react';
import useFirstNFoodIngredients from '../hooks/useFirstNFoodIngredients';

const NUMBER_OF_INGREDIENTS = 12;

export default function ExploreFoodIngredients() {
  const ingredients = useFirstNFoodIngredients(NUMBER_OF_INGREDIENTS);
  return (
    <div>
      { ingredients.map(({ strIngredient: ingredientName }, index) => (
        <div key={ ingredientName } data-testid={ `${index}-ingredient-card` }>
          <img
            src={ `https://www.themealdb.com/images/ingredients/${ingredientName}-Small.png` }
            alt={ `${ingredientName}` }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ ingredientName }</p>
        </div>
      )) }
    </div>
  );
}
