import { useEffect, useState } from 'react';
import useDrinkIngredients from './useDrinkIngredients';

export default function useFirstNDrinkIngredients(amount) {
  const ingredients = useDrinkIngredients();
  const [firstNIngredients, setFirstNIngredients] = useState([]);

  useEffect(() => {
    const filteredIngredients = ingredients.slice(0, amount);
    setFirstNIngredients(filteredIngredients);
  }, [ingredients, amount]);

  return firstNIngredients;
}
