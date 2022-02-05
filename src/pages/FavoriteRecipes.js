import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import HeaderContext from '../context/header/HeaderContext';
import Header from '../components/Header';
import { getfavoriteRecipes, setfavoriteRecipes } from '../services/localStorage';
import FiltersButtonsRecipes from '../components/FiltersButtonsRecipes';
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
  const recipeFavoriteBackUp = getfavoriteRecipes();
  const history = useHistory();
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
  function redirectCards(id, type) {
    if (type === 'food') history.push(`/foods/${id}`);
    else history.push(`/drinks/${id}`);
  }

  useEffect(() => {
    if (location.pathname === '/favorite-recipes') setSearchButton(false);
  }, []);

  useEffect(() => {
    setNewFavoriteRecipes(recipeFavoriteBackUp);
    return () => setShouldReload(false);
  }, [shouldReload]);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <FiltersButtonsRecipes
        recipes={ newFavoriteRecipes }
        setRecipes={ setNewFavoriteRecipes }
        defaultRecipes={ recipeFavoriteBackUp }
      />

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
