import React from 'react';
import { useHistory } from 'react-router-dom';
import { getRandomFoodApi } from '../services/api';

export default function ExploreFoods() {
  const history = useHistory();

  const handleSurpriseFood = async () => {
    const { idMeal } = await getRandomFoodApi();
    history.push(`/foods/${idMeal}`);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleSurpriseFood }
      >
        Surprise me!
      </button>
    </div>
  );
}
