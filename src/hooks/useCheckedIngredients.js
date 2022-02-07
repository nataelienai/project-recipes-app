import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getInProgressRecipes, setInProgressRecipes } from '../services/localStorage';

export default function useCheckedIngredients() {
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const { id } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    const inProgressRecipes = getInProgressRecipes();

    const storedCheckedIngredients = pathname.startsWith('/foods')
      ? inProgressRecipes.meals[id]
      : inProgressRecipes.cocktails[id];

    if (storedCheckedIngredients) {
      setCheckedIngredients(storedCheckedIngredients);
    }
  }, [id, pathname]);

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
        [id]: checkedIngredients,
      },
    });
  }, [checkedIngredients, pathname, id]);

  return [checkedIngredients, setCheckedIngredients];
}
