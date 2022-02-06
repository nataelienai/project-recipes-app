import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import HeaderContext from '../context/header/HeaderContext';
import Header from '../components/Header';
import { getfavoriteRecipes } from '../services/localStorage';
import FiltersButtonsRecipes from '../components/FiltersButtonsRecipes';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';

export default function FavoriteRecipes() {
  const { setSearchButton } = useContext(HeaderContext);
  const [activeFilterFn, setActiveFilterFn] = useState(() => () => true);
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();
  const history = useHistory();

  function redirectCards(id, type) {
    if (type === 'food') history.push(`/foods/${id}`);
    else history.push(`/drinks/${id}`);
  }

  function fetchRecipes() {
    setFavorites(getfavoriteRecipes());
  }

  useEffect(() => {
    if (location.pathname === '/favorite-recipes') setSearchButton(false);
    fetchRecipes();
  }, [location, setSearchButton]);

  const filteredFavorites = favorites.filter(activeFilterFn);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <FiltersButtonsRecipes
        setActiveFilterFn={ setActiveFilterFn }
      />
      {filteredFavorites.map((food, index) => (
        <div key={ food.id }>
          <FavoriteButton
            recipe={ food }
            isFood={ food.type === 'food' }
            testId={ `${index}-horizontal-favorite-btn` }
            onToggle={ () => fetchRecipes() }
          />
          <ShareButton
            recipeId={ food.id }
            isFood={ food.type === 'food' }
            testId={ `${index}-horizontal-share-btn` }
          />
          <div
            onClick={ () => redirectCards(food.id, food.type) }
            onKeyDown={ (e) => {
              if (e.key === 'Enter') { redirectCards(food.id, food.type); }
            } }
            tabIndex={ 0 }
            role="link"
          >
            <img
              type="image"
              alt="food-fav"
              data-testid={ `${index}-horizontal-image` }
              src={ food.image }
            />
            <h1 data-testid={ `${index}-horizontal-name` }>
              {food.name}
            </h1>
          </div>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { food.alcoholicOrNot
              ? (`${food.nationality} - ${food.category} - ${food.alcoholicOrNot}`)
              : (`${food.nationality} - ${food.category}`) }
          </p>
        </div>
      ))}
    </div>
  );
}
