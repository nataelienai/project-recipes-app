import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import FinishRecipeButton from '../components/FinishRecipeButton';
import IngredientCheckList from '../components/IngredientCheckList';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import useIngredientsFromRecipe from '../hooks/useIngredientsFromRecipe';
import useRecipeDetailsById from '../hooks/useRecipeDetailsById';
import '../styles/RecipeInProgress.css';

export default function RecipeInProgress() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const recipe = useRecipeDetailsById(id);
  const ingredients = useIngredientsFromRecipe(recipe);
  const isFood = pathname.startsWith('/foods');

  function getRecipeDetails() {
    const recipeDetails = {
      name: recipe.strMeal,
      imgSource: recipe.strMealThumb,
      category: recipe.strCategory,
      instructions: recipe.strInstructions,
    };

    if (!isFood) {
      recipeDetails.name = recipe.strDrink;
      recipeDetails.imgSource = recipe.strDrinkThumb;
      recipeDetails.category = recipe.strAlcoholic;
    }

    return recipeDetails;
  }

  function renderRecipe() {
    const { name, imgSource, category, instructions } = getRecipeDetails();

    return (
      <div className="recipe-in-progress-page">
        <img
          src={ imgSource }
          alt={ name }
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{name}</h1>
        <FavoriteButton recipe={ recipe } isFood={ isFood } testId="favorite-btn" />
        <ShareButton recipeId={ id } isFood={ isFood } testId="share-btn" />
        <h2 data-testid="recipe-category">{category}</h2>
        <IngredientCheckList ingredients={ ingredients } />
        <p data-testid="instructions">{instructions}</p>
        <FinishRecipeButton recipe={ recipe } />
      </div>
    );
  }

  return recipe ? renderRecipe() : null;
}
