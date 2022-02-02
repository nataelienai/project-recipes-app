import React from 'react';
import { useParams } from 'react-router-dom';
import IngredientList from '../components/IngredientList';
import useIngredientsFromRecipe from '../hooks/useIngredientsFromRecipe';
import useRecipeDetailsById from '../hooks/useRecipeDetailsById';

export default function RecipeInProgress() {
  const { recipeId } = useParams();
  const recipe = useRecipeDetailsById(recipeId);
  const ingredients = useIngredientsFromRecipe(recipe);

  function renderRecipe() {
    const recipeName = recipe.strMeal || recipe.strDrink;
    const recipeImgSource = recipe.strMealThumb || recipe.strDrinkThumb;

    return (
      <div>
        <img
          src={ recipeImgSource }
          alt={ recipeName }
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{recipeName}</h1>
        <button type="button" data-testid="share-btn">Share</button>
        <button type="button" data-testid="favorite-btn">Favorite</button>
        <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
        <IngredientList ingredients={ ingredients } />
        <p data-testid="instructions">{recipe.strInstructions}</p>
        <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
      </div>
    );
  }

  return recipe ? renderRecipe() : null;
}
