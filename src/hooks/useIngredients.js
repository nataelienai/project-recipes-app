import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMealIngredients, getDrinkIngredients } from '../services/api';

export default function useIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { pathname } = useLocation();
  const isFoodPage = pathname.includes('/foods');

  useEffect(() => {
    if (isFoodPage) {
      getMealIngredients().then(setIngredients);
    } else {
      getDrinkIngredients().then(setIngredients);
    }
  }, [isFoodPage]);

  return ingredients;
}
