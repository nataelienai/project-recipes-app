import React, { useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import useFirstNDrinkIngredients from '../hooks/useFirstNDrinkIngredients';
import HeaderContext from '../context/header/HeaderContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NUMBER_OF_INGREDIENTS = 12;

export default function ExploreDrinkIngredients() {
  const ingredients = useFirstNDrinkIngredients(NUMBER_OF_INGREDIENTS);
  const location = useLocation();
  const { setSearchButton, setIngredientFilter } = useContext(HeaderContext);
  const history = useHistory();

  useEffect(() => {
    if (location.pathname === '/explore/drinks/ingredients') setSearchButton(false);
  }, []);

  function handleClick(ingredientName) {
    setIngredientFilter({ isActive: true, ingredientName });
    history.push('/drinks');
  }

  function handleKeyPress(event, ingredientName) {
    if (event.key === 'Enter') {
      handleClick(ingredientName);
    }
  }

  return (
    <>
      <Header title="Explore Ingredients" />
      <div>
        { ingredients.map(({ strIngredient1: ingredientName }, index) => (
          <div
            key={ ingredientName }
            role="link"
            tabIndex={ 0 }
            onKeyPress={ (event) => handleKeyPress(event, ingredientName) }
            onClick={ () => handleClick(ingredientName) }
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png` }
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
