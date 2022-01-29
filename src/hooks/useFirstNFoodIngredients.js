import { useEffect, useState } from 'react';
import useFoodIngredients from './useFoodIngredients';

export default function useFirstNFoodIngredients(amount) {
  const ingredients = useFoodIngredients();
  const [firstNIngredients, setFirstNIngredients] = useState([]);

  useEffect(() => {
    const filteredIngredients = ingredients.slice(0, amount);
    setFirstNIngredients(filteredIngredients);
  }, [ingredients, amount]);

  return firstNIngredients;
}
