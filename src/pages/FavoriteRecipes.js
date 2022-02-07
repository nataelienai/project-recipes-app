import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipeTypeFilterButtons from '../components/RecipeTypeFilterButtons';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import { getFavoriteRecipes } from '../services/localStorage';

export default function FavoriteRecipes() {
  const [activeFilterFn, setActiveFilterFn] = useState(() => () => true);
  const [favorites, setFavorites] = useState([]);
  const history = useHistory();

  function redirectCards(id, type) {
    if (type === 'food') history.push(`/foods/${id}`);
    else history.push(`/drinks/${id}`);
  }

  function fetchRecipes() {
    setFavorites(getFavoriteRecipes());
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  const filteredFavorites = favorites.filter(activeFilterFn);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <RecipeTypeFilterButtons
        setActiveFilterFn={ setActiveFilterFn }
      />
      {filteredFavorites.map((food, index) => (
        <div key={ food.id }>
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
            <h2 data-testid={ `${index}-horizontal-name` }>
              {food.name}
            </h2>
          </div>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { food.alcoholicOrNot
              ? (`${food.nationality} - ${food.category} - ${food.alcoholicOrNot}`)
              : (`${food.nationality} - ${food.category}`) }
          </p>
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
        </div>
      ))}
    </div>
  );
}
