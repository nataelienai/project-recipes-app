import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRandomFood, getRandomDrink } from '../services/api';

export default function ExploreRecipes() {
  const history = useHistory();
  const { pathname } = useLocation();
  const isFoodPage = pathname.includes('/foods');

  const redirectToExploreByIngredient = () => {
    history.push(`${pathname}/ingredients`);
  };

  const redirectToExploreByNationality = () => {
    history.push(`${pathname}/nationalities`);
  };

  const redirectToRandomRecipeDetails = async () => {
    if (isFoodPage) {
      const { idMeal } = await getRandomFood();
      history.push(`/foods/${idMeal}`);
    } else {
      const { idDrink } = await getRandomDrink();
      history.push(`/drinks/${idDrink}`);
    }
  };

  return (
    <>
      <Header title={ isFoodPage ? 'Explore Foods' : 'Explore Drinks' } />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ redirectToExploreByIngredient }
        >
          By Ingredient
        </button>
        {isFoodPage && (
          <button
            type="button"
            data-testid="explore-by-nationality"
            onClick={ redirectToExploreByNationality }
          >
            By Nationality
          </button>
        )}
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ redirectToRandomRecipeDetails }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </>
  );
}
