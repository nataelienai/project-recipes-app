import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { getfavoriteRecipes, setfavoriteRecipes } from '../services/localStorage';
import HeaderContext from '../context/header/HeaderContext';

export default function FavoriteButton({
  responseApiDetails,
  pageDrinkOrFood,
  idDetailsUrl }) {
  const { favorited, setFavorited } = useContext(HeaderContext);
  const favoriteLS = getfavoriteRecipes();
  function setFavoriteToLocalStorage() {
    const newFavoriteObject = responseApiDetails
      .map((recipe) => ({
        id: recipe.idMeal || recipe.idDrink,
        type: pageDrinkOrFood,
        nationality: recipe.strArea || '',
        category: recipe.strCategory || '',
        alcoholicOrNot: recipe.strAlcoholic || '',
        name: recipe.strMeal || recipe.strDrink,
        image: recipe.strMealThumb || recipe.strDrinkThumb,
      }));

    return favoriteLS.concat(newFavoriteObject);
  }
  function removeFavoriteOfLocalStorage() {
    const favoritefilter = favoriteLS
      .filter(({ id }) => id !== idDetailsUrl);
    return favoritefilter;
  }
  function validadeFavoriteLS() {
    const validateFavoriteRecipe = favoriteLS
      .map(({ id }) => id).some((id) => id === idDetailsUrl);
    setFavorited(validateFavoriteRecipe);
    return validateFavoriteRecipe;
  }
  useEffect(() => {
    validadeFavoriteLS();
  }, []);

  function handleClickFavorite() {
    if (validadeFavoriteLS()) {
      const removeFavorite = removeFavoriteOfLocalStorage();
      setfavoriteRecipes(removeFavorite);
      setFavorited(false);
    } else {
      const newFavorite = setFavoriteToLocalStorage();
      setfavoriteRecipes(newFavorite);
      setFavorited(true);
    }
  }
  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ () => handleClickFavorite() }
    >
      <img src={ !favorited ? whiteHeartIcon : blackHeartIcon } alt="favorite" />
    </button>
  );
}
FavoriteButton.propTypes = {
  isFavorite: PropTypes.string,
  setFavorited: PropTypes.any,
}.isRequired;
