import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import useFirstNFoodIngredients from '../hooks/useFirstNFoodIngredients';
import HeaderContext from '../context/header/HeaderContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NUMBER_OF_INGREDIENTS = 12;

export default function ExploreFoodIngredients() {
  const ingredients = useFirstNFoodIngredients(NUMBER_OF_INGREDIENTS);
  const location = useLocation();
  const { setSearchButton } = useContext(HeaderContext);
  useEffect(() => {
    if (location.pathname === '/explore/foods/ingredients') setSearchButton(false);
  }, []);
  return (
    <>
      <Header title="Explore Ingredients" />
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
      <Footer />
    </>
  );
}
