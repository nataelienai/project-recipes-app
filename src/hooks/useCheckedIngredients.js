import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getInProgressRecipes, setInProgressRecipes } from '../services/localStorage';

export default function useCheckedIngredients() {
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const { recipeId } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    const inProgressRecipes = getInProgressRecipes();

    const storedCheckedIngredients = pathname.startsWith('/foods')
      ? inProgressRecipes.meals[recipeId]
      : inProgressRecipes.cocktails[recipeId];

    if (storedCheckedIngredients) {
      setCheckedIngredients(storedCheckedIngredients);
    }
  }, [recipeId, pathname]);

  useEffect(() => {
    const inProgressRecipes = getInProgressRecipes();
    let recipeType = 'meals';

    if (pathname.startsWith('/drinks')) {
      recipeType = 'cocktails';
    }

    setInProgressRecipes({
      ...inProgressRecipes,
      [recipeType]: {
        ...inProgressRecipes[recipeType],
        [recipeId]: checkedIngredients,
      },
    });
  }, [checkedIngredients, pathname, recipeId]);

  return [checkedIngredients, setCheckedIngredients];
}
