import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import {
  addRecipeToFavorites,
  removeRecipeFromFavorites,
  getfavoriteRecipes,
} from '../services/localStorage';

export default function FavoriteButton({ recipe, isFood, testId, onToggle }) {
  const [isRecipeFavorite, setIsRecipeFavorite] = useState(false);
  const recipeId = recipe.idMeal || recipe.idDrink || recipe.id;

  useEffect(() => {
    const favoriteRecipes = getfavoriteRecipes();
    const isFavorite = favoriteRecipes.some(({ id }) => id === recipeId);
    setIsRecipeFavorite(isFavorite);
  }, [recipeId]);

  function favoriteRecipe() {
    const newFavoriteRecipe = {
      id: recipeId,
      type: isFood ? 'food' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };
    addRecipeToFavorites(newFavoriteRecipe);
    setIsRecipeFavorite(true);
  }

  function unfavoriteRecipe() {
    removeRecipeFromFavorites(recipeId);
    setIsRecipeFavorite(false);
  }

  function toggleFavorite() {
    if (isRecipeFavorite) {
      unfavoriteRecipe();
    } else {
      favoriteRecipe();
    }
    onToggle();
  }

  return (
    <button
      type="button"
      onClick={ toggleFavorite }
    >
      <img
        src={ isRecipeFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite button"
        data-testid={ testId }
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  isFood: PropTypes.bool.isRequired,
  testId: PropTypes.string.isRequired,
  onToggle: PropTypes.func,
};

FavoriteButton.defaultProps = {
  onToggle: () => {},
};
