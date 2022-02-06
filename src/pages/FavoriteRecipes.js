import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import HeaderContext from '../context/header/HeaderContext';
import Header from '../components/Header';
import { getfavoriteRecipes, setfavoriteRecipes } from '../services/localStorage';
import FiltersButtonsRecipes from '../components/FiltersButtonsRecipes';
import ShareButton from '../components/ShareButton';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const location = useLocation();
  const { setSearchButton } = useContext(HeaderContext);
  const [shouldReload, setShouldReload] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const unfilteredRecipes = getfavoriteRecipes();
  const history = useHistory();

  function removeFavoriteOfLocalStorage(idDetailsUrl) {
    const favoritefilter = unfilteredRecipes
      .filter(({ id }) => id !== idDetailsUrl);
    setfavoriteRecipes(favoritefilter);
    setShouldReload(true);
  }

  function redirectCards(id, type) {
    if (type === 'food') history.push(`/foods/${id}`);
    else history.push(`/drinks/${id}`);
  }

  useEffect(() => {
    if (location.pathname === '/favorite-recipes') setSearchButton(false);
  }, []);

  useEffect(() => {
    setFilteredRecipes(unfilteredRecipes);
    return () => setShouldReload(false);
  }, [shouldReload]);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <FiltersButtonsRecipes
        unfilteredRecipes={ unfilteredRecipes }
        setFilteredRecipes={ setFilteredRecipes }
      />
      {filteredRecipes.map((food, index) => (
        <div key={ food.id }>
          <button
            type="button"
            onClick={ () => removeFavoriteOfLocalStorage(food.id) }
          >
            <img
              alt="fav-bttn"
              src={ blackHeartIcon }
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
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
