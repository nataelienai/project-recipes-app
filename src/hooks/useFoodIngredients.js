import { useEffect, useState } from 'react';
import { getFoodIngredientsApi } from '../services/api';

export default function useFoodIngredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getFoodIngredientsApi()
      .then(setIngredients);
  }, []);

  return ingredients;
}
