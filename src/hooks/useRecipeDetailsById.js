import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDrinkDetailsById, getMealDetailsById } from '../services/api';

export default function useRecipeDetailsById(recipeId) {
  const [recipe, setRecipe] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith('/foods')) {
      getMealDetailsById(recipeId).then(setRecipe)
        .catch(() => {});
    } else {
      getDrinkDetailsById(recipeId).then(setRecipe)
        .catch(() => {});
    }
  }, [recipeId, pathname]);

  return recipe;
}
