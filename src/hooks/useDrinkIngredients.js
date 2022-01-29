import { useEffect, useState } from 'react';
import { getDrinkIngredientsApi } from '../services/api';

export default function useDrinkIngredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getDrinkIngredientsApi()
      .then(setIngredients);
  }, []);

  return ingredients;
}
