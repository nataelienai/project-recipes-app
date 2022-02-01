import { useEffect, useState } from 'react';

export default function useIngredientsFromRecipe(recipe) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (recipe) {
      const recipeKeys = Object.keys(recipe);

      const recipeIngredients = recipeKeys.reduce((ingredientsAcc, key) => {
        const isIngredient = key.includes('strIngredient');
        const isValid = Boolean(recipe[key]);

        if (isIngredient && isValid) {
          return [...ingredientsAcc, recipe[key]];
        }
        return ingredientsAcc;
      }, []);

      setIngredients(recipeIngredients);
    }
  }, [recipe]);

  return ingredients;
}
