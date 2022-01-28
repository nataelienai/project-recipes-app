import React from 'react';
import { useHistory } from 'react-router-dom';
import { getRandomDrinkApi } from '../services/api';

export default function ExploreDrinks() {
  const history = useHistory();

  const handleSurpriseDrink = async () => {
    const { idDrink } = await getRandomDrinkApi();
    history.push(`/drinks/${idDrink}`);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingridient
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleSurpriseDrink }
      >
        Surprise me!
      </button>
    </div>
  );
}
