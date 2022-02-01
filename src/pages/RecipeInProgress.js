import React from 'react';
import { useParams } from 'react-router-dom';
import IngredientList from '../components/IngredientList';
import useIngredientsFromRecipe from '../hooks/useIngredientsFromRecipe';
import useRecipeDetailsById from '../hooks/useRecipeDetailsById';

export default function RecipeInProgress() {
  const { recipeId } = useParams();
  const recipe = useRecipeDetailsById(recipeId);
  const ingredients = useIngredientsFromRecipe(recipe);

  return (
    <IngredientList ingredients={ ingredients } />
  );
}
