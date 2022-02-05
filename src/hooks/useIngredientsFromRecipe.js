import { useEffect, useState } from 'react';

export default function useIngredientsFromRecipe(recipe) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (recipe) {
      const recipeKeys = Object.keys(recipe);

      const recipeIngredients = recipeKeys.reduce((ingredientsAcc, key) => {
        const isIngredient = key.includes('Ingredient');
        const isValid = Boolean(recipe[key]);

        if (isIngredient && isValid) {
          const measureKey = key.replace('Ingredient', 'Measure');
          return [
            ...ingredientsAcc,
            {
              name: recipe[key],
              measure: recipe[measureKey],
            },
          ];
        }
        return ingredientsAcc;
      }, []);

      setIngredients(recipeIngredients);
    }
  }, [recipe]);

  return ingredients;
}
