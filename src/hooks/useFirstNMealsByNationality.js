import { useEffect, useState } from 'react';
import useMealsByNationality from './useMealsByNationality';

export default function useFirstNMealsByNationality(numberOfMeals, nationality) {
  const meals = useMealsByNationality(nationality);
  const [firstNMeals, setFirstNMeals] = useState([]);

  useEffect(() => {
    const filteredMeals = meals.slice(0, numberOfMeals);
    setFirstNMeals(filteredMeals);
  }, [numberOfMeals, nationality, meals]);

  return firstNMeals;
}
