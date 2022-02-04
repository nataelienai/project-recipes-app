import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderContext from '../context/header/HeaderContext';
import Header from '../components/Header';
import { getfavoriteRecipes, setfavoriteRecipes } from '../services/localStorage';
import FiltersButtonsDoneRecipe from '../components/FiltersButtonsDoneRecipe';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const TWO_SECONDS = 2000;
export default function FavoriteRecipes() {
  const location = useLocation();
  const { setSearchButton, favorited } = useContext(HeaderContext);
  // const getFavoriteFoodsLs = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [shareBtnClicked, setShareBtnClicked] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);
  const [newFavoriteRecipes, setNewFavoriteRecipes] = useState([]);

  function handleShareBtn(type, id) {
    setShareBtnClicked(!shareBtnClicked);
    const url = `http://localhost:3000/${type}s/${id}`;
    setTimeout(() => { setShareBtnClicked(false); }, TWO_SECONDS);
    return copy(url);
  }

  function removeFavoriteOfLocalStorage(idDetailsUrl) {
    const favoritefilter = newFavoriteRecipes
      .filter(({ id }) => id !== idDetailsUrl);
    setfavoriteRecipes(favoritefilter);
    setShouldReload(true);
    console.log(favoritefilter, favorited, idDetailsUrl);
  }

  useEffect(() => {
    if (location.pathname === '/favorite-recipes') setSearchButton(false);
  }, []);

  useEffect(() => {
    setNewFavoriteRecipes(getfavoriteRecipes());
    return () => setShouldReload(false);
  }, [shouldReload]);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <FiltersButtonsDoneRecipe />

      {newFavoriteRecipes.map((food, index) => (
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
          <button
            type="button"
            onClick={ () => handleShareBtn(food.type, food.id) }
          >
            <img
              alt="share-bttn"
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <span>{shareBtnClicked && 'Link copied!'}</span>
          <img
            alt="food-fav"
            data-testid={ `${index}-horizontal-image` }
            src={ food.image }
          />
          <h1 data-testid={ `${index}-horizontal-name` }>{food.name}</h1>
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
