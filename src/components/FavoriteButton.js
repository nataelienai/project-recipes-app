import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { getfavoriteRecipes, setfavoriteRecipes } from '../services/localStorage';

export default function FavoriteButton({ recipe, isFood }) {
  const [isRecipeFavorite, setIsRecipeFavorite] = useState(false);
  const favoriteLS = getfavoriteRecipes();
  const recipeId = recipe.idMeal || recipe.idDrink;

  useEffect(() => {
    const isFavorite = favoriteLS.some(({ id }) => id === recipeId);
    setIsRecipeFavorite(isFavorite);
  }, [favoriteLS, recipeId]);

  function addRecipeToFavorites() {
    const newFavoriteObject = {
      id: recipeId,
      type: isFood ? 'food' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };

    return favoriteLS.concat(newFavoriteObject);
  }

  function removeRecipeFromFavorites() {
    const favoritefilter = favoriteLS.filter(({ id }) => id !== recipeId);
    return favoritefilter;
  }

  function toggleFavorite() {
    if (isRecipeFavorite) {
      const favorites = removeRecipeFromFavorites();
      setfavoriteRecipes(favorites);
      setIsRecipeFavorite(false);
    } else {
      const favorites = addRecipeToFavorites();
      setfavoriteRecipes(favorites);
      setIsRecipeFavorite(true);
    }
  }

  return (
    <button
      type="button"
      onClick={ toggleFavorite }
    >
      <img
        src={ isRecipeFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite"
        data-testid="favorite-btn"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({}),
  isFood: PropTypes.bool,
}.isRequired;
