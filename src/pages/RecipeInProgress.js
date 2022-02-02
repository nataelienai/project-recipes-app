import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import FinishRecipeButton from '../components/FinishRecipeButton';
import IngredientList from '../components/IngredientList';
import ShareButton from '../components/ShareButton';
import useIngredientsFromRecipe from '../hooks/useIngredientsFromRecipe';
import useRecipeDetailsById from '../hooks/useRecipeDetailsById';

export default function RecipeInProgress() {
  const { pathname } = useLocation();
  const { recipeId } = useParams();
  const recipe = useRecipeDetailsById(recipeId);
  const ingredients = useIngredientsFromRecipe(recipe);

  function getRecipeDetails() {
    const isDrink = pathname.startsWith('/drinks');

    const recipeDetails = {
      name: recipe.strMeal,
      imgSource: recipe.strMealThumb,
      category: recipe.strCategory,
      instructions: recipe.strInstructions,
    };

    if (isDrink) {
      recipeDetails.name = recipe.strDrink;
      recipeDetails.imgSource = recipe.strDrinkThumb;
      recipeDetails.category = recipe.strAlcoholic;
    }

    return recipeDetails;
  }

  function renderRecipe() {
    const { name, imgSource, category, instructions } = getRecipeDetails();

    return (
      <div>
        <img
          src={ imgSource }
          alt={ name }
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{name}</h1>
        <button type="button" data-testid="favorite-btn">Favorite</button>
        <ShareButton />
        <h2 data-testid="recipe-category">{category}</h2>
        <IngredientList ingredients={ ingredients } />
        <p data-testid="instructions">{instructions}</p>
        <FinishRecipeButton />
      </div>
    );
  }

  return recipe ? renderRecipe() : null;
}
